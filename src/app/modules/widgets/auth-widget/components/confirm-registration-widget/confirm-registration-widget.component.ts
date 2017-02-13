import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ValidationT, ValidT, CodeT } from '../../services/form-validation/form-validation.service';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import * as fromLogin from '../../../../../ngrx/auth/login/login.store';
import * as fromCurrent from '../../../../../ngrx/auth/current/current.store';
import * as fromCredential from '../../../../../ngrx/auth/credential/credential.store';
import * as fromResendCode from '../../../../../ngrx/auth/resend-code/resend-code.store';
import * as fromConfirmRegistration from '../../../../../ngrx/auth/confirm-registration/confirm-registration.store';

import { Animations } from '../animations';

@Component({
  selector: 'msp-confirm-registration-widget',
  templateUrl: './confirm-registration-widget.component.html',
  styleUrls: ['./confirm-registration-widget.component.css'],
  animations: [Animations.swipeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmRegistrationWidgetComponent implements OnInit, OnDestroy {

  confirmRgistrationState$: Observable<fromConfirmRegistration.ConfirmRegistrationStateT>;
  submit$ = new Subject<true>();
  codeValidator$ = new Subject<ValidationT<CodeT>>();
  onDestroy$ = new Subject<true>();
  resend$ = new Subject<true>();

  constructor(public store: Store<AppStateT>, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.confirmRgistrationState$ = this.store.select(fromConfirmRegistration.getConfirmRegistrationState);

    this.submit$
      .withLatestFrom(this.codeValidator$)
      .map(([_, codeValidator]) => codeValidator)
      .filter<ValidT<CodeT>>(codeValidator => codeValidator.isValid)
      .withLatestFrom(
        this.store.select(fromCredential.getCredentialState)
          .takeUntil(this.onDestroy$)
          .map(state => state.username)
      )
      .subscribe(([codeValidator, username]) => {
        const code = codeValidator.payload.code;
        this.store.dispatch(new fromConfirmRegistration.ConfirmRegistrationRequestAction(username, code));
      });

    this.store.select(fromConfirmRegistration.getConfirmRegistrationState)
      .takeUntil(this.onDestroy$)
      .filter<fromConfirmRegistration.OnSuccessT>(state => state.current === 'onSuccess')
      .withLatestFrom(
        this.store.select(fromCredential.getCredentialState)
          .takeUntil(this.onDestroy$)
          .map(state => [state.alias, state.password])
      )
      .map(([_, [alias, password]]) => [alias, password])
      .subscribe(([alias, password]) => this.store.dispatch(new fromLogin.LoginRequestAction(alias, password)));

    this.store.select(fromLogin.getLoginState)
      .takeUntil(this.onDestroy$)
      .filter<fromLogin.OnSuccessT>(state => state.current === 'onSuccess')
      .subscribe(() => this.store.dispatch(new fromCurrent.CurrentRequestAction()));

    this.store.select(fromResendCode.getResendCodeState)
      .takeUntil(this.onDestroy$)
      .filter<fromResendCode.OnSuccessT>(state => state.current === 'onSuccess')
      .withLatestFrom(
        this.store.select(fromCredential.getCredentialState)
          .takeUntil(this.onDestroy$)
          .map(state => state.alias)
      )
      .map(([_, alias]) => alias)
      .subscribe(alias => this.snackBar.open(`Confirmaton code is sent to ${alias}.`, '', { duration: 3000 }));


    this.resend$
      .withLatestFrom(
      this.store.select(fromCredential.getCredentialState)
        .takeUntil(this.onDestroy$)
        .map(state => state.username)
      )
      .map(([_, username]) => username)
      .subscribe(username => this.store.dispatch(new fromResendCode.ResendCodeRequestAction(username)));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromConfirmRegistration.ConfirmRegistrationResetAction());
    this.store.dispatch(new fromLogin.LoginResetAction());
    this.store.dispatch(new fromResendCode.ResendCodeResetAction());
    this.onDestroy$.next(true);
  }

}
