import { AppStateT } from '../../../ngrx';
import { CredentialStateT } from './credential.reducer';

export const getCredentialState = (state: AppStateT) => state.auth.credential;

export { CredentialStateT };

export {
  CredentialPutAliasAction, CredentialPutUsernameAction, CredentialPutPasswordAction, CredentialDeleteAction
} from './credential.action';
