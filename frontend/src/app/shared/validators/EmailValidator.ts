import { Directive, forwardRef } from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[validateEmail][ngModel],[validateEmail][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})

export class EmailValidator implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.emailValidator();
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
  emailValidator(): ValidatorFn {
    return (c: FormControl) => {
      let isValid = /^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          emailvalidator: {
            valid: false
          }
        };
      }
    }
  }
}
