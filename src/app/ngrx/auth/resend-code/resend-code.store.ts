import { AppStateT } from '../../../ngrx';
import { ResendCodeStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT } from './resend-code.reducer';

export const getResendCodeState = (state: AppStateT) => state.auth.resendCode;

// export const getLoginOnProcess = createSelector(getLoginState, (state: LoginStateT) => state.current);
// export const getLoginOnSuccess = createSelector(getLoginState, (state: LoginStateT) => state.onSuccess);
// export const getLoginOnFailure = createSelector(getLoginState, (state: LoginStateT) => state.onFailure);

export { ResendCodeStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export { ResendCodeRequestAction, ResendCodeSuccessAction, ResendCodeFailureAction, ResendCodeResetAction } from './resend-code.action';
