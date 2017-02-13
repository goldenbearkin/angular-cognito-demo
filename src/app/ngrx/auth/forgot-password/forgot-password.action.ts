import { Action } from '@ngrx/store';

import { type } from '../../util';

export const ActionTypes = {
  FORGOT_PASSWORD_REQUEST:  type('[Auth] Forgot Password code Request'),
  FORGOT_PASSWORD_SUCCESS:  type('[Auth] Forgot Password code Success'),
  FORGOT_PASSWORD_FAILURE:  type('[Auth] Forgot Password code Failure'),
  FORGOT_PASSWORD_RESET:    type('[Auth] Forgot Password code Reset'),
};

export class ForgotPasswordRequestAction implements Action {
  type = ActionTypes.FORGOT_PASSWORD_REQUEST;
  constructor(public alias: string) { }
}

export class ForgotPasswordSuccessAction implements Action {
  type = ActionTypes.FORGOT_PASSWORD_SUCCESS;
}

export class ForgotPasswordFailureAction implements Action {
  type = ActionTypes.FORGOT_PASSWORD_FAILURE;
  constructor(public error: Error) { }
}

export class ForgotPasswordResetAction implements Action {
  type = ActionTypes.FORGOT_PASSWORD_RESET;
}

export type Actions
  = ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction
  | ForgotPasswordResetAction;
