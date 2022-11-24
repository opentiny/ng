import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiTimelineModule, TiTipModule } from '@opentiny/ng';

import { TimelineMultiComponent } from './TimelineMultiComponent';
import { TimelineDarkComponent } from './TimelineDarkComponent';
import { TimelineBasicComponent } from './TimelineBasicComponent';
import { TimelineTempleteComponent } from './TimelineTempleteComponent';
import { TimelineTypeComponent } from './TimelineTypeComponent';
import { TimelineHelptipComponent } from './TimelineHelptipComponent';
import { TimelineTestComponent } from './TimelineTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTimelineModule,
    TiTipModule,
    RouterModule.forChild(TimelineTestModule.ROUTES)
  ],
  declarations: [
    TimelineBasicComponent,
    TimelineDarkComponent,
    TimelineMultiComponent,
    TimelineTempleteComponent,
    TimelineTypeComponent,
    TimelineHelptipComponent,
    TimelineTestComponent
  ]
})
export class TimelineTestModule {
  static readonly LINKS: Array<object> = [
    { label: 'Timeline' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'timeline/timeline-basic',
      component: TimelineBasicComponent,
      data: { label: '基础' }
    },
    {
      path: 'timeline/timeline-multi',
      component: TimelineMultiComponent,
      data: { label: '多级展示' }
    },
    {
      path: 'timeline/timeline-dark',
      component: TimelineDarkComponent,
      data: { label: '深色背景展示' }
    },
    {
      path: 'timeline/timeline-templete',
      component: TimelineTempleteComponent
    },
    {
      path: 'timeline/timeline-type',
      component: TimelineTypeComponent
    },
    {
      path: 'timeline/timeline-helptip',
      component: TimelineHelptipComponent
    },
    {
      path: 'timeline/timeline-test',
      component: TimelineTestComponent
    }
  ];
}
