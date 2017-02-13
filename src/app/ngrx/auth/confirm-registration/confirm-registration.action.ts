import { Action } from '@ngrx/store';

import { type } from '../../util';

export const ActionTypes = {
  CONFIRM_REGISTRATION_REQUEST: type('[Auth] Confirm Registration Request'),
  CONFIRM_REGISTRATION_SUCCESS: type('[Auth] Confirm Registration Success'),
  CONFIRM_REGISTRATION_FAILURE: type('[Auth] Confirm Registration Failure'),
  CONFRIM_REGISTRATION_RESET:   type('[Auth] Confirm Registration Reset')
};

export class ConfirmRegistrationRequestAction implements Action {
  type = ActionTypes.CONFIRM_REGISTRATION_REQUEST;
  constructor(public username: string, public confirmationCode: string) { }
}

export class ConfirmRegistrationSuccessAction implements Action {
  type = ActionTypes.CONFIRM_REGISTRATION_SUCCESS;
}

export class ConfirmRegistrationFailureAction implements Action {
  type = ActionTypes.CONFIRM_REGISTRATION_FAILURE;
  constructor(public error: Error) { }
}

export class ConfirmRegistrationResetAction implements Action {
  type = ActionTypes.CONFRIM_REGISTRATION_RESET;
}

export type Actions
  = ConfirmRegistrationRequestAction
  | ConfirmRegistrationSuccessAction
  | ConfirmRegistrationFailureAction
  | ConfirmRegistrationResetAction;
