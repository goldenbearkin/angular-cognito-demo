import { AppStateT } from '../../../ngrx';
import { LoginStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT } from './login.reducer';

export const getLoginState = (state: AppStateT) => state.auth.login;

// export const getLoginOnProcess = createSelector(getLoginState, (state: LoginStateT) => state.current);
// export const getLoginOnSuccess = createSelector(getLoginState, (state: LoginStateT) => state.onSuccess);
// export const getLoginOnFailure = createSelector(getLoginState, (state: LoginStateT) => state.onFailure);

export { LoginStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export { LoginRequestAction, LoginSuccessAction, LoginFailureAction, LoginResetAction } from './login.action';
