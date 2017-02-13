import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
  ActionTypes,
  ForgotPasswordRequestAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction
} from './forgot-password.action';
import { UserLoginService } from '../../../modules/services/aws-cognito/user-login/user-login.service';

@Injectable()
export class ForgotPasswordEffects {

  @Effect() request$: Observable<Action> = this.actions$
    .ofType(ActionTypes.FORGOT_PASSWORD_REQUEST)
    .filter<ForgotPasswordRequestAction>(action => action instanceof ForgotPasswordRequestAction)
    .switchMap(
      action => this.userLoginService.forgotPassword$(action.alias)
        .mapTo(new ForgotPasswordSuccessAction())
        .catch(err => Observable.of(new ForgotPasswordFailureAction(err)))
    );

  constructor(private actions$: Actions, private userLoginService: UserLoginService) { }
}
