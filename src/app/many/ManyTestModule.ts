
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  TiAccordionModule,
  TiAlertModule,
  TiButtongroupModule,
  TiButtonModule,
  TiCheckboxModule,
  TiCollapseModule,
  TiDateModule,
  TiIconModule,
  TiIpModule,
  TiMenuModule,
  TiMessageModule,
  TiPaginationModule,
  TiProgressbarModule,
  TiProgresspieModule,
  TiSelectModule,
  TiSpinnerModule,
  TiStepsModule,
  TiSwitchModule,
  TiTabModule,
  TiTextareaModule
} from '@opentiny/ng';

import { ManyBasicComponent } from './ManyBasicComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTabModule,
    TiAccordionModule,
    TiTextareaModule,
    TiAlertModule,
    TiSelectModule,
    TiButtonModule,
    TiIconModule,
    TiButtongroupModule,
    TiIconModule,
    TiCheckboxModule,
    TiCollapseModule,
    TiDateModule,
    TiIpModule,
    TiMenuModule,
    TiMessageModule,
    TiPaginationModule,
    TiProgressbarModule,
    TiProgresspieModule,
    TiSpinnerModule,
    TiStepsModule,
    TiSwitchModule,
    TiTabModule,
    RouterModule.forChild(ManyTestModule.ROUTES)
  ],
  declarations: [ManyBasicComponent]
})
export class ManyTestModule {
  static readonly ROUTES: Routes = [
    {
      path: 'many/many-basic',
      component: ManyBasicComponent
    }
  ];
}
