import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiIconModule, TiRadioModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { RadioBasicComponent } from './RadioBasicComponent';
import { RadioLabelComponent } from './RadioLabelComponent';
import { RadioDisabledComponent } from './RadioDisabledComponent';
import { RadioEventComponent } from './RadioEventComponent';
import { RadioFocusComponent } from './RadioFocusComponent';
import { RadioDarkComponent } from './RadioDarkComponent';
import { RadioGroupComponent } from './RadioGroupComponent';
import { RadioGroupDirectionComponent } from './RadioGroupDirectionComponent';
import { RadioGroupLabelkeyComponent } from './RadioGroupLabelkeyComponent';
import { RadioGroupValuekeyComponent } from './RadioGroupValuekeyComponent';
import { RadioGroupValidationComponent } from './RadioGroupValidationComponent';
import { RadioGroupLinewrapComponent } from './RadioGroupLinewrapComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiButtonModule,
    TiRadioModule,
    TiIconModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(RadioTestModule.ROUTES)
  ],
  declarations: [
    RadioBasicComponent,
    RadioDisabledComponent,
    RadioEventComponent,
    RadioFocusComponent,
    RadioDarkComponent,
    RadioLabelComponent,
    RadioGroupComponent,
    RadioGroupDirectionComponent,
    RadioGroupLabelkeyComponent,
    RadioGroupValuekeyComponent,
    RadioGroupValidationComponent,
    RadioGroupLinewrapComponent
  ]
})
export class RadioTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiRadioComponent.html', label: 'Radio' }];
  static readonly ROUTES: Routes = [
    {
      path: 'radio/radio-basic',
      component: RadioBasicComponent
    },
    {
      path: 'radio/radio-disabled',
      component: RadioDisabledComponent
    },
    {
      path: 'radio/radio-label',
      component: RadioLabelComponent
    },
    {
      path: 'radio/radio-event',
      component: RadioEventComponent
    },
    {
      path: 'radio/radio-focus',
      component: RadioFocusComponent
    },
    {
      path: 'radio/radio-dark',
      component: RadioDarkComponent
    },
    {
      path: 'radio/radio-group',
      component: RadioGroupComponent
    },
    {
      path: 'radio/radio-group-direction',
      component: RadioGroupDirectionComponent
    },
    {
      path: 'radio/radio-group-labelkey',
      component: RadioGroupLabelkeyComponent
    },
    {
      path: 'radio/radio-group-valuekey',
      component: RadioGroupValuekeyComponent
    },
    {
      path: 'radio/radio-group-validation',
      component: RadioGroupValidationComponent
    },
    {
      path: 'radio/radio-group-linewrap',
      component: RadioGroupLinewrapComponent
    }
  ];
}
