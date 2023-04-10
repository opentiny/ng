import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiCascaderModule, TiScrollModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { CascaderBasicComponent } from './CascaderBasicComponent';
import { CascaderDisabledComponent } from './CascaderDisabledComponent';
import { CascaderPanelComponent } from './CascaderPanelComponent';
import { CascaderTriggerComponent } from './CascaderTriggerComponent';
import { CascaderShowalllevelComponent } from './CascaderShowalllevelComponent';
import { CascaderOnlyselectleafComponent } from './CascaderOnlyselectleafComponent';
import { CascaderEventsComponent } from './CascaderEventsComponent';
import { CascaderIdkeyComponent } from './CascaderIdkeyComponent';
import { CascaderLabelkeyComponent } from './CascaderLabelkeyComponent';
import { CascaderValuekeyComponent } from './CascaderValuekeyComponent';
import { CascaderItemTestComponent } from './CascaderItemTestComponent';
import { CascaderValidComponent } from './CascaderValidComponent';
import { CascaderSearchComponent } from './CascaderSearchComponent';
import { CascaderClearableComponent } from './CascaderClearableComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiScrollModule,
    TiCascaderModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(CascaderTestModule.ROUTES)
  ],
  declarations: [
    CascaderBasicComponent,
    CascaderShowalllevelComponent,
    CascaderDisabledComponent,
    CascaderEventsComponent,
    CascaderTriggerComponent,
    CascaderPanelComponent,
    CascaderOnlyselectleafComponent,
    CascaderIdkeyComponent,
    CascaderLabelkeyComponent,
    CascaderValuekeyComponent,
    CascaderValidComponent,
    CascaderSearchComponent,
    CascaderItemTestComponent,
    CascaderClearableComponent
  ]
})
export class CascaderTestModule {
  public static readonly ROUTES: Routes = [
    { path: 'cascader/cascader-basic', component: CascaderBasicComponent },
    {
      path: 'cascader/cascader-disabled',
      component: CascaderDisabledComponent
    },
    {
      path: 'cascader/cascader-labelkey',
      component: CascaderLabelkeyComponent
    },
    {
      path: 'cascader/cascader-valuekey',
      component: CascaderValuekeyComponent
    },
    { path: 'cascader/cascader-key', component: CascaderIdkeyComponent },
    { path: 'cascader/cascader-panel', component: CascaderPanelComponent },
    { path: 'cascader/cascader-trigger', component: CascaderTriggerComponent },
    {
      path: 'cascader/cascader-showalllevel',
      component: CascaderShowalllevelComponent
    },
    {
      path: 'cascader/cascader-onlyselectleaf',
      component: CascaderOnlyselectleafComponent
    },
    { path: 'cascader/cascader-events', component: CascaderEventsComponent },
    { path: 'cascader/cascader-search', component: CascaderSearchComponent },
    { path: 'cascader/cascader-valid', component: CascaderValidComponent },
    {
      path: 'cascader/cascader-clearable',
      component: CascaderClearableComponent
    },
    {
      path: 'cascader/cascader-item-test',
      component: CascaderItemTestComponent
    }
  ];
}
