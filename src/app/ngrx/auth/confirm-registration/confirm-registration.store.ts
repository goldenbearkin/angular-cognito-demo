import { AppStateT } from '../../../ngrx';
import { ConfirmRegistrationStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT } from './confirm-registration.reducer';

export const getConfirmRegistrationState = (state: AppStateT) => state.auth.confirmRegistration;

export { ConfirmRegistrationStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export {
  ConfirmRegistrationRequestAction,
  ConfirmRegistrationSuccessAction,
  ConfirmRegistrationFailureAction,
  ConfirmRegistrationResetAction
} from './confirm-registration.action';

