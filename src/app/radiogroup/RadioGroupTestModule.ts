import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiIconModule, TiRadioModule, TiValidationModule } from '@opentiny/ng';

import { RadiogroupBasicComponent } from './RadiogroupBasicComponent';
import { RadiogroupDirectionComponent } from './RadiogroupDirectionComponent';
import { RadiogroupDefineComponent } from './RadiogroupDefineComponent';
import { RadiogroupStyleComponent } from './RadiogroupStyleComponent';
import { RadiogroupValuekeyComponent } from './RadiogroupValuekeyComponent';
import { RadiogroupLabelkeyComponent } from './RadiogroupLabelkeyComponent';
import { RadiogroupValidationComponent } from './RadiogroupValidationComponent';
import { RadiogroupReactiveValidationComponent } from './RadiogroupReactiveValidationComponent';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TiButtonModule,
    TiIconModule,
    TiRadioModule,
    TiValidationModule,
    RouterModule.forChild(RadioGroupTestModule.ROUTES)
  ],
  declarations: [
    RadiogroupBasicComponent,
    RadiogroupDirectionComponent,
    RadiogroupDefineComponent,
    RadiogroupStyleComponent,
    RadiogroupLabelkeyComponent,
    RadiogroupValuekeyComponent,
    RadiogroupValidationComponent,
    RadiogroupReactiveValidationComponent
  ]
})
export class RadioGroupTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiRadioGroupComponent.html', label: 'RadioGroup' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'radiogroup/radiogroup-basic',
      component: RadiogroupBasicComponent
    },
    {
      path: 'radiogroup/radiogroup-direction',
      component: RadiogroupDirectionComponent
    },
    {
      path: 'radiogroup/radiogroup-define',
      component: RadiogroupDefineComponent
    },
    {
      path: 'radiogroup/radiogroup-labelkey',
      component: RadiogroupLabelkeyComponent
    },
    {
      path: 'radiogroup/radiogroup-valuekey',
      component: RadiogroupValuekeyComponent
    },
    {
      path: 'radiogroup/radiogroup-validation',
      component: RadiogroupValidationComponent
    },
    {
      path: 'radiogroup/radiogroup-reactive-validation',
      component: RadiogroupReactiveValidationComponent
    },
    {
      path: 'radiogroup/radiogroup-style',
      component: RadiogroupStyleComponent
    }
  ];
}
