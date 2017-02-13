import { Action } from '@ngrx/store';
import { type } from '../../util';

export const ActionTypes = {
  SIGN_UP_REQUEST:  type('[Auth] Sign Up Request'),
  SIGN_UP_SUCCESS:  type('[Auth] Sign Up Success'),
  SIGN_UP_FAILURE:  type('[Auth] Sign Up Failure'),
  SIGN_UP_RESET:    type('[Auth] Sign Up Reset'),
};

export class SignUpRequestAction implements Action {
  type = ActionTypes.SIGN_UP_REQUEST;
  constructor(public alias: string, public password: string) { }
}

export class SignUpSuccessAction implements Action {
  type = ActionTypes.SIGN_UP_SUCCESS;
  constructor(public username: string) { }
}

export class SignUpFailureAction implements Action {
  type = ActionTypes.SIGN_UP_FAILURE;
  constructor(public error: Error) { }
}

export class SignUpResetAction implements Action {
  type = ActionTypes.SIGN_UP_RESET;
}

export type Actions
  = SignUpRequestAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | SignUpResetAction;
