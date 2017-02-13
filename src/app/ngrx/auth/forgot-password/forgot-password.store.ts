import { AppStateT } from '../../../ngrx';
import { ForgotPasswordStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT } from './forgot-password.reducer';

export const getForgotPasswordState = (state: AppStateT) => state.auth.forgotPassword;

export { ForgotPasswordStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export {
  ForgotPasswordRequestAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction,
  ForgotPasswordResetAction
} from './forgot-password.action';
