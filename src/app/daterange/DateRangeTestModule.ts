import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiDateRangeModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { DaterangePanelalignComponent } from './DaterangePanelalignComponent';
import { DaterangeValueComponent } from './DaterangeValueComponent';
import { DaterangeFormatComponent } from './DaterangeFormatComponent';
import { DaterangeMaxComponent } from './DaterangeMaxComponent';
import { DaterangeMinComponent } from './DaterangeMinComponent';
import { DaterangeDisabledComponent } from './DaterangeDisabledComponent';
import { DaterangeValidationComponent } from './DaterangeValidationComponent';
import { DaterangeNowdatetimeComponent } from './DaterangeNowdatetimeComponent';
import { DaterangeCustomizeComponent } from './DaterangeCustomizeComponent';
import { DaterangeDisableddaysComponent } from './DaterangeDisableddaysComponent';
import { DaterangeFixedvalueComponent } from './DaterangeFixedvalueComponent';
import { DaterangeEventComponent } from './DaterangeEventComponent';
import { DaterangeIsallowbeginequalendComponent } from './DaterangeIsallowbeginequalendComponent';
import { DaterangeValueTestComponent } from './DaterangeValueTestComponent';
import { DaterangeFormatTestComponent } from './DaterangeFormatTestComponent';
import { DaterangeMaxminComponent } from './DaterangeMaxminComponent';
import { DaterangeFixedvalueTestComponent } from './DaterangeFixedvalueTestComponent';
import { DaterangeMaxminTestComponent } from './DaterangeMaxminTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiValidationModule,
    TiDateRangeModule,
    DemoLogModule,
    RouterModule.forChild(DateRangeTestModule.ROUTES)
  ],
  declarations: [
    DaterangePanelalignComponent,
    DaterangeNowdatetimeComponent,
    DaterangeValueComponent,
    DaterangeFormatComponent,
    DaterangeMaxComponent,
    DaterangeMinComponent,
    DaterangeEventComponent,
    DaterangeDisabledComponent,
    DaterangeCustomizeComponent,
    DaterangeDisableddaysComponent,
    DaterangeValidationComponent,
    DaterangeFixedvalueComponent,
    DaterangeIsallowbeginequalendComponent,
    DaterangeValueTestComponent,
    DaterangeFormatTestComponent,
    DaterangeMaxminComponent,
    DaterangeFixedvalueTestComponent,
    DaterangeMaxminTestComponent
  ]
})
export class DateRangeTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiDateRangeComponent.html', label: 'DateRange' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'daterange/daterange-value',
      component: DaterangeValueComponent
    },
    {
      path: 'daterange/daterange-format',
      component: DaterangeFormatComponent
    },
    {
      path: 'daterange/daterange-max',
      component: DaterangeMaxComponent
    },
    {
      path: 'daterange/daterange-min',
      component: DaterangeMinComponent
    },
    {
      path: 'daterange/daterange-panelalign',
      component: DaterangePanelalignComponent
    },
    {
      path: 'daterange/daterange-nowdatetime',
      component: DaterangeNowdatetimeComponent
    },
    {
      path: 'daterange/daterange-validation',
      component: DaterangeValidationComponent
    },
    {
      path: 'daterange/daterange-disabled',
      component: DaterangeDisabledComponent
    },
    {
      path: 'daterange/daterange-customize',
      component: DaterangeCustomizeComponent
    },
    {
      path: 'daterange/daterange-disableddays',
      component: DaterangeDisableddaysComponent
    },
    {
      path: 'daterange/daterange-fixedvalue',
      component: DaterangeFixedvalueComponent
    },
    {
      path: 'daterange/daterange-isallowbeginequalend',
      component: DaterangeIsallowbeginequalendComponent
    },
    {
      path: 'daterange/daterange-event',
      component: DaterangeEventComponent
    },
    { path: 'daterange/daterange-maxmin', component: DaterangeMaxminComponent },
    {
      path: 'daterange/daterange-value-test',
      component: DaterangeValueTestComponent
    },
    {
      path: 'daterange/daterange-format-test',
      component: DaterangeFormatTestComponent
    },
    {
      path: 'daterange/daterange-fixedvalue-test',
      component: DaterangeFixedvalueTestComponent
    },
    { path: 'daterange/daterange-maxmin-test',
      component: DaterangeMaxminTestComponent
    }
  ];
}
