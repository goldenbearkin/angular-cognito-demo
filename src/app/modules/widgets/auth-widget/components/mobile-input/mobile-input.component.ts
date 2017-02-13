import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserInteractionService } from '../../services/user-interaction/user-interaction.service';
import { MobileContentService, MobileContentT, SelectViewContentT } from '../../services/mobile-content/mobile-content.service';
import { FormValidationService, ValidationT, MobileNumberT } from '../../services/form-validation/form-validation.service';

import { Animations } from '../animations';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'msp-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.css'],
  animations: [Animations.opacity],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileInputComponent implements OnInit {

  @Input() tiggerValidationObservable: Observable<any>;
  @Output() validator = new EventEmitter<ValidationT<MobileNumberT>>();

  form: FormGroup;
  selectContent; any;

  localNumberPlaceholder$: Observable<string>;
  isInputting$: Observable<boolean>;
  validator$: Observable<ValidationT<MobileNumberT>>;

  constructor(
    private fb: FormBuilder,
    private userInteractionService: UserInteractionService,
    private mobileContentService: MobileContentService,
    private formValidationService: FormValidationService
  ) {
    this.form = this.fb.group({
      countryNameCode: 'HK',
      localNumber: '',
    });

    this.selectContent = ['HK', 'CN']
      .map(value => {
        return {
          value: value,
          viewValue: `${value} ${this.mobileContentService.getCountryCallCode(value)}`
        };
      });
  }

  ngOnInit() {

    const countryNameCode$: Observable<string> = this.form.controls['countryNameCode'].valueChanges
      .startWith(this.form.controls['countryNameCode'].value);

    const localNumber$: Observable<string> = this.form.controls['localNumber'].valueChanges
      .startWith(this.form.controls['localNumber'].value);

    this.localNumberPlaceholder$ = countryNameCode$
      .map(countryNameCode => this.mobileContentService.getFormat(countryNameCode));

    const countryNameCodeSkipUntilLocalNumber$ = countryNameCode$
      .skipUntil(localNumber$.skip(1))
      .startWith(this.form.controls['countryNameCode'].value as string);

    const mobileNumber$ = Observable
      .combineLatest([
        countryNameCodeSkipUntilLocalNumber$,
        localNumber$,
      ], (countryNameCode, localNumber) => [countryNameCode, localNumber])
      .skip(1);

    this.isInputting$ = this.userInteractionService
      .isInputting$(Observable.merge(mobileNumber$, this.tiggerValidationObservable))
      .startWith(true);

    this.validator$ = this.isInputting$
      .filter(isInputting => !isInputting)
      .withLatestFrom(countryNameCode$, localNumber$)
      .map(([_, countryNameCode, localNumber]) => this.formValidationService.mobileNumberValidator(countryNameCode, localNumber))
      .do(validation => this.validator.emit(validation));
  }

}
