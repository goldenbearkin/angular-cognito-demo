import { Actions, ActionTypes, ConfirmRegistrationSuccessAction, ConfirmRegistrationFailureAction } from './confirm-registration.action';

export type OnProcessT = {
  current: 'onProcess';
};

export type OnSuccessT = {
  current: 'onSuccess';
};

export type OnFailureT = {
  current: 'onFailure';
  error: Error;
};

export type OnResetT = {
  current: null;
};

export type ConfirmRegistrationStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;

export function confirmRegistrationReducer(state: ConfirmRegistrationStateT = {current: null}, action: Actions): ConfirmRegistrationStateT {
  switch (action.type) {
    case ActionTypes.CONFIRM_REGISTRATION_REQUEST:
      return { current: 'onProcess' };

    case ActionTypes.CONFIRM_REGISTRATION_SUCCESS:
      return { current: 'onSuccess' };

    case ActionTypes.CONFIRM_REGISTRATION_FAILURE:
      return {
        current: 'onFailure',
        error: (<ConfirmRegistrationFailureAction>action).error
      };

    case ActionTypes.CONFRIM_REGISTRATION_RESET:
      return { current: null };

    default:
      return state;
  }
}
