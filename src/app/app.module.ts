import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthWidgetModule } from './modules/widgets/auth-widget/auth-widget.module';
import { AwsCognitoModule } from './modules/services/aws-cognito/aws-cognito.module';

import { AppComponent } from './app.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './ngrx';

import { CurrentEffects } from './ngrx/auth/current/current.effect';
import { LoginEffects } from './ngrx/auth/login/login.effect';
import { SignUpEffects } from './ngrx/auth/sign-up/sign-up.effect';
import { ResendCodeEffects } from './ngrx/auth/resend-code/resend-code.effect';
import { ConfirmNewPasswordEffects } from './ngrx/auth/confirm-new-password/confirm-new-password.effect';
import { ConfirmRegistrationEffects } from './ngrx/auth/confirm-registration/confirm-registration.effect';
import { ForgotPasswordEffects } from './ngrx/auth/forgot-password/forgot-password.effect';

const POOL_DATA = {
  UserPoolId: 'ap-northeast-1_z5j7ZOo5C',
  ClientId: 'ctdbreu1h64r43qqbp61lvq6m'
};

const IDENTITY_POOL_ID = 'ap-northeast-1:4ec3151e-96fd-435b-9b81-34b966df1c32';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,

    // ngrx
    StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(CurrentEffects),
    EffectsModule.run(LoginEffects),
    EffectsModule.run(SignUpEffects),
    EffectsModule.run(ResendCodeEffects),
    EffectsModule.run(ForgotPasswordEffects),
    EffectsModule.run(ConfirmNewPasswordEffects),
    EffectsModule.run(ConfirmRegistrationEffects),

    AuthWidgetModule,
    AwsCognitoModule.setConfig(POOL_DATA, IDENTITY_POOL_ID)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
