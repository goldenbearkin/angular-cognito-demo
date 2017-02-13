# Angular Cognito Demo
An showcase of Angular web app utilizing Amazon Cognito.

## Todos (priority order)
* intergrate with Apollo client
* migrate to ngrx v3 (not yet released)
* write unit tests for widget components

## Known issues
1. The callback type of cognitoUser.authenticateUser hasn't marked the newPasswordRequired, mfaRequired, customChallenge
as optional. Now just declare as no-op. Need to remove after #238 get fixed.
``` typescript
export class UserLoginService {

  constructor(private cognitoUtilityService: CognitoUtilityService) { }

  private _authCognito$(alias: string, password: string): Observable<{ idToken: string }> {
    ...

    return Observable.create((observer: Observer<{ idToken: string }>) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: session => {
          observer.next({ idToken: session.getIdToken().getJwtToken() });
          observer.complete();
        },
        onFailure: error => observer.error(error),
        newPasswordRequired: () => {}, // no-op
        mfaRequired: () => {},  // no-op
        customChallenge: () => {} // no-op
      });
    });
  }
```
