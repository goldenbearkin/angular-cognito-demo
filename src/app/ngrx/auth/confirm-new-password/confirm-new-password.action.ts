import { Action } from '@ngrx/store';

import { type } from '../../util';

export const ActionTypes = {
  CONFIRM_NEW_PASSWORD_REQUEST: type('[Auth] Confirm New Password Request'),
  CONFIRM_NEW_PASSWORD_SUCCESS: type('[Auth] Confirm New Password Success'),
  CONFIRM_NEW_PASSWORD_FAILURE: type('[Auth] Confirm New Password Failure'),
  CONFIRM_NEW_PASSWORD_RESET:   type('[Auth] Confirm New Password Reset')
};

type ActionTypesT = 'CONFIRM_NEW_PASSWORD_REQUEST'
  | 'CONFIRM_NEW_PASSWORD_SUCCESS'
  | 'CONFIRM_NEW_PASSWORD_FAILURE'
  | 'CONFIRM_NEW_PASSWORD_RESET';

export class ConfirmNewPasswordRequestAction implements Action {
  type = ActionTypes.CONFIRM_NEW_PASSWORD_REQUEST;
  constructor(public alias: string, public confirmationCode: string, public newPassword: string) { }
}

export class ConfirmNewPasswordSuccessAction implements Action {
  type = ActionTypes.CONFIRM_NEW_PASSWORD_SUCCESS;
}

export class ConfirmNewPasswordFailureAction implements Action {
  type = ActionTypes.CONFIRM_NEW_PASSWORD_FAILURE;
  constructor(public error: Error) { }
}

export class ConfirmNewPasswordResetAction implements Action {
  type = ActionTypes.CONFIRM_NEW_PASSWORD_RESET;
}

export type Actions
  = ConfirmNewPasswordRequestAction
  | ConfirmNewPasswordSuccessAction
  | ConfirmNewPasswordFailureAction
  | ConfirmNewPasswordResetAction;
