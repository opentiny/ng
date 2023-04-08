import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './validation-form-group-test.html'
})
export class ValidationFormGroupTestComponent {
  form: FormGroup;
  nest: FormArray;
  labelData: Array<any> = [
    ['Grade', 'Class'],
    ['Hobby1', 'Hobby2']
  ];
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      myInput: new FormControl('N', [TiValidators.required]),
      myInput1: new FormControl('', [TiValidators.digits, TiValidators.rangeValue(0, 100)]),
      nest: fb.array([
        fb.group({
          myInput01: new FormControl('One', [TiValidators.required]),
          myInput02: new FormControl('', [TiValidators.required])
        }),
        fb.group(
          {
            myInput11: new FormControl('study', [TiValidators.required]),
            myInput12: new FormControl('', [TiValidators.required])
          },
          { validators: this.myValidator }
        )
      ])
    });
  }

  ngOnInit(): void {
    this.nest = this.form.get('nest') as FormArray;

    // 测试 checkGroup 和 checkGroup1WithConfig 的区别。checkGroup 会触发此事件，checkGroupWithConfig不会触发此事件
    this.form.controls.myInput.valueChanges.subscribe(() => {
      console.log('form myInput valueChanges');
    });
  }

  // 表单整体校验，通过调用check方法实现整体校验的相关呈现
  checkGroup(): void {
    const errors: ValidationErrors | null = TiValidators.check(this.form);
    console.log(errors);
  }

  checkGroupWithConfig(): void {
    // 从10.0.1版本开始TiValidators.check方法支持传入第二个参数，第二个参数可选，具体参数意义可参考https://angular.io/api/forms/AbstractControl#updatevalueandvalidity
    const errors: ValidationErrors | null = TiValidators.check(this.form, {
      emitEvent: false
    });
    console.log(errors);
  }

  myValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const value1 = control.get('myInput11');
    const value2 = control.get('myInput12');

    return value1 && value2 && value2.value === value1.value
      ? {
          myValidator: true,
          errorMessage: `${this.labelData[1][0]} and ${this.labelData[1][0]} cannot be the same. `
        }
      : null;
  };
}
