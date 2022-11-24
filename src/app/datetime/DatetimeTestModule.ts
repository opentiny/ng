import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiDatetimeModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { DatetimeValueComponent } from './DatetimeValueComponent';
import { DatetimeFormatComponent } from './DatetimeFormatComponent';
import { DatetimeMaxComponent } from './DatetimeMaxComponent';
import { DatetimeMinComponent } from './DatetimeMinComponent';
import { DatetimeDisabledComponent } from './DatetimeDisabledComponent';
import { DatetimeValidationComponent } from './DatetimeValidationComponent';
import { DatetimeNowdatetimeComponent } from './DatetimeNowdatetimeComponent';
import { DatetimeCustomizeComponent } from './DatetimeCustomizeComponent';
import { DatetimeEventComponent } from './DatetimeEventComponent';
import { DatetimeValueTestComponent } from './DatetimeValueTestComponent';
import { DatetimeFormatTestComponent } from './DatetimeFormatTestComponent';
import { DatetimeMaxminComponent } from './DatetimeMaxminComponent';
import { DatetimePanelalignComponent } from './DatetimePanelalignComponent';
import { DatetimeCleariconComponent } from './DatetimeCleariconComponent';
import { DatetimeMaxminTestComponent } from './DatetimeMaxminTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiDatetimeModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(DatetimeTestModule.ROUTES)
  ],
  declarations: [
    DatetimeValueComponent,
    DatetimeNowdatetimeComponent,
    DatetimeFormatComponent,
    DatetimeMaxComponent,
    DatetimeMinComponent,
    DatetimeEventComponent,
    DatetimeDisabledComponent,
    DatetimeValidationComponent,
    DatetimeCustomizeComponent,
    DatetimeValueTestComponent,
    DatetimeFormatTestComponent,
    DatetimeMaxminComponent,
    DatetimePanelalignComponent,
    DatetimeCleariconComponent,
    DatetimeMaxminTestComponent
  ]
})
export class DatetimeTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiDatetimeComponent.html', label: 'Datetime' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'datetime/datetime-value',
      component: DatetimeValueComponent
    },
    {
      path: 'datetime/datetime-format',
      component: DatetimeFormatComponent
    },
    {
      path: 'datetime/datetime-max',
      component: DatetimeMaxComponent
    },
    {
      path: 'datetime/datetime-min',
      component: DatetimeMinComponent
    },
    {
      path: 'datetime/datetime-nowdatetime',
      component: DatetimeNowdatetimeComponent
    },
    {
      path: 'datetime/datetime-validation',
      component: DatetimeValidationComponent
    },
    {
      path: 'datetime/datetime-disabled',
      component: DatetimeDisabledComponent
    },
    {
      path: 'datetime/datetime-customize',
      component: DatetimeCustomizeComponent
    },
    {
      path: 'datetime/datetime-event',
      component: DatetimeEventComponent
    },
    {
      path: 'datetime/datetime-value-test',
      component: DatetimeValueTestComponent
    },
    {
      path: 'datetime/datetime-format-test',
      component: DatetimeFormatTestComponent
    },
    {
      path: 'datetime/datetime-maxmin',
      component: DatetimeMaxminComponent
    },
    {
      path: 'datetime/datetime-panelalign',
      component: DatetimePanelalignComponent
    },
    {
      path: 'datetime/datetime-clearicon',
      component: DatetimeCleariconComponent
    },
    { path: 'datetime/datetime-maxmin-test',
      component: DatetimeMaxminTestComponent
    }
  ];
}
