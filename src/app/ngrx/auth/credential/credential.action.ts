import { Action } from '@ngrx/store';
import { type } from '../../util';

export const ActionTypes = {
  CREDENTIAL_PUT_ALIAS:     type('[Auth] Credential Put Alias'),
  CREDENTIAL_PUT_USERNAME:  type('[Auth] Credential Put Username'),
  CREDENTIAL_PUT_PASSWORD:  type('[Auth] Credential Put Password'),
  CREDENTIAL_DELETE:        type('[Auth] Credential Delete'),
};

export class CredentialPutAliasAction implements Action {
  type = ActionTypes.CREDENTIAL_PUT_ALIAS;
  constructor(public alias: string) { }
}

export class CredentialPutUsernameAction implements Action {
  type = ActionTypes.CREDENTIAL_PUT_USERNAME;
  constructor(public username: string) { }
}

export class CredentialPutPasswordAction implements Action {
  type = ActionTypes.CREDENTIAL_PUT_PASSWORD;
  constructor(public password: string) { }
}

export class CredentialDeleteAction implements Action {
  type = ActionTypes.CREDENTIAL_DELETE;
}

export type Actions
  = CredentialPutAliasAction
  | CredentialPutUsernameAction
  | CredentialPutPasswordAction
  | CredentialDeleteAction;
