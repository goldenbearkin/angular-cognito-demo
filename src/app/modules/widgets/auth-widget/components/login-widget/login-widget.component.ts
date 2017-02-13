import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ValidationT, ValidT, MobileNumberT, PasswordT } from '../../services/form-validation/form-validation.service';
import { Animations } from '../animations';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import * as fromLogin from '../../../../../ngrx/auth/login/login.store';
import * as fromCurrent from '../../../../../ngrx/auth/current/current.store';

@Component({
  selector: 'msp-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css'],
  animations: [Animations.swipeInOut],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginWidgetComponent implements OnInit, OnDestroy {
  @Output() forgotPassword = new EventEmitter<true>();

  loginState$: Observable<fromLogin.LoginStateT>;

  submit$ = new Subject<true>();
  mobileValidator$ = new Subject<ValidationT<MobileNumberT>>();
  passwordValidator$ = new Subject<ValidationT<PasswordT>>();
  onDestroy$ = new Subject<true>();

  constructor(public store: Store<AppStateT>) { }

  ngOnInit() {
    this.loginState$ = this.store.select(fromLogin.getLoginState);

    this.submit$
      .withLatestFrom(this.mobileValidator$, this.passwordValidator$)
      .map(([_, mobileValidator, passwordValidator]) => [mobileValidator, passwordValidator])
      .filter<[ValidT<MobileNumberT>, ValidT<PasswordT>]>(([mobileValidator, passwordValidator]) =>
        mobileValidator.isValid && passwordValidator.isValid)
      .subscribe(([mobileValidator, passwordValidator]) => {
        const username = mobileValidator.payload.mobileNumber;
        const password = passwordValidator.payload.password;
        this.store.dispatch(new fromLogin.LoginRequestAction(username, password));
      });

    this.store.select(fromLogin.getLoginState)
      .takeUntil(this.onDestroy$)
      .filter<fromLogin.OnSuccessT>(state => state.current === 'onSuccess')
      .subscribe(() => this.store.dispatch(new fromCurrent.CurrentRequestAction()));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromLogin.LoginResetAction());
    this.onDestroy$.next(true);
  }
}
