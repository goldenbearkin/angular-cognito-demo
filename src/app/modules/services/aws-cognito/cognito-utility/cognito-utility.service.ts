import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export const PoolData = new OpaqueToken('AWS_POOL_DATA');
export const IdentityPoolId = new OpaqueToken('AWS_IDENTITY_POOL_ID');

export type PoolDataT = {
  UserPoolId: string;
  ClientId: string;
};

@Injectable()
export class CognitoUtilityService {
  constructor(
    @Inject(PoolData)
    public readonly POOL_DATA: any,
    @Inject(IdentityPoolId)
    public readonly IDENTITY_POOL_ID: string) { }

  getUserPool() {
    return new CognitoUserPool(<PoolDataT>this.POOL_DATA);
  }

  getCurrentUser(): CognitoUser | null {
    return this.getUserPool().getCurrentUser();
  }

  getAccessToken$(): Observable<{ accessToken: string }> {
    const currentUser = this.getCurrentUser();
    return Observable.create((observer: Observer<{ accessToken: string }>) => {
      if (currentUser === null) {
        observer.error(new Error('CognitoUser cannot be null.'));
        return;
      }

      currentUser.getSession((err, session) => {
        if (err) {
          observer.error(err);
          return;
        }

        if (!session.isValid()) {
          observer.error(new Error(`Session is invalid`));
          return;
        }

        observer.next({ accessToken: session.getAccessToken().getJwtToken() });
        observer.complete();
      });
    });
  }

  getIdToken$(): Observable<{ idToken: string }> {
    const currentUser = this.getCurrentUser();
    return Observable.create((observer: Observer<{ idToken: string }>) => {
      if (currentUser === null) {
        observer.error(new Error('CognitoUser cannot be null.'));
        return;
      }

      currentUser.getSession((err, session) => {
        if (err) {
          observer.error(err);
          return;
        }

        if (!session.isValid()) {
          observer.error(new Error(`Session is invalid`));
          return;
        }

        observer.next({ idToken: session.getIdToken().getJwtToken() });
        observer.complete();
      });
    });
  }

  getRefreshToken$(): Observable<{ refreshToken: string }> {
    const currentUser = this.getCurrentUser();
    return Observable.create((observer: Observer<{ refreshToken: string }>) => {
      if (currentUser === null) {
        observer.error(new Error('CognitoUser cannot be null.'));
        return;
      }

      currentUser.getSession((err, session) => {
        if (err) {
          observer.error(err);
          return;
        }

        if (!session.isValid()) {
          observer.error(new Error(`Session is invalid`));
        }

        observer.next({ refreshToken: session.getRefreshToken() });
        observer.complete();
      });
    });
  }
}
