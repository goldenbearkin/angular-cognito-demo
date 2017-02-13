// /* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { CognitoUser } from 'amazon-cognito-identity-js';

import { AwsCognitoModule } from '../aws-cognito.module';
import { CognitoUtilityService, PoolData, IdentityPoolId } from './cognito-utility.service';
import { mockPoolData, mockIdentityPoolId, mockTokens } from '../commons';

const mockValidSession = Object.assign({}, mockTokens, { isValid: () => true });
const mockInvalidSession = Object.assign({}, mockTokens, { isValid: () => false });

describe(`Service: CognitoUtilityService`, () => {
  let cognitoUtilityService: CognitoUtilityService;
  let currentUser: CognitoUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AwsCognitoModule.setConfig(mockPoolData, mockIdentityPoolId)]
    });
  });

  beforeEach(() => {
    cognitoUtilityService = TestBed.get(CognitoUtilityService);

    currentUser = new CognitoUser({
      Username: 'mockUsername',
      Pool: cognitoUtilityService.getUserPool()
    });

    spyOn(cognitoUtilityService, 'getCurrentUser')
      .and.callFake(() => currentUser);
  });

  it(`(getAccessToken$) should return access token if succeed`, done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(null, mockValidSession);
      });

    cognitoUtilityService.getAccessToken$()
      .subscribe({
        next: token => expect(token).toEqual({ accessToken: 'mockAccessToken' }),
        complete: () => done()
      });
  });

  it(`(getAccessToken$) should return error object if failed`, done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(new Error('Some error messagess'), null);
      });

    cognitoUtilityService.getAccessToken$()
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messagess'));
          done();
        }
      });
  });

  it(`(getAccessToken$) should return error object if session is invalid`, done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(null, mockInvalidSession);
      });

    cognitoUtilityService.getAccessToken$()
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error(`Session is invalid`));
          done();
        }
      });
  });

  it(`(getIdToken$) should return id token if succeed`, done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(null, mockValidSession);
      });

    cognitoUtilityService.getIdToken$()
      .subscribe({
        next: token => expect(token).toEqual({ idToken: 'mockIdToken' }),
        complete: () => done()
      });
  });

  it('(getIdToken$) should return error object if failed', done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(new Error('Some error messagess'), null);
      });

    cognitoUtilityService.getIdToken$()
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messagess'));
          done();
        }
      });
  });

  it('(getIdToken$) should return error object if session is invalid', done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(null, mockInvalidSession);
      });

    cognitoUtilityService.getIdToken$()
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error(`Session is invalid`));
          done();
        }
      });
  });

  it('(getRefreshToken$) should return id token if succeed', done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(null, mockValidSession);
      });

    cognitoUtilityService.getRefreshToken$()
      .subscribe({
        next: token => expect(token).toEqual({ refreshToken: 'mockRefreshToken' }),
        complete: () => done()
      });
  });

  it('(getRefreshToken$) should return error object if failed', done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(new Error('Some error messagess'), null);
      });

    cognitoUtilityService.getRefreshToken$()
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messagess'));
          done();
        }
      });
  });

  it('(getRefreshToken$) should return error object if session is invalid', done => {
    spyOn(currentUser, 'getSession')
      .and.callFake(callback => {
        callback(null, mockInvalidSession);
      });

    cognitoUtilityService.getRefreshToken$()
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error(`Session is invalid`));
          done();
        }
      });
  });
});
