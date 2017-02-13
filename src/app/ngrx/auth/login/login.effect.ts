import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ActionTypes, LoginRequestAction, LoginSuccessAction, LoginFailureAction } from './login.action';
import { UserLoginService } from '../../../modules/services/aws-cognito/user-login/user-login.service';

@Injectable()
export class LoginEffects {

  @Effect() request$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOGIN_REQUEST)
    .filter<LoginRequestAction>(action => action instanceof LoginRequestAction)
    .switchMap(
      action => this.userLoginService.authenticate$(action.alias, action.password)
        .mapTo(new LoginSuccessAction())
        .catch(err => Observable.of(new LoginFailureAction(err)))
    );

  constructor(private actions$: Actions, private userLoginService: UserLoginService) { }
}
