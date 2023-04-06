import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {
  TiIconModule,
  TiPaginationModule,
  TiScrollModule,
  TiSelectModule,
  TiTextModule,
  TiTipModule,
  TiValidationModule
} from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { SelectBasicComponent } from './SelectBasicComponent';
import { SelectGroupComponent } from './SelectGroupComponent';
import { SelectEventComponent } from './SelectEventComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectLeakComponent } from './SelectLeakComponent';
import { SelectSmallComponent } from './SelectSmallComponent';
import { SelectDisabledComponent } from './SelectDisabledComponent';
import { SelectMultiComponent } from './SelectMultiComponent';
import { SelectSearchComponent } from './SelectSearchComponent';
import { SelectNoemptyComponent } from './SelectNoemptyComponent';
import { NoEmptyPipe } from './NoEmptyPipe';
import { SelectPanelComponent } from './SelectPanelComponent';
import { SelectTipComponent } from './SelectTipComponent';
import { SelectValidComponent } from './SelectValidComponent';
import { SelectTagComponent } from './SelectTagComponent';
import { SelectTemplateComponent } from './SelectTemplateComponent';
import { SelectLoadComponent } from './SelectLoadComponent';
import { SelectFocusComponent } from './SelectFocusComponent';
import { SelectNoborderComponent } from './SelectNoborderComponent';
import { SelectNodataComponent } from './SelectNodataComponent';
import { SelectInputComponent } from './SelectInputComponent';
import { SelectManyComponent } from './SelectManyComponent';
import { SelectIdComponent } from './SelectIdComponent';
import { SelectValidgroupComponent } from './SelectValidgroupComponent';
import { SelectTiscrollComponent } from './SelectTiscrollComponent';
import { SelectAppendtobodyComponent } from './SelectAppendtobodyComponent';
import { SelectClearableComponent } from './SelectClearableComponent';
import { SelectMuchComponent } from './SelectMuchComponent';
import { SelectSelectallComponent } from './SelectSelectallComponent';
import { SelectMaxlineComponent } from './SelectMaxlineComponent';
import { SelectSearchkeysComponent } from './SelectSearchkeysComponent';
import { SelectValuekeyComponent } from './SelectValuekeyComponent';
import { SelectValuekeyTestComponent } from './SelectValuekeyTestComponent';
import { SelectTworowComponent } from './SelectTworowComponent';
import { SelectEnumComponent } from './SelectEnumComponent';
import { SelectBeforesearchComponent } from './SelectBeforesearchComponent';
import { SelectBeforesearchTestComponent } from './SelectBeforesearchTestComponent';
import { SelectPaginationComponent } from './SelectPaginationComponent';
import { SelectPaginBeforesearchComponent } from './SelectPaginBeforesearchComponent';
import { SelectNullComponent } from './SelectNullComponent';
import { SelectVirtualscrollComponent } from './SelectVirtualscrollComponent';
import { SelectVirtualscrollMultiComponent } from './SelectVirtualscrollMultiComponent';
import { SelectChangeSelectallComponent } from './SelectChangeSelectallComponent';
import { SelectIdkeyComponent } from './SelectIdkeyComponent';
import { SelectScrollLoadComponent } from './SelectScrollLoadComponent';
import { SelectDisabledfocusComponent } from './SelectDisabledfocusComponent';
import { SelectShowselectednumberComponent } from './SelectShowselectednumberComponent';
import { SelectLabelkeyComponent } from './SelectLabelkeyComponent';
import { SelectReservesearchwordComponent } from './SelectReservesearchwordComponent';
import { SelectLazyComponent } from './SelectLazyComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiIconModule,
    TiPaginationModule,
    TiScrollModule,
    TiSelectModule,
    TiTextModule,
    TiTipModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(SelectTestModule.ROUTES)
  ],
  declarations: [
    SelectBasicComponent,
    SelectTagComponent,
    SelectTemplateComponent,
    SelectGroupComponent,
    SelectEventComponent,
    SelectLazyComponent,
    SelectLeakComponent,
    SelectLeakComponent,
    SelectSmallComponent,
    SelectDisabledComponent,
    SelectFocusComponent,
    SelectDisabledComponent,
    SelectSearchComponent,
    SelectMultiComponent,
    SelectMaxlineComponent,
    SelectNoborderComponent,
    SelectNoemptyComponent,
    SelectNodataComponent,
    SelectPanelComponent,
    SelectTipComponent,
    SelectValidComponent,
    SelectLoadComponent,
    SelectInputComponent,
    SelectManyComponent,
    SelectIdComponent,
    SelectValidgroupComponent,
    SelectTiscrollComponent,
    SelectValuekeyComponent,
    SelectClearableComponent,
    SelectMuchComponent,
    SelectSelectallComponent,
    SelectSearchkeysComponent,
    NoEmptyPipe,
    SelectTworowComponent,
    SelectEnumComponent,
    SelectBeforesearchComponent,
    SelectBeforesearchTestComponent,
    SelectPaginationComponent,
    SelectValuekeyTestComponent,
    SelectPaginBeforesearchComponent,
    SelectNullComponent,
    SelectVirtualscrollComponent,
    SelectVirtualscrollMultiComponent,
    SelectChangeSelectallComponent,
    SelectIdkeyComponent,
    SelectScrollLoadComponent,
    SelectDisabledfocusComponent,
    SelectAppendtobodyComponent,
    SelectShowselectednumberComponent,
    SelectLabelkeyComponent,
    SelectReservesearchwordComponent
  ]
})
export class SelectTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiSelectComponent.html', label: 'Select' }];
  static readonly ROUTES: Routes = [
    {
      path: 'select/select-basic',
      component: SelectBasicComponent
    },
    {
      path: 'select/select-template',
      component: SelectTemplateComponent
    },
    {
      path: 'select/select-labelkey',
      component: SelectLabelkeyComponent
    },
    {
      path: 'select/select-valuekey',
      component: SelectValuekeyComponent
    },
    {
      path: 'select/select-valuekey-test',
      component: SelectValuekeyTestComponent
    },
    {
      path: 'select/select-group',
      component: SelectGroupComponent
    },
    {
      path: 'select/select-event',
      component: SelectEventComponent
    },
    {
      path: 'select/select-lazy',
      component: SelectLazyComponent
    },
    {
      path: 'select/select-disabled',
      component: SelectDisabledComponent
    },
    {
      path: 'select/select-search',
      component: SelectSearchComponent
    },
    {
      path: 'select/select-searchkeys',
      component: SelectSearchkeysComponent
    },
    {
      path: 'select/select-reservesearchword',
      component: SelectReservesearchwordComponent
    },
    {
      path: 'select/select-beforesearch',
      component: SelectBeforesearchComponent
    },
    {
      path: 'select/select-multi',
      component: SelectMultiComponent
    },
    {
      path: 'select/select-maxline',
      component: SelectMaxlineComponent
    },
    {
      path: 'select/select-multi-maxline',
      component: SelectShowselectednumberComponent
    },
    {
      path: 'select/select-panel',
      component: SelectPanelComponent
    },
    {
      path: 'select/select-tip',
      component: SelectTipComponent
    },
    {
      path: 'select/select-focus',
      component: SelectFocusComponent
    },
    {
      path: 'select/select-nodata',
      component: SelectNodataComponent
    },
    {
      path: 'select/select-tiscroll',
      component: SelectTiscrollComponent
    },
    {
      path: 'select/select-appendtobody',
      component: SelectAppendtobodyComponent
    },
    {
      path: 'select/select-clearable',
      component: SelectClearableComponent
    },
    {
      path: 'select/select-selectall',
      component: SelectSelectallComponent
    },
    {
      path: 'select/select-tag',
      component: SelectTagComponent
    },
    {
      path: 'select/select-tworow',
      component: SelectTworowComponent
    },
    {
      path: 'select/select-pagination',
      component: SelectPaginationComponent
    },
    {
      path: 'select/select-pagin-beforesearch',
      component: SelectPaginBeforesearchComponent
    },
    {
      path: 'select/select-virtualscroll',
      component: SelectVirtualscrollComponent
    },
    {
      path: 'select/select-virtualscroll-multi',
      component: SelectVirtualscrollMultiComponent
    },
    {
      path: 'select/select-scroll-load',
      component: SelectScrollLoadComponent
    },
    { path: 'select/select-small', component: SelectSmallComponent },
    { path: 'select/select-noborder', component: SelectNoborderComponent },
    { path: 'select/select-noempty', component: SelectNoemptyComponent },
    { path: 'select/select-leak', component: SelectLeakComponent },
    { path: 'select/select-valid', component: SelectValidComponent },
    { path: 'select/select-validgroup', component: SelectValidgroupComponent },
    { path: 'select/select-load', component: SelectLoadComponent },
    { path: 'select/select-many', component: SelectManyComponent },
    { path: 'select/select-input', component: SelectInputComponent },
    { path: 'select/select-id', component: SelectIdComponent },
    { path: 'select/select-much', component: SelectMuchComponent },
    { path: 'select/select-enum', component: SelectEnumComponent },
    { path: 'select/select-null', component: SelectNullComponent },
    {
      path: 'select/select-beforesearch-test',
      component: SelectBeforesearchTestComponent
    },
    {
      path: 'select/select-change-selectall',
      component: SelectChangeSelectallComponent
    },
    {
      path: 'select/select-disabledfocus',
      component: SelectDisabledfocusComponent
    },
    {
      path: 'select/select-idkey',
      component: SelectIdkeyComponent
    }
  ];
}
