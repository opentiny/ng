import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiTimeModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { TimeValidationComponent } from './TimeValidationComponent';
import { TimeFormatComponent } from './TimeFormatComponent';
import { TimeMaxminComponent } from './TimeMaxminComponent';
import { TimeEventComponent } from './TimeEventComponent';
import { TimeCleariconComponent } from './TimeCleariconComponent';
import { TimeOptionDisabledComponent } from './TimeOptionDisabledComponent';
import { TimePanelalignComponent } from './TimePanelalignComponent';
import { TimeReactiveComponent } from './TimeReactiveComponent';
import { TimeDisabledComponent } from './TimeDisabledComponent';
import { TimeMaxComponent } from './TimeMaxComponent';
import { TimeMinComponent } from './TimeMinComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiValidationModule,
    TiButtonModule,
    TiTimeModule,
    DemoLogModule,
    RouterModule.forChild(TimeTestModule.ROUTES)
  ],
  declarations: [
    TimeFormatComponent,
    TimeMaxminComponent,
    TimeValidationComponent,
    TimeEventComponent,
    TimeCleariconComponent,
    TimeOptionDisabledComponent,
    TimePanelalignComponent,
    TimeReactiveComponent,
    TimeDisabledComponent,
    TimeMaxComponent,
    TimeMinComponent
  ]
})
export class TimeTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiTimeComponent.html', label: 'Time' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'time/time-format',
      component: TimeFormatComponent
    },
    {
      path: 'time/time-maxmin',
      component: TimeMaxminComponent
    },
    {
      path: 'time/time-validation',
      component: TimeValidationComponent
    },
    {
      path: 'time/time-event',
      component: TimeEventComponent
    },
    {
      path: 'time/time-disabled',
      component: TimeDisabledComponent
    },
    {
      path: 'time/time-clearicon',
      component: TimeCleariconComponent
    },
    {
      path: 'time/time-panelalign',
      component: TimePanelalignComponent
    },
    {
      path: 'time/time-option-disabled',
      component: TimeOptionDisabledComponent
    },
    {
      path: 'time/time-reactive',
      component: TimeReactiveComponent
    },
    {
      path: 'time/time-max',
      component: TimeMaxComponent
    },
    {
      path: 'time/time-min',
      component: TimeMinComponent
    },
  ];
}
