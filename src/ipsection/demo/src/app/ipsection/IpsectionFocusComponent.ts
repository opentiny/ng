import { Component } from '@angular/core';
import { TiIpsectionConfig } from '@opentiny/ng';

@Component({
  templateUrl: './ipsection-focus.html'
})
export class IpsectionFocusComponent {
  ipValue: string = '127.0.0.1';
  ipValue1: string = '127.0.0.1';
  configs: Array<TiIpsectionConfig> = [
    { section: 0, bold: true },
    { section: 1, options: ['0'] },
    { section: 2, options: ['0'] },
    { section: 3 }
  ];
  configs1: Array<TiIpsectionConfig> = [
    { section: 0, options: ['0'], disabled: true },
    { section: 1 },
    { section: 2, options: ['0'], disabled: true },
    { section: 3, disabled: true }
  ];
}
