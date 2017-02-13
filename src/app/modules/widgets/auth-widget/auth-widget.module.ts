import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthWidgetComponent } from './auth-widget.component';
import { AuthDialogButtonComponent } from './components/auth-dialog-button/auth-dialog-button.component';
import { AuthLogoutButtonComponent } from './components/auth-logout-button/auth-logout-button.component';
import { LoginWidgetComponent } from './components/login-widget/login-widget.component';
import { SignupWidgetComponent } from './components/signup-widget/signup-widget.component';
import { ForgotPasswordWidgetComponent } from './components/forgot-password-widget/forgot-password-widget.component';
import { ConfirmRegistrationWidgetComponent } from './components/confirm-registration-widget/confirm-registration-widget.component';
import { ConfirmNewPasswordWidgetComponent } from './components/confirm-new-password-widget/confirm-new-password-widget.component';
import { MobileInputComponent } from './components/mobile-input/mobile-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { CodeInputComponent } from './components/code-input/code-input.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/withLatestFrom';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    AuthWidgetComponent,
    AuthDialogButtonComponent,
    AuthLogoutButtonComponent,
    LoginWidgetComponent,
    SignupWidgetComponent,
    ForgotPasswordWidgetComponent,
    ConfirmRegistrationWidgetComponent,
    ConfirmNewPasswordWidgetComponent,
    MobileInputComponent,
    PasswordInputComponent,
    CodeInputComponent,
  ],
  exports: [
    AuthDialogButtonComponent,
    AuthLogoutButtonComponent
  ],
  entryComponents: [
    AuthWidgetComponent
  ]
})
export class AuthWidgetModule { }
