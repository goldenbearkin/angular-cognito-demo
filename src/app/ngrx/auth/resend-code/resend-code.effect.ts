import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ActionTypes, ResendCodeRequestAction, ResendCodeSuccessAction, ResendCodeFailureAction } from './resend-code.action';
import { UserRegistrationService } from '../../../modules/services/aws-cognito/user-registration/user-registration.service';

@Injectable()
export class ResendCodeEffects {

  @Effect() request$: Observable<Action> = this.actions$
    .ofType(ActionTypes.RESEND_CODE_REQUEST)
    .filter<ResendCodeRequestAction>(action => action instanceof ResendCodeRequestAction)
    .switchMap(
      action => this.userRegistrationService.resendCode$(action.username)
        .mapTo(new ResendCodeSuccessAction())
        .catch(err => Observable.of(new ResendCodeFailureAction(err)))
    );

  constructor(private actions$: Actions, private userRegistrationService: UserRegistrationService) { }
}
