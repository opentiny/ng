import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  templateUrl: './validation-rules-custom.html'
})
export class ValidationRulesCustomComponent {
  rulesCustomControl: FormControl = new FormControl('hello', CustomValidators.isEqualTo('hello tiny'));
}
export class CustomValidators {
  static isEqualTo(pvalue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return pvalue !== control.value
        ? {
            isEqualTo: {
              requiredValue: pvalue,
              actualValue: control.value,
              tiErrorMessage: 'error, should input {0}'
            }
          }
        : null;
    };
  }
}
