import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TiIpsectionConfig, TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './ipsection-test.html'
})
export class IpsectionTestComponent {
  ipValue: string;
  control: FormControl = new FormControl();
  configs: Array<TiIpsectionConfig> = [
    {
      section: 0,
      bold: true,
      validation: {
        tip: '建议输入196-220',
        tipPosition: 'top-right'
      },
      validationRules: TiValidators.required
    },
    {
      section: 1,
      validation: {
        tip: '该网段为输入类型',
        tipPosition: 'top'
      }
    },
    {
      section: 2,
      bold: true,
      validation: {
        tip: '建议输入196-220',
        tipPosition: 'top-right'
      }
    },
    {
      section: 3,
      validation: {
        tip: '该网段为输入类型'
      }
    }
  ];
}
