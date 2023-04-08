import { Component } from '@angular/core';
import { TiIpsectionConfig } from '@opentiny/ng';

@Component({
  templateUrl: './ipsection-basic.html'
})
export class IpsectionBasicComponent {
  ipValue: string = '127.0.0.1';
  ipSubnetmaskValue: string = '127.0.0.1/255';
  configs: Array<TiIpsectionConfig> = [
    { section: 0, bold: true },
    { section: 1, options: ['0'] },
    { section: 2, options: ['0'] },
    { section: 3 }
  ];
  subnetmaskconfigs: Array<TiIpsectionConfig> = [
    { section: 0 },
    { section: 1, options: ['0'] },
    { section: 2, options: ['0'] },
    { section: 3 },
    { section: 4, options: ['198', '134', '255'] }
  ];
}
