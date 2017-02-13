import { Injectable } from '@angular/core';
import { CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CognitoUtilityService } from '../cognito-utility/cognito-utility.service';

type UserDataT = {
  Username: string,
  Pool: CognitoUserPool
};

@Injectable()
export class UserRegistrationService {

  constructor(private cognitoUtilityService: CognitoUtilityService) { }

  private _userPoolFactory() {
    return this.cognitoUtilityService.getUserPool();
  }

  private _cognitoUserFactory(userData: UserDataT): CognitoUser {
    return new CognitoUser(userData);
  }

  private _usernameFactory(): string {
    return 'system_' + Date.now().toString();
  }

  register$(alias: string, password: string): Observable<{ username: string }> {
    const attributeList: CognitoUserAttribute[] = [];

    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: alias
    };

    attributeList.push(new CognitoUserAttribute(dataPhoneNumber));

    return Observable.create((observer: Observer<{ username: string }>) => {
      const username = this._usernameFactory();

      this._userPoolFactory().signUp(username, password, attributeList, [], (error, result) => {
        if (error) {
          observer.error(error);
          return;
        }
        observer.next({ username: result.user.getUsername() });
        observer.complete();
        return;
      });
    });
  }

  confirmRegistration$(username: string, confirmationCode: string): Observable<true> {
    const userData = {
      Username: username,
      Pool: this.cognitoUtilityService.getUserPool()
    };

    const cognitoUser = this._cognitoUserFactory(userData);

    return Observable.create((observer: Observer<true>) => {
      cognitoUser.confirmRegistration(confirmationCode, false, (err, result) => {
        if (err) {
          observer.error(err);
          return;
        } else {
          observer.next(true);
          observer.complete();
          return;
        }
      });
    });
  }

  resendCode$(username: string): Observable<true> {
    const userData = {
      Username: username,
      Pool: this.cognitoUtilityService.getUserPool()
    };

    const cognitoUser = this._cognitoUserFactory(userData);

    return Observable.create((observer: Observer<true>) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          observer.error(err);
          return;
        } else {
          observer.next(true);
          observer.complete();
          return;
        }
      });
    });
  }
}
