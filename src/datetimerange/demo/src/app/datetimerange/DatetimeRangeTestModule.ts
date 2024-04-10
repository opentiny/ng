import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiDatetimeRangeModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { DatetimerangeValueComponent } from './DatetimerangeValueComponent';
import { DatetimerangeFormatComponent } from './DatetimerangeFormatComponent';
import { DatetimerangeMaxComponent } from './DatetimerangeMaxComponent';
import { DatetimerangeMinComponent } from './DatetimerangeMinComponent';
import { DatetimerangeDisabledComponent } from './DatetimerangeDisabledComponent';
import { DatetimerangeValidationComponent } from './DatetimerangeValidationComponent';
import { DatetimerangeNowdatetimeComponent } from './DatetimerangeNowdatetimeComponent';
import { DatetimerangeCustomizeComponent } from './DatetimerangeCustomizeComponent';
import { DatetimerangeManyTestComponent } from './DatetimerangeManyTestComponent';
import { DatetimerangeEventComponent } from './DatetimerangeEventComponent';
import { DatetimerangeIsallowbeginequalendComponent } from './DatetimerangeIsallowbeginequalendComponent';
import { DatetimerangeTimezoneableComponent } from './DatetimerangeTimezoneableComponent';
import { DatetimerangeValueTestComponent } from './DatetimerangeValueTestComponent';
import { DatetimerangeFormatTestComponent } from './DatetimerangeFormatTestComponent';
import { DatetimerangeMaxminComponent } from './DatetimerangeMaxminComponent';
import { DatetimerangePanelalignComponent } from './DatetimerangePanelalignComponent';
import { DatetimerangeCleariconComponent } from './DatetimerangeCleariconComponent';
import { DatetimerangeMaxminTestComponent } from './DatetimerangeMaxminTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiValidationModule,
    TiDatetimeRangeModule,
    DemoLogModule,
    RouterModule.forChild(DatetimerangeTestModule.ROUTES)
  ],
  declarations: [
    DatetimerangeFormatComponent,
    DatetimerangeNowdatetimeComponent,
    DatetimerangeValueComponent,
    DatetimerangeMaxComponent,
    DatetimerangeMinComponent,
    DatetimerangeDisabledComponent,
    DatetimerangeEventComponent,
    DatetimerangeValidationComponent,
    DatetimerangeCustomizeComponent,
    DatetimerangeManyTestComponent,
    DatetimerangeIsallowbeginequalendComponent,
    DatetimerangeTimezoneableComponent,
    DatetimerangeValueTestComponent,
    DatetimerangeFormatTestComponent,
    DatetimerangeMaxminComponent,
    DatetimerangePanelalignComponent,
    DatetimerangeCleariconComponent,
    DatetimerangeMaxminTestComponent
  ]
})
export class DatetimerangeTestModule {
  static readonly LINKS: Array<object> = [
    {
      href: 'components/TiDatetimeRangeComponent.html',
      label: 'DatetimeRange'
    }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'datetimerange/datetimerange-value',
      component: DatetimerangeValueComponent
    },
    {
      path: 'datetimerange/datetimerange-format',
      component: DatetimerangeFormatComponent
    },
    {
      path: 'datetimerange/datetimerange-max',
      component: DatetimerangeMaxComponent
    },
    {
      path: 'datetimerange/datetimerange-min',
      component: DatetimerangeMinComponent
    },
    {
      path: 'datetimerange/datetimerange-nowdatetime',
      component: DatetimerangeNowdatetimeComponent
    },
    {
      path: 'datetimerange/datetimerange-validation',
      component: DatetimerangeValidationComponent
    },
    {
      path: 'datetimerange/datetimerange-disabled',
      component: DatetimerangeDisabledComponent
    },
    {
      path: 'datetimerange/datetimerange-customize',
      component: DatetimerangeCustomizeComponent
    },
    {
      path: 'datetimerange/datetimerange-isallowbeginequalend',
      component: DatetimerangeIsallowbeginequalendComponent
    },
    {
      path: 'datetimerange/datetimerange-timezoneable',
      component: DatetimerangeTimezoneableComponent
    },
    {
      path: 'datetimerange/datetimerange-event',
      component: DatetimerangeEventComponent
    },
    {
      path: 'datetimerange/datetimerange-many-test',
      component: DatetimerangeManyTestComponent
    },
    {
      path: 'datetimerange/datetimerange-value-test',
      component: DatetimerangeValueTestComponent
    },
    {
      path: 'datetimerange/datetimerange-format-test',
      component: DatetimerangeFormatTestComponent
    },
    {
      path: 'datetimerange/datetimerange-maxmin',
      component: DatetimerangeMaxminComponent
    },
    {
      path: 'datetimerange/datetimerange-panelalign',
      component: DatetimerangePanelalignComponent
    },
    {
      path: 'datetimerange/datetimerange-clearicon',
      component: DatetimerangeCleariconComponent
    },
    {
      path: 'datetimerange/datetimerange-maxmin-test',
      component: DatetimerangeMaxminTestComponent
    }
  ];
}
