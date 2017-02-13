import { Actions, ActionTypes, LoginSuccessAction, LoginFailureAction } from './login.action';

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

export type LoginStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;

export function loginReducer(state: LoginStateT = { current: null }, action: Actions): LoginStateT {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { current: 'onProcess' };

    case ActionTypes.LOGIN_SUCCESS:
      return { current: 'onSuccess' };

    case ActionTypes.LOGIN_FAILURE:
      return {
        current: 'onFailure',
        error: (<LoginFailureAction>action).error
      };

    case ActionTypes.LOGIN_RESET:
      return { current: null };

    default:
      return state;
  }


  // switch (action.type) {
  //   case ActionTypes.LOGIN_REQUEST:
  //     return { current: 'onProcess' };

  //   case ActionTypes.LOGIN_SUCCESS:
  //     return {
  //       current: 'onSuccess',
  //       payload: { username: (<LoginSuccessAction>action).username }
  //     };

  //   case ActionTypes.LOGIN_FAILURE:
  //     return {
  //       current: 'onFailure',
  //       error: (action as LoginFailureAction).error };

  //   case ActionTypes.LOGIN_RESET:
  //     return { current: 'onReset' };

  //   default:
  //     return state;
  // }
}


// export interface LoginStateT {
//   onProcess?: true;
//   onSuccess?: { username: string };
//   onFailure?: Error;
// }

// export function loginReducer(state: LoginStateT = OnReset, action: Actions): LoginStateT {
//   switch (action.type) {
//     case ActionTypes.LOGIN_REQUEST:
//       return { onProcess: true };

//     case ActionTypes.LOGIN_SUCCESS:
//       return { onSuccess: { username: (<LoginSuccessAction>action).username } };

//     case ActionTypes.LOGIN_FAILURE:
//       return { onFailure: (action as LoginFailureAction).error };

//     case ActionTypes.LOGIN_RESET:
//       return {};

//     default:
//       return state;
//   }
// }
