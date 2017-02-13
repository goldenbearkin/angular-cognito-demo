import { Action } from '@ngrx/store';
import { type } from '../../util';

export const ActionTypes = {
  RESEND_CODE_REQUEST:  type('[Auth] Resend Code Request'),
  RESEND_CODE_SUCCESS:  type('[Auth] Resend Code Success'),
  RESEND_CODE_FAILURE:  type('[Auth] Resend Code Failure'),
  RESEND_CODE_RESET:    type('[Auth] Resend Code Reset'),
};

export class ResendCodeRequestAction implements Action {
  type = ActionTypes.RESEND_CODE_REQUEST;
  constructor(public username: string) { }
}

export class ResendCodeSuccessAction implements Action {
  type = ActionTypes.RESEND_CODE_SUCCESS;
}

export class ResendCodeFailureAction implements Action {
  type = ActionTypes.RESEND_CODE_FAILURE;
  constructor(public error: Error) { }
}

export class ResendCodeResetAction implements Action {
  type = ActionTypes.RESEND_CODE_RESET;
}

export type Actions
  = ResendCodeRequestAction
  | ResendCodeSuccessAction
  | ResendCodeFailureAction
  | ResendCodeResetAction;
