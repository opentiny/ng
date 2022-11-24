import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiActionmenuModule, TiAlertModule, TiButtonModule, TiFormfieldModule, TiLayoutModule,
         TiLeftmenuModule, TiPaginationModule, TiSelectModule, TiSpinnerModule, TiStepsModule, TiSubtitleModule,
         TiTableModule, TiTabModule } from '@opentiny/ng';

import { LayoutOverviewComponent } from './LayoutOverviewComponent';
import { LayoutBasicComponent } from './LayoutBasicComponent';
import { LayoutBasicSimpleComponent } from './LayoutBasicSimpleComponent';
import { LayoutBasicSimpleResponsiveComponent } from './LayoutBasicSimpleResponsiveComponent';
import { LayoutSingleComponent } from './LayoutSingleComponent';
import { LayoutMultiColumnComponent } from './LayoutMultiColumnComponent';
import { LayoutListComponent } from './LayoutListComponent';
import { LayoutPurchaseComponent } from './LayoutPurchaseComponent';
import { LayoutPurchaseSimpleComponent } from './LayoutPurchaseSimpleComponent';
import { LayoutPurchaseResponsiveComponent } from './LayoutPurchaseResponsiveComponent';
import { LayoutPurchaseSimpleResponsiveComponent } from './LayoutPurchaseSimpleResponsiveComponent';
import { LayoutDetailComponent } from './LayoutDetailComponent';
import { LayoutDetailColumnComponent } from './LayoutDetailColumnComponent';
import { LayoutOverviewVerticalComponent } from './LayoutOverviewVerticalComponent';
import { LayoutListLargedataComponent } from './LayoutListLargedataComponent';
import { LayoutPurchaseResponsiveChangeComponent } from './LayoutPurchaseResponsiveChangeComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiActionmenuModule,
    TiAlertModule,
    TiButtonModule,
    TiLeftmenuModule,
    TiPaginationModule,
    TiStepsModule,
    TiTableModule,
    TiSelectModule,
    TiSpinnerModule,
    TiLayoutModule,
    TiSubtitleModule,
    TiFormfieldModule,
    TiTabModule,
    RouterModule.forChild(LayoutTestModule.ROUTES)
  ],
  declarations: [
    LayoutOverviewComponent,
    LayoutBasicComponent,
    LayoutBasicSimpleComponent,
    LayoutBasicSimpleResponsiveComponent,
    LayoutSingleComponent,
    LayoutMultiColumnComponent,
    LayoutListComponent,
    LayoutPurchaseComponent,
    LayoutPurchaseSimpleComponent,
    LayoutPurchaseResponsiveComponent,
    LayoutPurchaseSimpleResponsiveComponent,
    LayoutDetailComponent,
    LayoutDetailColumnComponent,
    LayoutOverviewVerticalComponent,
    LayoutListLargedataComponent,
    LayoutPurchaseResponsiveChangeComponent
  ]
})
export class LayoutTestModule {
  public static readonly ROUTES: Routes = [
    { path: 'layout/layout-overview', component: LayoutOverviewComponent, data: { less: 'layout' } },
    { path: 'layout/layout-basic', component: LayoutBasicComponent, data: { less: 'layout' } },
    { path: 'layout/layout-basic-simple', component: LayoutBasicSimpleComponent, data: { less: 'layout' } },
    { path: 'layout/layout-basic-simple-responsive', component: LayoutBasicSimpleResponsiveComponent, data: { less: 'layout' } },
    { path: 'layout/layout-overview-vertical', component: LayoutOverviewVerticalComponent, data: { less: 'layout' } },
    { path: 'layout/layout-list', component: LayoutListComponent, data: { less: 'layout' } },
    { path: 'layout/layout-list-largedata', component: LayoutListLargedataComponent, data: { less: 'layout' } },
    { path: 'layout/layout-purchase', component: LayoutPurchaseComponent, data: { less: 'layout' } },
    { path: 'layout/layout-purchase-simple', component: LayoutPurchaseSimpleComponent, data: { less: 'layout' } },
    { path: 'layout/layout-purchase-responsive', component: LayoutPurchaseResponsiveComponent, data: { less: 'layout' } },
    { path: 'layout/layout-purchase-simple-responsive', component: LayoutPurchaseSimpleResponsiveComponent, data: { less: 'layout' } },
    { path: 'layout/layout-detail', component: LayoutDetailComponent, data: { less: 'layout' } },
    { path: 'layout/layout-detail-column', component: LayoutDetailColumnComponent, data: { less: 'layout' } },
    { path: 'layout/layout-single', component: LayoutSingleComponent, data: { less: 'layout' } },
    { path: 'layout/layout-multi-column', component: LayoutMultiColumnComponent, data: { less: 'layout' } },
    { path: 'layout/layout-purchase-responsive-change', component: LayoutPurchaseResponsiveChangeComponent, data: { less: 'layout' } }
  ];
}
