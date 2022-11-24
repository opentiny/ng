import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiDateModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { DatePanelalignComponent } from './DatePanelalignComponent';
import { DateValidationComponent } from './DateValidationComponent';
import { DateValueComponent } from './DateValueComponent';
import { DateMinComponent } from './DateMinComponent';
import { DateFormatComponent } from './DateFormatComponent';
import { DateDisabledComponent } from './DateDisabledComponent';
import { DateMaxComponent } from './DateMaxComponent';
import { DateNowdatetimeComponent } from './DateNowdatetimeComponent';
import { DateFormComponent } from './DateFormComponent';
import { DateMaxminComponent } from './DateMaxminComponent';
import { DateEventComponent } from './DateEventComponent';
import { DateCustomizeComponent } from './DateCustomizeComponent';
import { DateDisableddaysComponent } from './DateDisableddaysComponent';
import { DateValueTestComponent } from './DateValueTestComponent';
import { DateFormatTestComponent } from './DateFormatTestComponent';
import { DateMaxminTestComponent } from './DateMaxminTestComponent';
import { DateCleariconComponent } from './DateCleariconComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiDateModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(DateTestModule.ROUTES)
  ],
  declarations: [
    DatePanelalignComponent,
    DateValidationComponent,
    DateNowdatetimeComponent,
    DateValueComponent,
    DateMaxComponent,
    DateMaxminComponent,
    DateMinComponent,
    DateFormatComponent,
    DateEventComponent,
    DateDisabledComponent,
    DateCustomizeComponent,
    DateDisableddaysComponent,
    DateFormComponent,
    DateValueTestComponent,
    DateFormatTestComponent,
    DateMaxminTestComponent,
    DateCleariconComponent
  ]
})
export class DateTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiDateComponent.html', label: 'Date' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'date/date-value',
      component: DateValueComponent
    },
    {
      path: 'date/date-format',
      component: DateFormatComponent
    },
    {
      path: 'date/date-max',
      component: DateMaxComponent
    },
    {
      path: 'date/date-min',
      component: DateMinComponent
    },
    {
      path: 'date/date-panelalign',
      component: DatePanelalignComponent
    },
    {
      path: 'date/date-nowdatetime',
      component: DateNowdatetimeComponent
    },
    {
      path: 'date/date-validation',
      component: DateValidationComponent
    },
    {
      path: 'date/date-disabled',
      component: DateDisabledComponent
    },
    {
      path: 'date/date-customize',
      component: DateCustomizeComponent
    },
    {
      path: 'date/date-disableddays',
      component: DateDisableddaysComponent
    },
    {
      path: 'date/date-event',
      component: DateEventComponent
    },
    { path: 'date/date-form', component: DateFormComponent },
    { path: 'date/date-maxmin', component: DateMaxminComponent },
    { path: 'date/date-value-test', component: DateValueTestComponent },
    { path: 'date/date-format-test', component: DateFormatTestComponent },
    { path: 'date/date-maxmin-test', component: DateMaxminTestComponent },
    { path: 'date/date-clearicon', component: DateCleariconComponent }
  ];
}
