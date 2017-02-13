import { ActionReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
// import * as fromAuthLogin from './auth/login/login.reducer';

import { credentialReducer, CredentialStateT } from './credential/credential.reducer';
import { currentReducer, CurrentStateT } from './current/current.reducer';
import { resendCodeReducer, ResendCodeStateT } from './resend-code/resend-code.reducer';
import { signUpReducer, SignUpStateT } from './sign-up/sign-up.reducer';
import { confirmRegistrationReducer, ConfirmRegistrationStateT } from './confirm-registration/confirm-registration.reducer';
import { loginReducer, LoginStateT } from './login/login.reducer';
import { confirmNewPasswordReducer, ConfirmNewPasswordStateT } from './confirm-new-password/confirm-new-password.reducer';
import { forgotPasswordReducer, ForgotPasswordStateT } from './forgot-password/forgot-password.reducer';

// import { reducer as loginReducer, LoginStateT } from './login/login.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export type AuthStateT = {
  credential: CredentialStateT,
  current: CurrentStateT,
  resendCode: ResendCodeStateT,
  signUp: SignUpStateT,
  confirmRegistration: ConfirmRegistrationStateT,
  login: LoginStateT,
  forgotPassword: ForgotPasswordStateT,
  confirmNewPassword: ConfirmNewPasswordStateT
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const authReducers = {
  credential: credentialReducer,
  current: currentReducer,
  resendCode: resendCodeReducer,
  signUp: signUpReducer,
  confirmRegistration: confirmRegistrationReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  confirmNewPassword: confirmNewPasswordReducer,
};

// const authDevReducer: ActionReducer<AuthStateT> = compose(storeFreeze, combineReducers)(authReducers);
const authProReducer: ActionReducer<AuthStateT> = combineReducers(authReducers);

export function authReducer(state: AuthStateT, action: any) {
  return authProReducer(state, action);
  // if (environment.production) {
  //   return authProReducer(state, action);
  // } else {
  //   return authDevReducer(state, action);
  // }
}
