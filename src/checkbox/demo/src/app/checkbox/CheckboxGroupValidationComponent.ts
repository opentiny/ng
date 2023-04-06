import { Component, ElementRef } from '@angular/core';
import { TiCheckboxItem, TiValidationConfig, TiValidators } from '@opentiny/ng';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  templateUrl: './checkbox-group-validation.html'
})
export class CheckboxGroupValidationComponent {
  items: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      value: 'China'
    },
    {
      id: '02',
      label: '美国',
      value: 'America'
    },
    {
      id: '03',
      label: '英国',
      value: 'Britain'
    }
  ];
  items1: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      value: 'China'
    },
    {
      id: '02',
      label: '美国',
      value: 'America'
    },
    {
      id: '03',
      label: '英国',
      value: 'Britain'
    }
  ];

  value: Array<any> = [];
  validationConfig: TiValidationConfig = {
    errorMessage: {
      required: '请至少选择一项'
    }
  };
  validationConfig1: TiValidationConfig = {
    errorMessage: {
      required: '请至少选择一项'
    }
  };

  myFormGroup: FormGroup;
  constructor(fb: FormBuilder, private elementRef: ElementRef) {
    this.myFormGroup = fb.group({
      formcheckboxgroup: new FormControl(undefined, [TiValidators.required])
    });
  }

  checkgroup(form: FormGroup): void {
    const errors: ValidationErrors | null = TiValidators.check(form);
    console.log('errors', errors);
  }

  checkgroup1(): void {
    const errors: ValidationErrors | null = TiValidators.check(this.myFormGroup);
    console.log(errors);
  }
}
