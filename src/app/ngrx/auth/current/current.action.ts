import { Action } from '@ngrx/store';
import { type } from '../../util';

export const ActionTypes = {
  CURRENT_INIT:           type('[Auth] Current Init'),
  CURRENT_REQUEST:        type('[Auth] Current Request'),
  CURRENT_SUCCESS:        type('[Auth] Current Success'),
  CURRENT_FAILURE:        type('[Auth] Current Failure'),
  CURRENT_RESET_REQUEST:  type('[Auth] Current Reset Request'),
  CURRENT_RESET_SUCCESS:  type('[Auth] Current Reset Success'),
  CURRENT_RESET_FAILURE:  type('[Auth] Current Reset Failure'),
};

export class CurrentInitAction implements Action {
  type = ActionTypes.CURRENT_INIT;
}

export class CurrentRequestAction implements Action {
  type = ActionTypes.CURRENT_REQUEST;
}

export class CurrentSuccessAction implements Action {
  type = ActionTypes.CURRENT_SUCCESS;
  constructor(public username: string, public picture: string) { }
}

export class CurrentFailureAction implements Action {
  type = ActionTypes.CURRENT_FAILURE;
  constructor(public error: Error) { }
}

  export class CurrentResetRequestAction implements Action {
  type = ActionTypes.CURRENT_RESET_REQUEST;
}

export class CurrentResetSuccessAction implements Action {
  type = ActionTypes.CURRENT_RESET_SUCCESS;
}

export class CurrentResetFailureAction implements Action {
  type = ActionTypes.CURRENT_RESET_FAILURE;
}

export type Actions
  = CurrentInitAction
  | CurrentRequestAction
  | CurrentSuccessAction
  | CurrentFailureAction
  | CurrentResetRequestAction
  | CurrentResetSuccessAction
  | CurrentResetFailureAction;
