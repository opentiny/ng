import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {
  TiActionmenuModule,
  TiMenuModule,
  TiPopconfirmModule,
  TiTableModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { PopconfirmBasicComponent } from './PopconfirmBasicComponent';
import { PopconfirmDefineComponent } from './PopconfirmDefineComponent';
import { PopconfirmEventComponent } from './PopconfirmEventComponent';
import { PopconfirmTableComponent } from './PopconfirmTableComponent';
import { PopconfirmTableDefineComponent } from './PopconfirmTableDefineComponent';

@NgModule({
  imports: [
    CommonModule,
    TiActionmenuModule,
    TiPopconfirmModule,
    TiTableModule,
    TiMenuModule,
    DemoLogModule,
    RouterModule.forChild(PopconfirmTestModule.ROUTES)
  ],
  declarations: [
    PopconfirmBasicComponent,
    PopconfirmDefineComponent,
    PopconfirmEventComponent,
    PopconfirmTableComponent,
    PopconfirmTableDefineComponent
  ]
})
export class PopconfirmTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiPopoverComponent.html', label: 'Popconfirm' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'popconfirm/popconfirm-basic',
      component: PopconfirmBasicComponent
    },
    {
      path: 'popconfirm/popconfirm-define',
      component: PopconfirmDefineComponent
    },
    {
      path: 'popconfirm/popconfirm-event',
      component: PopconfirmEventComponent
    },
    {
      path: 'popconfirm/popconfirm-table',
      component: PopconfirmTableComponent
    },
    {
      path: 'popconfirm/popconfirm-table-define',
      component: PopconfirmTableDefineComponent
    }
  ];
}
