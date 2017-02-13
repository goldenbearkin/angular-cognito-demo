import { Actions, ActionTypes, SignUpSuccessAction, SignUpFailureAction } from './sign-up.action';

export type OnProcessT = {
  current: 'onProcess';
};

export type OnSuccessT = {
  current: 'onSuccess';
  payload: { username: string }
};

export type OnFailureT = {
  current: 'onFailure';
  error: Error;
};

export type OnResetT = {
  current: null;
};

export type SignUpStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;


export function signUpReducer(state: SignUpStateT = { current: null }, action: Actions): SignUpStateT {
  switch (action.type) {
    case ActionTypes.SIGN_UP_REQUEST:
      return { current: 'onProcess' };

    case ActionTypes.SIGN_UP_SUCCESS:
      return {
        current: 'onSuccess',
        payload: { username: (<SignUpSuccessAction>action).username }
      };

    case ActionTypes.SIGN_UP_FAILURE:
      return {
        current: 'onFailure',
        error: (<SignUpFailureAction>action).error
      };

    case ActionTypes.SIGN_UP_RESET:
      return { current: null };

    default:
      return state;
  }
}
