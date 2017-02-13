import {
  Http,
  Request,
  Response,
  RequestOptionsArgs,
  RequestMethod,
  ConnectionBackend,
  RequestOptions,
  URLSearchParams,
  Headers
} from '@angular/http';
import { HmacSHA256, SHA256, enc, Hash } from 'crypto-js';


export type AwsClientConfig = {
  accessKey: string,
  secretKey: string,
  sessionToken?: string,
  serviceName: string,
  region: string,
  // endpoint: endpoint,
  // defaultContentType: config.defaultContentType,
  // defaultAcceptType: config.defaultAcceptType
};

const AWS_SHA_256 = 'AWS4-HMAC-SHA256';
const AWS4_REQUEST = 'aws4_request';
const AWS4 = 'AWS4';
const X_AMZ_DATE = 'x-amz-date';
const X_AMZ_SECURITY_TOKEN = 'x-amz-security-token';
const HOST = 'host';
const AUTHORIZATION = 'Authorization';

export function buildSigV4Header(url: string | Request, config: AwsClientConfig, options?: RequestOptionsArgs): Headers {

  let request: Request;
  if (typeof url === 'string') {
    const urlContent = getUrlContent(url);
    // url pass RequestOptions should not include query parameters
    const tmpUrl = urlContent.protocol + '//' + urlContent.host + urlContent.path;
    const requestOptions = new RequestOptions({
      method: RequestMethod.Get,
      url: tmpUrl,
      search: urlContent.search
    }).merge(options);
    request = new Request(requestOptions);

  } else {
    request = url;
  }

  const reqMethod = request.method;
  const reqUrl = request.url;
  const reqUrlContent = getUrlContent(reqUrl);
  const reqPath = reqUrlContent.path;
  const reqSearch = new URLSearchParams(reqUrlContent.search);
  const reqHeaders = request.headers;
  const reqBody = request.getBody();

  const headers = new Headers();

  reqHeaders.set(HOST, reqUrlContent.host);

  const contentType = reqHeaders.getAll('Content-Type');
  if (contentType === null) {
    reqHeaders.set('Content-Type', 'application/json');
    headers.set('Content-Type', 'application/json');
  } else {
    headers.set('Content-Type', contentType);
  }

  const accept = reqHeaders.getAll('Accept');
  if (accept === null) {
    reqHeaders.set('Accept', 'application/json');
    headers.set('Accept', 'application/json');
  } else {
    headers.set('Accept', accept);
  }

  let datetime = reqHeaders.get(X_AMZ_DATE);
  if (datetime === null) {
    datetime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z').replace(/[:\-]|\.\d{3}/g, '');
    reqHeaders.set(X_AMZ_DATE, datetime);
  }
  headers.set(X_AMZ_DATE, datetime);


  const canonicalRequest = buildCanonicalRequest(reqMethod, reqPath, reqSearch, reqHeaders, reqBody);
  console.log('############ canonicalRequest ############');
  console.log(canonicalRequest);

  const hashedCanonicalRequest = hashCanonicalRequest(canonicalRequest);
  console.log('############ hashedCanonicalRequest ############');
  console.log(hashedCanonicalRequest);

  const credentialScope = buildCredentialScope(datetime, config.region, config.serviceName);
  const stringToSign = buildStringToSign(datetime, credentialScope, hashedCanonicalRequest);
  console.log('############ stringToSign ############');
  console.log(stringToSign);

  const signingKey = calculateSigningKey(config.secretKey, datetime, config.region, config.serviceName);
  console.log('############ signingKey ############');
  console.log(enc.Hex.stringify(signingKey));

  const signature = calculateSignature(signingKey, stringToSign);
  console.log('############ signature ############');
  console.log(signature);

  const authorizationHeader = buildAuthorizationHeader(config.accessKey, credentialScope, reqHeaders, signature);
  console.log('############ authorizationHeader ############');
  console.log(authorizationHeader);


  headers.set(AUTHORIZATION, buildAuthorizationHeader(config.accessKey, credentialScope, reqHeaders, signature));
  if (config.sessionToken !== undefined && config.sessionToken !== '') {
    headers.set(X_AMZ_SECURITY_TOKEN, config.sessionToken);
  }

  return headers;
}

type UrlContent = {
  protocol: string,
  host: string,
  hostname: string,
  port: string,
  path: string,
  search: string,
  hash: string
};



