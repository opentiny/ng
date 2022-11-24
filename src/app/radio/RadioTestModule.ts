import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiRadioModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { RadioBasicComponent } from './RadioBasicComponent';
import { RadioLabelComponent } from './RadioLabelComponent';
import { RadioDisabledComponent } from './RadioDisabledComponent';
import { RadioEventComponent } from './RadioEventComponent';
import { RadioFocusComponent } from './RadioFocusComponent';
import { RadioDarkComponent } from './RadioDarkComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiRadioModule,
    DemoLogModule,
    RouterModule.forChild(RadioTestModule.ROUTES)
  ],
  declarations: [
    RadioBasicComponent,
    RadioDisabledComponent,
    RadioEventComponent,
    RadioFocusComponent,
    RadioDarkComponent,
    RadioLabelComponent
  ]
})
export class RadioTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiRadioComponent.html', label: 'Radio' }
  ];
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
    { path: 'radio/radio-dark',
      component: RadioDarkComponent
    }
  ];
}
