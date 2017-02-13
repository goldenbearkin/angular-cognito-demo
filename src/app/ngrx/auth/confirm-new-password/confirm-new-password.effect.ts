import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
  ActionTypes,
  ConfirmNewPasswordRequestAction,
  ConfirmNewPasswordSuccessAction,
  ConfirmNewPasswordFailureAction
} from './confirm-new-password.action';

import { UserLoginService } from '../../../modules/services/aws-cognito/user-login/user-login.service';

@Injectable()
export class ConfirmNewPasswordEffects {

  @Effect() request$: Observable<Action> = this.actions$
    .ofType(ActionTypes.CONFIRM_NEW_PASSWORD_REQUEST)
    .filter<ConfirmNewPasswordRequestAction>(action => action instanceof ConfirmNewPasswordRequestAction)
    .switchMap(
      action => this.userLoginService.confirmNewPassword$(
        action.alias,
        action.confirmationCode,
        action.newPassword
      )
      .mapTo(new ConfirmNewPasswordSuccessAction())
      .catch(err => Observable.of(new ConfirmNewPasswordFailureAction(err)))
    );

  constructor(private actions$: Actions, private userLoginService: UserLoginService) { }
}
