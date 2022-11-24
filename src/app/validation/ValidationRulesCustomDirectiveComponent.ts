import { Component, Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Component({
  templateUrl: './validation-rules-custom-directive.html',
})
export class ValidationRulesCustomDirectiveComponent {
  text: string = '';
}

@Directive({
  selector:
    '[myIsEqualTo][formControlName],[myIsEqualTo][formControl],[myIsEqualTo][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomValidatorsDirective),
      multi: true,
    },
  ],
})

export class CustomValidatorsDirective implements Validator {
  @Input() myIsEqualTo: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.isEqualTo(this.myIsEqualTo)(control);
  }
  isEqualTo(pvalue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return pvalue !== control.value
        ? {
            isEqualTo: {
              requiredValue: pvalue,
              actualValue: control.value,
              tiErrorMessage: 'custom rule is error, should input {0}',
            },
          }
        : null;
    };
  }
}
