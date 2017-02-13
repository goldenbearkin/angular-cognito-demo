import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ValidationT, ValidT, CodeT, PasswordT } from '../../services/form-validation/form-validation.service';
import { Animations } from '../animations';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import * as fromLogin from '../../../../../ngrx/auth/login/login.store';
import * as fromCredential from '../../../../../ngrx/auth/credential/credential.store';
import * as fromConfirmNewPassword from '../../../../../ngrx/auth/confirm-new-password/confirm-new-password.store';
import * as fromCurrent from '../../../../../ngrx/auth/current/current.store';

@Component({
  selector: 'msp-confirm-new-password-widget',
  templateUrl: './confirm-new-password-widget.component.html',
  styleUrls: ['./confirm-new-password-widget.component.css'],
  animations: [Animations.swipeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmNewPasswordWidgetComponent implements OnInit, OnDestroy {
  confirmNewPasswordState$: Observable<fromConfirmNewPassword.ConfirmNewPasswordStateT>;
  loginState$: Observable<fromLogin.LoginStateT>;
  submit$ = new Subject<true>();
  codeValidator$ = new Subject<ValidationT<CodeT>>();
  passwordValidator$ = new Subject<ValidationT<PasswordT>>();
  onDestroy$ = new Subject<true>();

  constructor(public store: Store<AppStateT>) { }

  ngOnInit() {
    this.confirmNewPasswordState$ = this.store.select(fromConfirmNewPassword.getConfirmNewPasswordState);

    this.submit$
      .withLatestFrom(this.codeValidator$, this.passwordValidator$)
      .map(([_, codeValidator, passwordValidator]) => [codeValidator, passwordValidator])
      .filter<[ValidT<CodeT>, ValidT<PasswordT>]>(([mobileValidator, passwordValidator]) =>
        mobileValidator.isValid && passwordValidator.isValid)
      .withLatestFrom(
        this.store.select(fromCredential.getCredentialState)
          .takeUntil(this.onDestroy$)
          .map(state => state.alias)
        )
      .subscribe(([validators, alias]) => {
        const [codeValidator, passwordValidator] = validators;
        const code = codeValidator.payload.code;
        const password = passwordValidator.payload.password;
        this.store.dispatch(new fromConfirmNewPassword.ConfirmNewPasswordRequestAction(alias, code, password));
        this.store.dispatch(new fromCredential.CredentialPutPasswordAction(password));
      });

    this.store.select(fromConfirmNewPassword.getConfirmNewPasswordState)
      .takeUntil(this.onDestroy$)
      .filter<fromConfirmNewPassword.OnSuccessT>(state => state.current === 'onSuccess')
      .withLatestFrom(
        this.store.select(fromCredential.getCredentialState)
          .takeUntil(this.onDestroy$)
      )
      .map(([_, {alias, password}]) => [alias, password])
      .subscribe(([alias, password]) => this.store.dispatch(new fromLogin.LoginRequestAction(alias, password)));

    this.store.select(fromLogin.getLoginState)
      .takeUntil(this.onDestroy$)
      .filter<fromLogin.OnSuccessT>(state => state.current === 'onSuccess')
      .subscribe(() => this.store.dispatch(new fromCurrent.CurrentRequestAction()));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromConfirmNewPassword.ConfirmNewPasswordResetAction());
    this.store.dispatch(new fromLogin.LoginResetAction());
    this.onDestroy$.next(true);
  }
}
