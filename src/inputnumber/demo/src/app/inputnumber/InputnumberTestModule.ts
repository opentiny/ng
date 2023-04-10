import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiInputNumberModule, TiTextModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { InputnumberBasicComponent } from './InputnumberBasicComponent';
import { InputnumberMaxlengthComponent } from './InputnumberMaxlengthComponent';
import { InputnumberLoadComponent } from './InputnumberLoadComponent';
import { InputnumberFocusComponent } from './InputnumberFocusComponent';
import { InputnumberFormatComponent } from './InputnumberFormatComponent';
import { InputnumberLocaleableComponent } from './InputnumberLocaleableComponent';
import { InputnumberEventComponent } from './InputnumberEventComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiTextModule,
    TiInputNumberModule,
    TiButtonModule,
    DemoLogModule,
    RouterModule.forChild(InputnumberTestModule.ROUTES)
  ],
  declarations: [
    InputnumberBasicComponent,
    InputnumberMaxlengthComponent,
    InputnumberLoadComponent,
    InputnumberFocusComponent,
    InputnumberFormatComponent,
    InputnumberLocaleableComponent,
    InputnumberEventComponent
  ]
})
export class InputnumberTestModule {
  static readonly LINKS: Array<object> = [{ href: 'directives/TiInputNumberDirective.html', label: 'InputNumber' }];
  static readonly ROUTES: Routes = [
    {
      path: 'inputnumber/inputnumber-basic',
      component: InputnumberBasicComponent
    },
    {
      path: 'inputnumber/inputnumber-format',
      component: InputnumberFormatComponent
    },
    {
      path: 'inputnumber/inputnumber-localeable',
      component: InputnumberLocaleableComponent
    },
    {
      path: 'inputnumber/inputnumber-maxlength',
      component: InputnumberMaxlengthComponent
    },
    {
      path: 'inputnumber/inputnumber-load',
      component: InputnumberLoadComponent
    },
    {
      path: 'inputnumber/inputnumber-focus',
      component: InputnumberFocusComponent
    },
    {
      path: 'inputnumber/inputnumber-event',
      component: InputnumberEventComponent
    }
  ];
}
