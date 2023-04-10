import { Component } from '@angular/core';
import { TiIpsectionConfig } from '@opentiny/ng';

@Component({
  templateUrl: './ipsection-disabled.html'
})
export class IpsectionDisabledComponent {
  ipValue: string = '127.0.0.1';
  disabled: boolean = true;
  configs: Array<TiIpsectionConfig> = [
    { section: 0, bold: true },
    { section: 1, options: ['0'] },
    { section: 2, options: ['0'] },
    { section: 3 }
  ];
  configs1: Array<TiIpsectionConfig> = [
    { section: 0, disabled: false },
    { section: 1, options: ['0'], disabled: true },
    { section: 2, options: ['0'] },
    { section: 3, disabled: true }
  ];
}
