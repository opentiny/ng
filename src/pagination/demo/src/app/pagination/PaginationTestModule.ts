import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiPaginationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { PaginationDisabledComponent } from './PaginationDisabledComponent';
import { PaginationShowlastpageComponent } from './PaginationShowlastpageComponent';
import { PaginationTypeComponent } from './PaginationTypeComponent';
import { PaginationEventComponent } from './PaginationEventComponent';
import { PaginationPagesizeComponent } from './PaginationPagesizeComponent';
import { PaginationShowgotolinkComponent } from './PaginationShowgotolinkComponent';
import { PaginationPageselectwidthComponent } from './PaginationPageselectwidthComponent';
import { PaginationShowtotalnumberComponent } from './PaginationShowtotalnumberComponent';
import { PaginationAutohideComponent } from './PaginationAutohideComponent';
import { PaginationFixedComponent } from './PaginationFixedComponent';
import { PaginationLoadingComponent } from './PaginationLoadingComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiPaginationModule,
    TiButtonModule,
    DemoLogModule,
    RouterModule.forChild(PaginationTestModule.ROUTES)
  ],
  declarations: [
    PaginationDisabledComponent,
    PaginationShowlastpageComponent,
    PaginationTypeComponent,
    PaginationEventComponent,
    PaginationPagesizeComponent,
    PaginationShowtotalnumberComponent,
    PaginationAutohideComponent,
    PaginationShowgotolinkComponent,
    PaginationPageselectwidthComponent,
    PaginationFixedComponent,
    PaginationLoadingComponent
  ]
})
export class PaginationTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiPaginationComponent.html', label: 'Pagination' }];
  static readonly ROUTES: Routes = [
    {
      path: 'pagination/pagination-type',
      component: PaginationTypeComponent
    },
    {
      path: 'pagination/pagination-pagesize',
      component: PaginationPagesizeComponent
    },
    {
      path: 'pagination/pagination-show-lastpage',
      component: PaginationShowlastpageComponent
    },
    {
      path: 'pagination/pagination-disabled',
      component: PaginationDisabledComponent
    },
    {
      path: 'pagination/pagination-event',
      component: PaginationEventComponent
    },
    {
      path: 'pagination/pagination-showtotalnumber',
      component: PaginationShowtotalnumberComponent
    },
    {
      path: 'pagination/pagination-autohide',
      component: PaginationAutohideComponent
    },
    {
      path: 'pagination/pagination-fixed',
      component: PaginationFixedComponent
    },
    {
      path: 'pagination/pagination-showgotolink',
      component: PaginationShowgotolinkComponent
    },
    {
      path: 'pagination/pagination-pageselectwidth',
      component: PaginationPageselectwidthComponent
    },
    {
      path: 'pagination/pagination-loading',
      component: PaginationLoadingComponent
    }
  ];
}
