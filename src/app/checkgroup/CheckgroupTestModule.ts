import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiCheckboxModule } from '@opentiny/ng';

import { CheckgroupBasicComponent } from './CheckgroupBasicComponent';
import { CheckgroupDefaultComponent } from './CheckgroupDefaultComponent';
import { CheckgroupItemComponent } from './CheckgroupItemComponent';
import { CheckgroupChangeComponent } from './CheckgroupChangeComponent';
import { CheckgroupCrossComponent } from './CheckgroupCrossComponent';
import { CheckgroupTreeComponent } from './CheckgroupTreeComponent';
import { CheckgroupValuekeyComponent } from './CheckgroupValuekeyComponent';
import { CheckgroupLevelComponent } from './CheckgroupLevelComponent';
import { CheckgroupDisabledComponent } from './CheckgroupDisabledComponent';
import { CheckgroupRefreshComponent } from './CheckgroupRefreshComponent';
import { CheckgroupScenesComponent } from './CheckgroupScenesComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiCheckboxModule,
    RouterModule.forChild(CheckgroupTestModule.ROUTES)
  ],
  declarations: [
    CheckgroupBasicComponent,
    CheckgroupDefaultComponent,
    CheckgroupDisabledComponent,
    CheckgroupRefreshComponent,
    CheckgroupItemComponent,
    CheckgroupChangeComponent,
    CheckgroupCrossComponent,
    CheckgroupTreeComponent,
    CheckgroupValuekeyComponent,
    CheckgroupLevelComponent,
    CheckgroupScenesComponent
  ]
})
export class CheckgroupTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiCheckgroupComponent.html', label: 'Checkgroup' },
    { href: 'components/TiCheckitemComponent.html', label: 'Checkitem' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'checkgroup/checkgroup-basic',
      component: CheckgroupBasicComponent
    },
    {
      path: 'checkgroup/checkgroup-default',
      component: CheckgroupDefaultComponent
    },
    {
      path: 'checkgroup/checkgroup-disabled',
      component: CheckgroupDisabledComponent
    },
    {
      path: 'checkgroup/checkgroup-item',
      component: CheckgroupItemComponent
    },
    {
      path: 'checkgroup/checkgroup-change',
      component: CheckgroupChangeComponent
    },
    {
      path: 'checkgroup/checkgroup-cross',
      component: CheckgroupCrossComponent
    },
    {
      path: 'checkgroup/checkgroup-level',
      component: CheckgroupLevelComponent
    },
    {
      path: 'checkgroup/checkgroup-valuekey',
      component: CheckgroupValuekeyComponent
    },
    { path: 'checkgroup/checkgroup-tree',
      component: CheckgroupTreeComponent
    },
    {
      path: 'checkgroup/checkgroup-refresh',
      component: CheckgroupRefreshComponent
    },
    {
      path: 'checkgroup/checkgroup-scenes',
      component: CheckgroupScenesComponent
    }
  ];
}
