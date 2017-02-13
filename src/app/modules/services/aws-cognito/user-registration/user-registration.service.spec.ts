// // /* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { AwsCognitoModule } from '../aws-cognito.module';
import { UserRegistrationService } from './user-registration.service';
import { CognitoUtilityService, PoolData, IdentityPoolId } from '../cognito-utility/cognito-utility.service';

import { mockPoolData, mockIdentityPoolId, mockTokens } from '../commons';

describe(`Service: UserRegistrationService`, () => {
  let userRegistrationService: UserRegistrationService;
  let cognitoUtilityService: CognitoUtilityService;
  let cognitoUser: CognitoUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AwsCognitoModule.setConfig(mockPoolData, mockIdentityPoolId)]
    });
  });

  beforeEach(() => {
    userRegistrationService = TestBed.get(UserRegistrationService);
    cognitoUtilityService = TestBed.get(CognitoUtilityService);

    const POOL_DATA = TestBed.get(PoolData);
    const userPool = new CognitoUserPool(POOL_DATA);

    spyOn(userRegistrationService, '_userPoolFactory')
      .and.callFake(() => userPool);

    spyOn(userRegistrationService, '_usernameFactory')
      .and.callFake(() => 'mockUsername');

    cognitoUser = new CognitoUser({
      Username: 'mockAlias',
      Pool: userPool
    });

    spyOn(userRegistrationService, '_cognitoUserFactory')
      .and.callFake(userData => cognitoUser);
  });

  it(`(register$) should return alias, username and password if succeeded`, done => {
    spyOn((userRegistrationService as any)._userPoolFactory(), 'signUp')
      .and.callFake((systemUsername, password, attributeList, validationData, callback) => {
        return callback(null, { user: { getUsername: () => systemUsername } });
      });

    userRegistrationService.register$('mockAlias', 'mockPassword')
      .subscribe({
        next: result => expect(result).toEqual({
          username: 'mockUsername',
        }),
        complete: () => done()
      });
  });

  it(`(register$) should return error object if failed`, done => {
    spyOn((userRegistrationService as any)._userPoolFactory(), 'signUp')
      .and.callFake((username, password, attributeList, validationData, callback) => {
        return callback(new Error('Some error messages'), null);
      });

    userRegistrationService.register$('mockAlias', 'mockPassword')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });

  it(`(confirmRegistration$) should return true if succeeded`, done => {
    spyOn(cognitoUser, 'confirmRegistration')
      .and.callFake((confirmationCode, forceAliasCreation, callback) => callback(null, true));

    userRegistrationService.confirmRegistration$('mockUsername', 'mockCode')
      .subscribe({
        next: result => expect(result).toEqual(true),
        complete: () => done()
      });
  });

  it(`(confirmRegistration$) should return error object if failed`, done => {
    spyOn(cognitoUser, 'confirmRegistration')
      .and.callFake((confirmationCode, forceAliasCreation, callback) => callback(new Error('Some error messages'), null));

    userRegistrationService.confirmRegistration$('mockUsername', 'mockCode')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });

  it(`(resendCode$) should return true if succeeded`, done => {
    spyOn(cognitoUser, 'resendConfirmationCode')
      .and.callFake(callback => callback(null, true));

    userRegistrationService.resendCode$('mockUsername')
      .subscribe({
        next: result => expect(result).toEqual(true),
        complete: () => done()
      });
  });

  it('(resendCode$) should return error object if failed', done => {
    spyOn(cognitoUser, 'resendConfirmationCode')
      .and.callFake(callback => callback(new Error('Some error messages'), null));

    userRegistrationService.resendCode$('mockUsername')
      .subscribe({
        error: err => {
          expect(err).toEqual(new Error('Some error messages'));
          done();
        }
      });
  });
});
