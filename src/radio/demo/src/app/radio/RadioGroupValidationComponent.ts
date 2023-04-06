import { Component, ElementRef } from '@angular/core';
import { TiRadioItem, TiValidationConfig, TiValidators } from '@opentiny/ng';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  templateUrl: './radio-group-validation.html'
})
export class RadioGroupValidationComponent {
  radioList: Array<TiRadioItem> = [
    {
      id: '1',
      label: '中国',
      value: 'China'
    },
    {
      id: '2',
      label: '美国',
      value: 'America'
    },
    {
      id: '3',
      label: '英国',
      value: 'Britain'
    }
  ];
  radioList1: Array<TiRadioItem> = [
    {
      id: '1',
      label: '中国',
      value: 'China'
    },
    {
      id: '2',
      label: '美国',
      value: 'America'
    },
    {
      id: '3',
      label: '英国',
      value: 'Britain'
    }
  ];

  selected: string = '';
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
      formradiogroup: new FormControl(undefined, [TiValidators.required])
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
