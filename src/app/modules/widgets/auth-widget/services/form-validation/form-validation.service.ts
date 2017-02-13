import { Injectable } from '@angular/core';
import { MobileContentService } from '../mobile-content/mobile-content.service';


export type ValidT<T> = {
  isValid: true,
  payload: T
};

export type InValidT = {
  isValid: false;
  errMsg: String;
};

export type ValidationT<T> = ValidT<T> | InValidT;

export type CodeT = {
  code: string;
};

export type PasswordT = {
  password: string;
};

export type MobileNumberT = {
  mobileNumber: string;
};

@Injectable()
export class FormValidationService {

  constructor(private mobileContentService: MobileContentService) { }

  codeValidator(code: string): ValidationT<CodeT> {
    if (this.isEmpty(code)) {
      return {
        isValid: false,
        errMsg: 'Required'
      };
    };

    if (!code.match(/[0-9]+/)) {
      return {
        isValid: false,
        errMsg: 'Should contain only 6 digits'
      };
    }

    if (code.length !== 6) {
      return {
        isValid: false,
        errMsg: 'Should contain only 6 digits'
      };
    }

    return {
      isValid: true,
      payload: { code: code }
    };
  }

  passwordValidator(password: string): ValidationT<PasswordT> {
    if (this.isEmpty(password)) {
      return {
        isValid: false,
        errMsg: 'Required'
      };
    };

    if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
      return {
        isValid: false,
        errMsg: 'Should include both an letter and a number'
      };
    }

    if (password.length < 8) {
      return {
        isValid: false,
        errMsg: 'Use at least 8 characters'
      };
    }

    return {
      isValid: true,
      payload: { password: password }
    };
  }

  mobileNumberValidator(countryNameCode: string, localNumber: string): ValidationT<MobileNumberT> {
    if (this.isEmpty(localNumber)) {
      return {
        isValid: false,
        errMsg: 'Required'
      };
    };

    const mobileContent = this.mobileContentService.getContent(countryNameCode);

    if (mobileContent === null) {
      return {
        isValid: false,
        errMsg: 'Invalid country name code'
      };
    }

    const mobileNumber = mobileContent.countryCallCode + localNumber;
    if (!mobileContent.regex.test(mobileNumber)) {
      return {
        isValid: false,
        errMsg: `Invalid ${countryNameCode} mobile number`
      };
    }

    return {
      isValid: true,
      payload: { mobileNumber: mobileNumber }
    };
  }

  isEmpty(testString: string): boolean {
    return testString.length === 0;
  }
}
