// /* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { config } from 'aws-sdk';

import { AwsCognitoModule } from '../aws-cognito.module';
import { UserLoginService } from './user-login.service';
import { CognitoUtilityService, PoolData, IdentityPoolId } from '../cognito-utility/cognito-utility.service';

import { mockPoolData, mockIdentityPoolId, mockTokens } from '../commons';

describe(`Service: UserLoginService`, () => {
  let userLoginService: UserLoginService;
  let cognitoUtilityService: CognitoUtilityService;
  let cognitoUser: CognitoUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AwsCognitoModule.setConfig(mockPoolData, mockIdentityPoolId)]
    });
  });

  beforeEach(() => {
    userLoginService = TestBed.get(UserLoginService);
    cognitoUtilityService = TestBed.get(CognitoUtilityService);

    cognitoUser = new CognitoUser({
      Username: 'mockUsername',
      Pool: cognitoUtilityService.getUserPool()
    });
    spyOn(userLoginService, '_cognitoUserFactory')
      .and.callFake(userData => cognitoUser);
  });

  it(`(_authCognito$) should return id token if succeeded`, done => {
    spyOn(cognitoUser, 'authenticateUser')
      .and.callFake((authenticationDetails, callback) => callback.onSuccess(mockTokens));

    (<any>userLoginService)._authCognito$('mockAlias', 'mockPassword')
      .subscribe({
        next: token => expect(token).toEqual({ idToken: 'mockIdToken' }),
        complete: () => done()
      });
  });

  it(`(_authCognito$) should return error object if failed`, done => {
    spyOn(cognitoUser, 'authenticateUser')
      .and.callFake((authenticationDetails, callback) => callback.onFailure(new Error('Some error messages')));

    (<any>userLoginService)._authCognito$('mockAlias', 'mockPassword')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });

  it(`(_authAWS$) should return true if succeeded`, done => {
    spyOn(config, 'getCredentials')
      .and.callFake(callback => callback(null));

    (<any>userLoginService)._authAWS$('mockIdToken')
      .subscribe({
        next: result => expect(result).toEqual(true),
        complete: () => done()
      });
  });

  it(`(_authAWS$) should return error object if failed`, done => {
    spyOn(config, 'getCredentials')
      .and.callFake(callback => callback(new Error('Some error messages')));

    (<any>userLoginService)._authAWS$('mockIdToken')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });

  it(`(_cognitoUserFactory) should return new CognitoUser`, () => {
    const userData = {
      Username: 'mockUsername',
      Pool: cognitoUtilityService.getUserPool()
    };

    const newCognitoUser = new CognitoUser(userData);
    const cognitoUserFactory = (<any>userLoginService)._cognitoUserFactory(userData);

    expect(cognitoUserFactory.getUsername()).toEqual(newCognitoUser.getUsername());
    expect(cognitoUserFactory).not.toEqual(newCognitoUser);
  });

  it(`(authenticate$) should return true if succeed`, done => {
    spyOn(config, 'getCredentials')
      .and.callFake(callback => callback(null));

    spyOn(cognitoUser, 'authenticateUser')
      .and.callFake((authenticationDetails, callback) => callback.onSuccess(mockTokens));

    userLoginService.authenticate$('mockAlias', 'mockPassword')
      .subscribe({
        next: result => expect(result).toEqual(true),
        complete: () => done()
      });
  });

  it(`(authenticate$) should return error object if failed`, done => {
    spyOn(config, 'getCredentials')
      .and.callFake(callback => callback(new Error('Some error messages')));

    spyOn(cognitoUser, 'authenticateUser')
      .and.callFake((authenticationDetails, callback) => callback.onSuccess(mockTokens));

    userLoginService.authenticate$('mockAlias', 'mockPassword')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });

  it(`(forgotPassword$) should finish at inputVerficationCode callback if on inputVerificationCode callback`, done => {
    spyOn(cognitoUser, 'forgotPassword')
      .and.callFake(callback => callback.inputVerificationCode());

    userLoginService.forgotPassword$('mockAlias')
      .subscribe({
        complete: () => done()
      });
  });

  it(`(forgotPassword$) should return error object if on onSuccess callback`, done => {
    spyOn(cognitoUser, 'forgotPassword')
      .and.callFake(callback => callback.onSuccess());

    userLoginService.forgotPassword$('mockAlias')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Internal Error'));
          done();
        }
      });
  });

  it(`(forgotPassword$) should return error object if failed`, done => {
    spyOn(cognitoUser, 'forgotPassword')
      .and.callFake(callback => callback.onFailure(new Error('Some error messages')));

    userLoginService.forgotPassword$('mockAlias')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });

  it(`(confirmNewPassword$) should return true if succeeded`, done => {
    spyOn(cognitoUser, 'confirmPassword')
      .and.callFake((verificationCode, newPassword, callback) => callback.onSuccess(true));

    userLoginService.confirmNewPassword$('mockAlias', 'mockVerificationCode', 'mockNewPassword')
      .subscribe({
        next: result => expect(result).toEqual(true),
        complete: () => done()
      });
  });

  it(`(confirmNewPassword$) should return error object if failed`, done => {
    spyOn(cognitoUser, 'confirmPassword')
      .and.callFake((verificationCode, newPassword, callback) => callback.onFailure(new Error('Some error messages')));

    userLoginService.confirmNewPassword$('mockAlias', 'mockVerificationCode', 'mockNewPassword')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });
});
