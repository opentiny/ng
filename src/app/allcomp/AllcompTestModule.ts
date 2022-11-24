import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
  TiAccordionModule,
  TiActionmenuModule,
  TiAlertModule,
  TiAutocompleteModule,
  TiButtongroupModule,
  TiButtonModule,
  TiCheckboxModule,
  TiCollapseModule,
  TiDateModule,
  TiDateRangeModule,
  TiDatetimeModule,
  TiDatetimeRangeModule,
  TiFormfieldModule,
  TiInputNumberModule,
  TiIntroServiceModule,
  TiIpModule,
  TiIpsectionModule,
  TiLeftmenuModule,
  TiLoadingModule,
  TiMenuModule,
  TiMessageModule,
  TiModalModule,
  TiOverflowModule,
  TiPaginationModule,
  TiPopconfirmModule,
  TiProgressbarModule,
  TiRadioModule,
  TiSearchboxModule,
  TiSelectModule,
  TiSliderModule,
  TiSpinnerModule,
  TiStepsModule,
  TiSwitchModule,
  TiTableModule,
  TiTabModule,
  TiTagsInputModule,
  TiTextareaModule,
  TiTextModule,
  TiTimeModule,
  TiTipModule,
  TiTreeModule,
  TiTreeselectModule,
  TiUploadModule,
  TiValidationModule
} from '@opentiny/ng';

import { AllcompBasicComponent } from './AllcompBasicComponent';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiButtongroupModule,
    TiRadioModule,
    TiCheckboxModule,
    TiSelectModule,
    TiSliderModule,
    TiSpinnerModule,
    TiSwitchModule,
    TiTreeselectModule,
    TiTextModule,
    TiTextareaModule,
    TiAutocompleteModule,
    TiSearchboxModule,
    TiIpModule,
    TiIpsectionModule,
    TiTagsInputModule,
    TiInputNumberModule,
    TiDateModule,
    TiDateRangeModule,
    TiDatetimeModule,
    TiDatetimeRangeModule,
    TiTimeModule,
    TiValidationModule,
    TiFormfieldModule,
    TiUploadModule,
    TiMenuModule,
    TiActionmenuModule,
    TiLeftmenuModule,
    TiAccordionModule,
    TiTabModule,
    TiStepsModule,
    TiAlertModule,
    TiMessageModule,
    TiModalModule,
    TiPopconfirmModule,
    TiTipModule,
    TiOverflowModule,
    TiCollapseModule,
    TiTableModule,
    TiPaginationModule,
    TiTreeModule,
    TiProgressbarModule,
    TiIntroServiceModule,
    TiLoadingModule,
    RouterModule.forChild(AllcompTestModule.ROUTES)
  ],
  declarations: [AllcompBasicComponent],
  exports: [AllcompBasicComponent]
})
export class AllcompTestModule {

  static readonly LINKS: Array<object> = [];
  static readonly ROUTES: Routes = [
    {
      path: 'allcomp/allcomp-basic',
      component: AllcompBasicComponent
    }
  ];
}
