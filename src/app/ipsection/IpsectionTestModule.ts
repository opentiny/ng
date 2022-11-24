import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  TiButtonModule,
  TiIpsectionModule,
  TiTextModule,
  TiValidationModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { IpsectionBasicComponent } from './IpsectionBasicComponent';
import { IpsectionFocusComponent } from './IpsectionFocusComponent';
import { IpsectionValidComponent } from './IpsectionValidComponent';
import { IpsectionValidFormgroupComponent } from './IpsectionValidFormgroupComponent';
import { IpsectionDisabledComponent } from './IpsectionDisabledComponent';
import { IpsectionEventsComponent } from './IpsectionEventsComponent';
import { IpsectionTestComponent } from './IpsectionTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiValidationModule,
    TiButtonModule,
    TiTextModule,
    TiIpsectionModule,
    DemoLogModule,
    RouterModule.forChild(IpsectionTestModule.ROUTES)
  ],
  declarations: [
    IpsectionBasicComponent,
    IpsectionFocusComponent,
    IpsectionValidComponent,
    IpsectionValidFormgroupComponent,
    IpsectionDisabledComponent,
    IpsectionEventsComponent,
    IpsectionTestComponent
  ]
})
export class IpsectionTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiIpsectionComponent.html', label: 'Ipsection' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'ipsection/ipsection-basic',
      component: IpsectionBasicComponent
    },
    {
      path: 'ipsection/ipsection-disabled',
      component: IpsectionDisabledComponent
    },
    {
      path: 'ipsection/ipsection-valid',
      component: IpsectionValidComponent
    },
    {
      path: 'ipsection/ipsection-valid-formgroup',
      component: IpsectionValidFormgroupComponent
    },
    {
      path: 'ipsection/ipsection-events',
      component: IpsectionEventsComponent
    },
    {
      path: 'ipsection/ipsection-focus',
      component: IpsectionFocusComponent
    },
    { path: 'ipsection/ipsection-test',
      component: IpsectionTestComponent
    }
  ];
}
