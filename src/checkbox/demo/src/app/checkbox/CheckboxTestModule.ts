import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiCheckboxModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { CheckboxBasicComponent } from './CheckboxBasicComponent';
import { CheckboxDisabledComponent } from './CheckboxDisabledComponent';
import { CheckboxLabelComponent } from './CheckboxLabelComponent';
import { CheckboxIndeterminateComponent } from './CheckboxIndeterminateComponent';
import { CheckboxEventComponent } from './CheckboxEventComponent';
import { CheckboxFocusedComponent } from './CheckboxFocusedComponent';
import { CheckboxGroupComponent } from './CheckboxGroupComponent';
import { CheckboxGroupDirectionComponent } from './CheckboxGroupDirectionComponent';
import { CheckboxGroupLabelkeyComponent } from './CheckboxGroupLabelkeyComponent';
import { CheckboxGroupValuekeyComponent } from './CheckboxGroupValuekeyComponent';
import { CheckboxGroupLinewrapComponent } from './CheckboxGroupLinewrapComponent';
import { CheckboxGroupLevelComponent } from './CheckboxGroupLevelComponent';
import { CheckboxGroupValidationComponent } from './CheckboxGroupValidationComponent';
import { CheckgroupDefaultComponent } from './CheckgroupDefaultComponent';
import { CheckgroupDisabledTestComponent } from './CheckgroupDisabledTestComponent';
import { CheckgroupRefreshComponent } from './CheckgroupRefreshComponent';
import { CheckgroupChangeComponent } from './CheckgroupChangeComponent';
import { CheckgroupCrossComponent } from './CheckgroupCrossComponent';
import { CheckgroupTreeComponent } from './CheckgroupTreeComponent';
import { CheckgroupScenesComponent } from './CheckgroupScenesComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiCheckboxModule,
    TiValidationModule,
    TiButtonModule,
    DemoLogModule,
    RouterModule.forChild(CheckboxTestModule.ROUTES)
  ],
  declarations: [
    CheckboxBasicComponent,
    CheckboxDisabledComponent,
    CheckboxLabelComponent,
    CheckboxIndeterminateComponent,
    CheckboxEventComponent,
    CheckboxFocusedComponent,
    CheckboxGroupComponent,
    CheckboxGroupDirectionComponent,
    CheckboxGroupLabelkeyComponent,
    CheckboxGroupValuekeyComponent,
    CheckboxGroupLinewrapComponent,
    CheckboxGroupLevelComponent,
    CheckboxGroupValidationComponent,
    CheckgroupDefaultComponent,
    CheckgroupDisabledTestComponent,
    CheckgroupRefreshComponent,
    CheckgroupChangeComponent,
    CheckgroupCrossComponent,
    CheckgroupTreeComponent,
    CheckgroupScenesComponent
  ]
})
export class CheckboxTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiCheckboxComponent.html', label: 'Checkbox' }];
  static readonly ROUTES: Routes = [
    {
      path: 'checkbox/checkbox-basic',
      component: CheckboxBasicComponent
    },
    {
      path: 'checkbox/checkbox-disabled',
      component: CheckboxDisabledComponent
    },
    {
      path: 'checkbox/checkbox-label',
      component: CheckboxLabelComponent
    },
    {
      path: 'checkbox/checkbox-indeterminate',
      component: CheckboxIndeterminateComponent
    },
    {
      path: 'checkbox/checkbox-event',
      component: CheckboxEventComponent
    },
    {
      path: 'checkbox/checkbox-focused',
      component: CheckboxFocusedComponent
    },
    {
      path: 'checkbox/checkbox-group',
      component: CheckboxGroupComponent
    },
    {
      path: 'checkbox/checkbox-group-direction',
      component: CheckboxGroupDirectionComponent
    },
    {
      path: 'checkbox/checkbox-group-labelkey',
      component: CheckboxGroupLabelkeyComponent
    },
    {
      path: 'checkbox/checkbox-group-valuekey',
      component: CheckboxGroupValuekeyComponent
    },
    {
      path: 'checkbox/checkbox-group-linewrap',
      component: CheckboxGroupLinewrapComponent
    },
    {
      path: 'checkbox/checkbox-group-level',
      component: CheckboxGroupLevelComponent
    },
    {
      path: 'checkbox/checkbox-group-validation',
      component: CheckboxGroupValidationComponent
    },
    {
      path: 'checkgroup/checkgroup-default',
      component: CheckgroupDefaultComponent
    },
    {
      path: 'checkgroup/checkgroup-disabled-test',
      component: CheckgroupDisabledTestComponent
    },
    {
      path: 'checkgroup/checkgroup-change',
      component: CheckgroupChangeComponent
    },
    {
      path: 'checkgroup/checkgroup-cross',
      component: CheckgroupCrossComponent
    },
    { path: 'checkgroup/checkgroup-tree', component: CheckgroupTreeComponent },
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