function getUrlContent(url: string): UrlContent {
  const match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

  if (match === null) {
    throw new Error('url is not valid.');
  }

  const pathname = (match[5] === '') ? '/' : match[5];
  const search = (match[6] === '') ? match[6] : match[6].slice(1);

  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    path: pathname,
    search: search,
    hash: match[7]
  };

}
function hash(value: string): string {
  return SHA256(value);
}

function hexEncode(value: string): string {
  // return enc.Hex(value);
  return enc.Hex.stringify(value);
  // return value.toString(enc.Hex);
}

export function hashCanonicalRequest(request): string {
  return hexEncode(hash(request));
}

function hmac(secret: string, value: string): string {
  // return HmacSHA256(value, secret);
  // return enc.Hex.stringify(HmacSHA256(value, secret, { asBytes: true }));
  // return enc.Hex.stringify(HmacSHA256(value, secret));
  return HmacSHA256(value, secret, { asBytes: true });
}

export function buildCanonicalRequest(method: RequestMethod, path: string, search: URLSearchParams, headers: Headers, payload: string) {
  // function buildCanonicalRequest(requestOptions: RequestOptions): string {

  return buildCanonicalMethod(method) + '\n' +
    buildCanonicalUri(path) + '\n' +
    buildCanonicalQueryString(search) + '\n' +
    buildCanonicalHeaders(headers) + '\n' +
    buildCanonicalSignedHeaders(headers) + '\n' +
    hexEncode(hash(payload));
};

function buildCanonicalMethod(method: RequestMethod): string {
  // if (typeof method === 'string') {
  //   return method.toUpperCase();
  // }
  switch (method) {
    case RequestMethod.Get:
      return 'GET';
    case RequestMethod.Post:
      return 'POST';
    case RequestMethod.Put:
      return 'PUT';
    case RequestMethod.Delete:
      return 'DELETE';
    case RequestMethod.Options:
      return 'OPTIONS';
    case RequestMethod.Head:
      return 'HEAD';
    case RequestMethod.Patch:
      return 'PATCH';
  }
}

function buildCanonicalUri(uri): string {
  return encodeURI(uri);
}

function buildCanonicalQueryString(search: URLSearchParams): string {
  const paramsMap = search.paramsMap;
  const sortedQueryParams: string[] = [];
  paramsMap.forEach((_, key) => {
    sortedQueryParams.push(key);
  });
  sortedQueryParams.sort();
  // console.log(sortedQueryParams);

  let canonicalQueryString = '';
  sortedQueryParams.forEach(value => {
    canonicalQueryString += value + '=' + encodeURIComponent(search.get(value)) + '&';
  });

  return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
}

function buildCanonicalHeaders(headers: Headers): string {
  let canonicalHeaders = '';
  const sortedKeys: string[] = [];
  headers.forEach((_, name) => {
    sortedKeys.push(name.toLowerCase());
  });
  sortedKeys.sort();

  sortedKeys.forEach(name => {
    const values = headers.getAll(name);
    let valueString = '';
    values.forEach(value => {
      valueString += value + '; ';
    });
    valueString = valueString.substr(0, valueString.length - 2);
    canonicalHeaders += name.toLowerCase() + ':' + valueString + '\n';
  });
  console.log('adfkasdflkajsdlkf');
  console.log(canonicalHeaders);
  return canonicalHeaders;
}

function buildCanonicalSignedHeaders(headers: Headers): string {
  const sortedKeys: string[] = [];
  headers.forEach((_, name) => {
    sortedKeys.push(name.toLowerCase());
  });
  sortedKeys.sort();

  return sortedKeys.join(';');
}

function buildCredentialScope(datetime: string, region: string, service: string) {
  return datetime.substr(0, 8) + '/' + region + '/' + service + '/' + AWS4_REQUEST;
}


function buildStringToSign(datetime: string, credentialScope: string, hashedCanonicalRequest: string) {
  return AWS_SHA_256 + '\n' +
    datetime + '\n' +
    credentialScope + '\n' +
    hashedCanonicalRequest;
}

function calculateSigningKey(secretKey: string, datetime: string, region: string, service: string): string {
  return hmac(hmac(hmac(hmac(AWS4 + secretKey, datetime.substr(0, 8)), region), service), AWS4_REQUEST);
}

function calculateSignature(key: string, stringToSign: string): string {
  return hexEncode(hmac(key, stringToSign));
}

function buildAuthorizationHeader(accessKey: string, credentialScope: string, headers: Headers, signature: string): string {
  return AWS_SHA_256 +
    ' Credential=' +
    accessKey +
    '/' +
    credentialScope +
    ', SignedHeaders=' +
    buildCanonicalSignedHeaders(headers) +
    ', Signature=' + signature;
}
