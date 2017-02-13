import { AppStateT } from '../../../ngrx';
import { CurrentStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT } from './current.reducer';

export const getCurrentState = (state: AppStateT) => state.auth.current;

export { CurrentStateT, OnProcessT, OnSuccessT, OnFailureT, OnResetT };

export { CurrentInitAction,
  CurrentRequestAction, CurrentSuccessAction, CurrentFailureAction,
  CurrentResetRequestAction, CurrentResetSuccessAction, CurrentResetFailureAction } from './current.action';
