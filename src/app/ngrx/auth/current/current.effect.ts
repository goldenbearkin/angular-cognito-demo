import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import {
  ActionTypes,
  CurrentInitAction,
  CurrentRequestAction, CurrentSuccessAction, CurrentFailureAction,
  CurrentResetRequestAction, CurrentResetSuccessAction, CurrentResetFailureAction
} from './current.action';

import { UserLoginService } from '../../../modules/services/aws-cognito/user-login/user-login.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrentEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(ActionTypes.CURRENT_INIT)
    .filter<CurrentInitAction>(action => action instanceof CurrentInitAction)
    .switchMapTo(
      this.userLoginService.isInitAuthenticated$()
        .mapTo(new CurrentRequestAction())
        .catch(err => Observable.of(new CurrentFailureAction(err)))
    );

  @Effect() request$: Observable<Action> = this.actions$
    .ofType(ActionTypes.CURRENT_REQUEST)
    .filter<CurrentRequestAction>(action => action instanceof CurrentRequestAction)
    .switchMapTo(
    Observable.of({ username: 'Jason', picture: 'Jason picture' })
      .map(({username, picture}) => new CurrentSuccessAction(username, picture))
      .catch(err => Observable.of(new CurrentFailureAction(err)))
    );

  @Effect() reset$: Observable<Action> = this.actions$
    .ofType(ActionTypes.CURRENT_RESET_REQUEST)
    .filter<CurrentResetRequestAction>(action => action instanceof CurrentResetRequestAction)
    .switchMapTo(
    this.userLoginService.logout()
      .mapTo(new CurrentResetSuccessAction())
      .catch(err => Observable.of(new CurrentFailureAction(err)))
    );

  constructor(private actions$: Actions, private userLoginService: UserLoginService) { }
}
