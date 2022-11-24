import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  TiIpsectionConfig,
  TiValidators
} from '@opentiny/ng';

@Component({
  templateUrl: './ipsection-valid-formgroup.html'
})
export class IpsectionValidFormgroupComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      ipsection: new FormControl('127.0.0.1')
    });
  }
  configs: Array<TiIpsectionConfig> = [
    {
      section: 0,
      validation: {
        tip: '建议输入127-220',
        tipPosition: 'top-right'
      },
      validationRules: TiValidators.required
    },
    {
      section: 1,
      validation: {
        tip: '该网段为输入类型'
      },
      validationRules: [TiValidators.required, TiValidators.rangeValue(0, 255)]
    },
    { section: 2, options: ['0'] },
    {
      section: 3,
      validationRules: TiValidators.rangeValue(0, 255)
    }
  ];
}
