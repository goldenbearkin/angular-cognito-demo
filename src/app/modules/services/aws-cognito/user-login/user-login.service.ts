import { Injectable } from '@angular/core';
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { config, CognitoIdentityCredentials } from 'aws-sdk';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CognitoUtilityService } from '../cognito-utility/cognito-utility.service';

type UserDataT = {
  Username: string,
  Pool: CognitoUserPool
};

@Injectable()
export class UserLoginService {

  constructor(private cognitoUtilityService: CognitoUtilityService) { }

  private _authCognito$(alias: string, password: string): Observable<{ idToken: string }> {
    const authenticationData = {
      Username: alias,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: alias,
      Pool: this.cognitoUtilityService.getUserPool()
    };

    const cognitoUser = this._cognitoUserFactory(userData);

    return Observable.create((observer: Observer<{ idToken: string }>) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: session => {
          observer.next({ idToken: session.getIdToken().getJwtToken() });
          observer.complete();
        },
        onFailure: error => observer.error(error),
        newPasswordRequired: () => {},  // no-op
        mfaRequired: () => {},  // no-op
        customChallenge: () => {} // no-op
      });
    });
  }

  private _authAWS$(idToken: string): Observable<true> {
    return Observable.create((observer: Observer<true>) => {

      const IdentityPoolId = this.cognitoUtilityService.IDENTITY_POOL_ID;
      const Region = IdentityPoolId.split(':')[0];
      const UserPoolId = this.cognitoUtilityService.POOL_DATA.UserPoolId;

      const logins = {};
      logins[`cognito-idp.${Region}.amazonaws.com/${UserPoolId}`] = idToken;

      config.region = Region;

      config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
        Logins: logins
      });

      config.getCredentials(err => {
        if (err) {
          observer.error(err);
          return;
        }

        observer.next(true);
        observer.complete();
        return;
      });
    });
  }

  private _cognitoUserFactory(userData: UserDataT): CognitoUser {
    return new CognitoUser(userData);
  }

  authenticate$(alias: string, password: string): Observable<true> {
    return this._authCognito$(alias, password)
      .mergeMap(({idToken}) => this._authAWS$(idToken));
  }

  forgotPassword$(alias: string): Observable<true> {
    const userData = {
      Username: alias,
      Pool: this.cognitoUtilityService.getUserPool()
    };

    const cognitoUser = this._cognitoUserFactory(userData);

    return Observable.create((observer: Observer<true>) => {
      cognitoUser.forgotPassword({
        onSuccess: () => observer.error(new Error('Internal Error')),
        onFailure: err => observer.error(err),
        inputVerificationCode: () => {
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  confirmNewPassword$(alias: string, verificationCode: string, newPassword: string): Observable<true> {
    const userData = {
      Username: alias,
      Pool: this.cognitoUtilityService.getUserPool()
    };

    const cognitoUser = this._cognitoUserFactory(userData);

    return Observable.create((observer: Observer<true>) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          observer.next(true);
          observer.complete();
        },
        onFailure: err => observer.error(err)
      });
    });
  }

  logout(): Observable<boolean> {
    return Observable.create((Observer: Observer<boolean>) => {
      const cognitoUser = this.cognitoUtilityService.getCurrentUser();
      if (cognitoUser === null) {
        Observer.error('CognitoUser cannot be null');
        return;
      }
      (<any>cognitoUser).signOut();
      (<any>config.credentials).clearCachedId();
      config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: this.cognitoUtilityService.IDENTITY_POOL_ID,
      });

      Observer.next(true);
      Observer.complete();
    });
  }

  isInitAuthenticated$(): Observable<true> {
    return this.cognitoUtilityService.getIdToken$()
      .mergeMap(({idToken}) => this._authAWS$(idToken));
  }

  isAuthenticated$(): Observable<true> {
    return Observable.create((observer: Observer<true>) => {
      config.getCredentials(err => {
        if (err) {
          observer.error(err);
          return;
        }
        observer.next(true);
        observer.complete();
        return;
      });
    });
  }

}
