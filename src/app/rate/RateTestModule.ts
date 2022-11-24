import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiRateModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { RateBasicComponent } from './RateBasicComponent';
import { RateDisabledComponent } from './RateDisabledComponent';
import { RateEventComponent } from './RateEventComponent';
import { RateIdComponent } from './RateIdComponent';
import { RateLoadComponent } from './RateLoadComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiRateModule,
    DemoLogModule,
    RouterModule.forChild(RateTestModule.ROUTES)
  ],
  declarations: [
    RateBasicComponent,
    RateDisabledComponent,
    RateEventComponent,
    RateIdComponent,
    RateLoadComponent
  ]
})
export class RateTestModule {

  static readonly LINKS: Array<object> = [
    {  label: 'Rate' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'rate/rate-basic',
      component: RateBasicComponent
    },
    {
      path: 'rate/rate-disabled',
      component: RateDisabledComponent
    },
    {
      path: 'rate/rate-event',
      component: RateEventComponent
    },
    { path: 'rate/rate-load',
      component: RateLoadComponent
    },
    { path: 'rate/rate-id',
      component: RateIdComponent
    }
  ];
}
