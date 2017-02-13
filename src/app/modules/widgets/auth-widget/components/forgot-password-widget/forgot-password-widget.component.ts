import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ValidationT, ValidT, MobileNumberT } from '../../services/form-validation/form-validation.service';
import { Animations } from '../animations';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import * as fromForgotPassword from '../../../../../ngrx/auth/forgot-password/forgot-password.store';
import * as fromCredential from '../../../../../ngrx/auth/credential/credential.store';


@Component({
  selector: 'msp-forgot-password-widget',
  templateUrl: './forgot-password-widget.component.html',
  styleUrls: ['./forgot-password-widget.component.css'],
  animations: [Animations.swipeInOut],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordWidgetComponent implements OnInit, OnDestroy {

  forgotPasswordState$: Observable<fromForgotPassword.ForgotPasswordStateT>;
  submit$ = new Subject<true>();
  mobileValidator$ = new Subject<ValidationT<MobileNumberT>>();

  constructor(public store: Store<AppStateT>) { }

  ngOnInit() {
    this.forgotPasswordState$ = this.store.select(fromForgotPassword.getForgotPasswordState);

    this.submit$
      .withLatestFrom(this.mobileValidator$)
      .map(([_, mobileValidator]) => mobileValidator)
      .filter<ValidT<MobileNumberT>>(mobileValidator => mobileValidator.isValid)
      .subscribe(mobileValidator => {
        const alias = mobileValidator.payload.mobileNumber;
        this.store.dispatch(new fromForgotPassword.ForgotPasswordRequestAction(alias));
        this.store.dispatch(new fromCredential.CredentialPutAliasAction(alias));
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromForgotPassword.ForgotPasswordResetAction());
  }
}
