import { AppStateT } from '../../../ngrx';
import { ConfirmNewPasswordStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT } from './confirm-new-password.reducer';

export const getConfirmNewPasswordState = (state: AppStateT) => state.auth.confirmNewPassword;

export { ConfirmNewPasswordStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export {
  ConfirmNewPasswordRequestAction,
  ConfirmNewPasswordSuccessAction,
  ConfirmNewPasswordFailureAction,
  ConfirmNewPasswordResetAction
} from './confirm-new-password.action';
