import {
  Actions, ActionTypes, CredentialPutAliasAction, CredentialPutUsernameAction, CredentialPutPasswordAction, CredentialDeleteAction
} from './credential.action';

export type CredentialStateT = {
  alias: string
  username: string;
  password: string;
};

const initial: CredentialStateT = {
  alias: '',
  username: '',
  password: ''
};

export function credentialReducer(state: CredentialStateT = initial, action: Actions): CredentialStateT {
  switch (action.type) {
    case ActionTypes.CREDENTIAL_PUT_ALIAS:
      // return { ...state, ...{ alias: (<CredentialPutAliasAction>action).alias } };
      return Object.assign({}, state, { alias: (<CredentialPutAliasAction>action).alias });

    case ActionTypes.CREDENTIAL_PUT_USERNAME:
      // return { ...state, ...{ username: (<CredentialPutUsernameAction>action).username } };
      return Object.assign({}, state, { username: (<CredentialPutUsernameAction>action).username });

    case ActionTypes.CREDENTIAL_PUT_PASSWORD:
      // return { ...state, ...{ password: (<CredentialPutPasswordAction>action).password } };
      return Object.assign({}, state, { password: (<CredentialPutPasswordAction>action).password });

    case ActionTypes.CREDENTIAL_DELETE:
      return initial;

    default:
      return state;
  }
}
