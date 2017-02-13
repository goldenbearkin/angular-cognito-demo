import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserInteractionService } from '../../services/user-interaction/user-interaction.service';
import { FormValidationService, ValidationT, CodeT } from '../../services/form-validation/form-validation.service';

import { Animations } from '../animations';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'msp-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css'],
  animations: [Animations.opacity],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeInputComponent implements OnInit {
  @Input() tiggerValidationObservable: Observable<any>;
  @Output() validator = new EventEmitter<ValidationT<CodeT>>();

  form: FormGroup;
  isInputting$: Observable<boolean>;
  validator$: Observable<ValidationT<CodeT>>;

  constructor(
    private fb: FormBuilder,
    private userInteractionService: UserInteractionService,
    private formValidationService: FormValidationService
  ) {
    this.form = this.fb.group({
      code: ''
    });
  }

  ngOnInit() {
    const code$ = this.form.controls['code'].valueChanges
      .startWith(this.form.controls['code'].value);

    this.isInputting$ = this.userInteractionService.isInputting$(
      Observable.merge(code$.skip(1), this.tiggerValidationObservable)
    )
      .startWith(true);

    this.validator$ = this.isInputting$
      .filter(isInputting => !isInputting)
      .withLatestFrom(code$)
      .map(([_, code]) => this.formValidationService.codeValidator(code))
      .do(validation => this.validator.emit(validation));
  }
}
