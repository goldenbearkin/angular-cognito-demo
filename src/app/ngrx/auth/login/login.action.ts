import { Action } from '@ngrx/store';
import { type } from '../../util';

export const ActionTypes = {
  LOGIN_REQUEST:  type('[Auth] Login Request'),
  LOGIN_SUCCESS:  type('[Auth] Login Success'),
  LOGIN_FAILURE:  type('[Auth] Login Failure'),
  LOGIN_RESET:    type('[Auth] Login Reset'),
};

export class LoginRequestAction implements Action {
  type = ActionTypes.LOGIN_REQUEST;
  constructor(public alias: string, public password: string) { }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
}

export class LoginFailureAction implements Action {
  type = ActionTypes.LOGIN_FAILURE;
  constructor(public error: Error) { }
}

export class LoginResetAction implements Action {
  type = ActionTypes.LOGIN_RESET;
}

export type Actions
  = LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LoginResetAction;
