import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiCheckboxModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { CheckboxDefaultComponent } from './CheckboxDefaultComponent';
import { CheckboxDisabledComponent } from './CheckboxDisabledComponent';
import { CheckboxLabelComponent } from './CheckboxLabelComponent';
import { CheckboxIndeterminateComponent } from './CheckboxIndeterminateComponent';
import { CheckboxEventComponent } from './CheckboxEventComponent';
import { CheckboxFocusedComponent } from './CheckboxFocusedComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiCheckboxModule,
    DemoLogModule,
    RouterModule.forChild(CheckboxTestModule.ROUTES)
  ],
  declarations: [
    CheckboxDefaultComponent,
    CheckboxDisabledComponent,
    CheckboxLabelComponent,
    CheckboxIndeterminateComponent,
    CheckboxEventComponent,
    CheckboxFocusedComponent
  ]
})
export class CheckboxTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiCheckboxComponent.html', label: 'Checkbox' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'checkbox/checkbox-default',
      component: CheckboxDefaultComponent
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
    }
  ];
}
