import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ActionTypes, SignUpRequestAction, SignUpSuccessAction, SignUpFailureAction } from './sign-up.action';
import { UserRegistrationService } from '../../../modules/services/aws-cognito/user-registration/user-registration.service';

@Injectable()
export class SignUpEffects {

  @Effect() request$: Observable<Action> = this.actions$
    .ofType(ActionTypes.SIGN_UP_REQUEST)
    .filter<SignUpRequestAction>(action => action instanceof SignUpRequestAction)
    .switchMap(
      action => this.userRegistrationService.register$(action.alias, action.password)
        .map(({username}) => new SignUpSuccessAction(username))
        .catch(err => Observable.of(new SignUpFailureAction(err)))
    );

  constructor(private actions$: Actions, private userRegistrationService: UserRegistrationService) { }
}
