import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiIpModule, TiValidationModule } from '@opentiny/ng';

import { IpBasicComponent } from './IpBasicComponent';
import { IpValidComponent } from './IpValidComponent';
import { IpDisabledComponent } from './IpDisabledComponent';
import { IpFormcontrolComponent } from './IpFormcontrolComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiValidationModule,
    TiButtonModule,
    TiIpModule,
    RouterModule.forChild(IpTestModule.ROUTES)
  ],
  declarations: [IpBasicComponent, IpValidComponent, IpDisabledComponent, IpFormcontrolComponent]
})
export class IpTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiIpComponent.html', label: 'Ip' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'ip/ip-basic',
      component: IpBasicComponent
    },
    {
      path: 'ip/ip-formcontrol',
      component: IpFormcontrolComponent
    },
    {
      path: 'ip/ip-disabled',
      component: IpDisabledComponent
    },
    {
      path: 'ip/ip-valid',
      component: IpValidComponent
    }
  ];
}
