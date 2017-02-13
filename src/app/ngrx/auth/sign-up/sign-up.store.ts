import { AppStateT } from '../../../ngrx';
import { SignUpStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT  } from './sign-up.reducer';

export const getSignUpState = (state: AppStateT) => state.auth.signUp;

export { SignUpStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export { SignUpRequestAction, SignUpSuccessAction, SignUpFailureAction, SignUpResetAction } from './sign-up.action';
