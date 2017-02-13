import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ChangeDetectionStrategy, TemplateRef } from '@angular/core';

import { UserInteractionService } from './services/user-interaction/user-interaction.service';
import { MobileContentService } from './services/mobile-content/mobile-content.service';
import { FormValidationService } from './services/form-validation/form-validation.service';

// ngrx
import { Store } from '@ngrx/store';
import { AppStateT } from '../../../ngrx';
import * as fromSignUp from '../../../ngrx/auth/sign-up/sign-up.store';
import * as fromCredential from '../../../ngrx/auth/credential/credential.store';
import * as fromForgotPassword from '../../../ngrx/auth/forgot-password/forgot-password.store';

// rxjs
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  // selector: 'auth-widget',
  templateUrl: './auth-widget.component.html',
  styleUrls: ['./auth-widget.component.css'],
  providers: [UserInteractionService, MobileContentService, FormValidationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('targetRef', { read: ViewContainerRef })
  targetRef: ViewContainerRef;

  @ViewChild('landingRef')
  landingRef: TemplateRef<any>;

  @ViewChild('forgotPasswordRef')
  forgotPasswordRef: TemplateRef<any>;

  @ViewChild('confirmNewPasswordRef')
  confirmNewPasswordRef: TemplateRef<any>;

  @ViewChild('confirmRegistrationRef')
  confirmRegistrationRef: TemplateRef<any>;

  viewStack: ViewStack;

  tabIndex$ = new BehaviorSubject<number>(0);

  onDestroy$ = new Subject<true>();

  constructor(private vcf: ViewContainerRef, public store: Store<AppStateT>) { }

  ngOnInit() {
    this.viewStack = new ViewStack(this.targetRef);
    this.viewStack.push(this.landingRef);

    this.store.select(fromForgotPassword.getForgotPasswordState)
      .takeUntil(this.onDestroy$)
      .filter<fromForgotPassword.OnSuccessT>(state => state.current === 'onSuccess')
      .subscribe(() => this.viewStack.push(this.confirmNewPasswordRef));

    this.store.select(fromSignUp.getSignUpState)
      .takeUntil(this.onDestroy$)
      .filter<fromSignUp.OnSuccessT>(state => state.current === 'onSuccess')
      .map(state => state.payload.username)
      .subscribe(username => {
        this.store.dispatch(new fromCredential.CredentialPutUsernameAction(username));
        this.viewStack.push(this.confirmRegistrationRef);
      });
  }

  onForgotPassword() {
    this.viewStack.push(this.forgotPasswordRef);
  }

  transitBackward() {
    this.viewStack.pop();
  }

  ngOnDestroy() {
    this.store.dispatch(new fromCredential.CredentialDeleteAction());
    this.onDestroy$.next(true);
  }
}

export class ViewStack {
  private stack: TemplateRef<any>[] = [];

  get length(): number {
    return this.stack.length;
  }

  constructor(private vcf: ViewContainerRef) { }

  push(tf: TemplateRef<any>) {
    if (this.stack.length !== 0) {
      this.vcf.remove();
    }
    this.vcf.createEmbeddedView(tf);
    this.stack.push(tf);
    // this.stack.push(tf);
  }

  pop() {
    this.vcf.remove();
    this.stack.pop();
    const tf = this.stack[this.stack.length - 1];
    this.vcf.createEmbeddedView(tf);
  }
}
