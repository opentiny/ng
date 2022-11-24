import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { TiValidationConfig, TiValidators } from '@opentiny/ng';
@Component({
  templateUrl: `./spinner-validation-test.html`,
  styleUrls: ['./spinnerTest.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerValidationTestComponent {
  elementId: string = 'spinner';
  form: FormGroup;
  spinnerValue: number = undefined;
  placeholder: string = '-90~90';
  placeholder1: string = '-10~100';
  validationObj: TiValidationConfig = {
    type: 'blur',
  };
  validationObj1: TiValidationConfig = {
    type: 'change',
  };
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      mySpinner: new FormControl(1, [
        TiValidators.required,
        TiValidators.rangeValue(-10, 100),
      ]),
    });
  }
  onBlur(): void {
    console.log('on blur');
  }
  onFocus(): void {
    console.log('on focus');
  }
}
