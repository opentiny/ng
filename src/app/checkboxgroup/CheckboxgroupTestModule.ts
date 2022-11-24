import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TiCheckboxModule } from '@opentiny/ng';

import { CheckboxgroupBasicComponent } from './CheckboxgroupBasicComponent';
import { CheckboxgroupDirectionComponent } from './CheckboxgroupDirectionComponent';
import { CheckboxgroupTemplateComponent } from './CheckboxgroupTemplateComponent';
import { CheckboxgroupLinewrapComponent } from './CheckboxgroupLinewrapComponent';
import { CheckboxgroupLabelkeyComponent } from './CheckboxgroupLabelkeyComponent';
import { CheckboxgroupValuekeyComponent } from './CheckboxgroupValuekeyComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiCheckboxModule,
    RouterModule.forChild(CheckboxgroupTestModule.ROUTES)
  ],
  declarations: [
    CheckboxgroupBasicComponent,
    CheckboxgroupDirectionComponent,
    CheckboxgroupTemplateComponent,
    CheckboxgroupLinewrapComponent,
    CheckboxgroupLabelkeyComponent,
    CheckboxgroupValuekeyComponent
  ]
})
export class CheckboxgroupTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiCheckgroupComponent.html', label: 'Checkgroup' },
    { href: 'components/TiCheckitemComponent.html', label: 'Checkitem' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'checkboxgroup/checkboxgroup-basic',
      component: CheckboxgroupBasicComponent
    },
    {
      path: 'checkboxgroup/checkboxgroup-direction',
      component: CheckboxgroupDirectionComponent
    },
    {
      path: 'checkboxgroup/checkboxgroup-labelkey',
      component: CheckboxgroupLabelkeyComponent
    },
    {
      path: 'checkboxgroup/checkboxgroup-valuekey',
      component: CheckboxgroupValuekeyComponent
    },
    {
      path: 'checkboxgroup/checkboxgroup-template',
      component: CheckboxgroupTemplateComponent
    },
    {
      path: 'checkboxgroup/checkboxgroup-linewrap',
      component: CheckboxgroupLinewrapComponent
    }
  ];
}
