import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserInteractionService } from '../../services/user-interaction/user-interaction.service';
import { MobileContentService, MobileContentT, SelectViewContentT } from '../../services/mobile-content/mobile-content.service';
import { FormValidationService, ValidationT, PasswordT } from '../../services/form-validation/form-validation.service';

import { Animations } from '../animations';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'msp-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  animations: [Animations.opacity],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInputComponent implements OnInit {
  @Input() tiggerValidationObservable: Observable<any>;
  @Output() validator = new EventEmitter<ValidationT<PasswordT>>();

  form: FormGroup;
  isInputting$: Observable<boolean>;
  validator$: Observable<ValidationT<PasswordT>>;

  constructor(
    private fb: FormBuilder,
    private userInteractionService: UserInteractionService,
    private formValidationService: FormValidationService
  ) {
    this.form = this.fb.group({
      password: ''
    });
  }

  ngOnInit() {

    const password$ = this.form.controls['password'].valueChanges
      .startWith(this.form.controls['password'].value);

    this.isInputting$ = this.userInteractionService.isInputting$(
      Observable.merge(password$.skip(1), this.tiggerValidationObservable)
    )
      .startWith(true);

    this.validator$ = this.isInputting$
      .filter(isInputting => !isInputting)
      .withLatestFrom(password$)
      .map(([_, password]) => this.formValidationService.passwordValidator(password))
      .do(validation => this.validator.emit(validation));
  }

}

