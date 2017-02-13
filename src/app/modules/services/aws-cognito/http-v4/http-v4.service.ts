import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { config as awsConfig } from 'aws-sdk';
// import { Credentials } from 'aws-sdk';

import { AwsClientConfig, buildSigV4Header } from './sig-v4';
export { AwsClientConfig }

@Injectable()
export class HttpV4 extends Http {

  constructor(connectionBackend: ConnectionBackend, requestOptions: RequestOptions) {
    super(connectionBackend, requestOptions);
    console.log('HttpV4 constructor');
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.create((observer: Observer<Response>) => {
      awsConfig.getCredentials(error => {
        if (error || (awsConfig.credentials === (undefined || null))) {
          observer.next(new Response(new ResponseOptions({ status: 401 })));
          observer.complete();
          return;
        } else {
          const awsClientConfig: AwsClientConfig = {
            accessKey: awsConfig.credentials.accessKeyId,
            secretKey: awsConfig.credentials.secretAccessKey,
            sessionToken: awsConfig.credentials.sessionToken,
            serviceName: 'execute-api',
            region: (awsConfig.region === undefined) ? 'ap-northeast-1' : awsConfig.region
          };
          const headers = buildSigV4Header(url, awsClientConfig, options);

          if (typeof url === 'string') {
            console.log('url is string');
            console.log(headers);
            const requestOptions = new RequestOptions({ headers: headers }).merge(options);
            super.request(url, requestOptions)
              .subscribe(response => observer.next(response));
          } else {
            console.log('url is not string');
            console.log(url);
            console.log(headers);
            headers.forEach((value, name) => url.headers.set(name, value));
            url.headers.delete('host');
            super.request(url, options)
              .subscribe(response => observer.next(response));
          }
          observer.complete();
          return;
        }
      });
    });
  }
}
