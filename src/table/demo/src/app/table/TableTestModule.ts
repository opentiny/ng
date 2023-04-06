import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
  TiAccordionModule,
  TiActionmenuModule,
  TiButtonModule,
  TiCheckboxModule,
  TiDateModule,
  TiFormfieldModule,
  TiIconModule,
  TiLeftmenuModule,
  TiLoadingModule,
  TiMessageModule,
  TiOverflowModule,
  TiPaginationModule,
  TiRadioModule,
  TiSearchboxModule,
  TiSelectModule,
  TiTableModule,
  TiTextModule,
  TiTipModule,
  TiValidationModule
} from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { TableBasicComponent } from './TableBasicComponent';
import { TableBasicTestComponent } from './TableBasicTestComponent';
import { TableFilterStrictComponent } from './TableFilterStrictComponent';
import { TableFilterComponent } from './TableFilterComponent';
import { TablePaginationComponent } from './TablePaginationComponent';
import { TableServerPagiComponent } from './TableServerPagiComponent';
import { TablePagiWithFilterComponent } from './TablePagiWithFilterComponent';
import { TableDetailsComponent } from './TableDetailsComponent';
import { TableDetailsCloseotherdetailsComponent } from './TableDetailsCloseotherdetailsComponent';
import { TableDynamicDetailsComponent } from './TableDynamicDetailsComponent';
import { TableSortBasicComponent } from './TableSortBasicComponent';
import { TableSortComparefnComponent } from './TableSortComparefnComponent';
import { TableSortDetailsComponent } from './TableSortDetailsComponent';
import { TableSortComparefnLocaleComponent } from './TableSortComparefnLocaleComponent';
import { TableSortTestComponent } from './TableSortTestComponent';
import { TableColsToggleComponent } from './TableColsToggleComponent';
import { TableColsToggleDetailsComponent } from './TableColsToggleDetailsComponent';
import { NestedTableComponent, TableDetailsNesttableComponent } from './TableDetailsNesttableComponent';
import { TableDetailsPaginationComponent } from './TableDetailsPaginationComponent';
import { TableColsResizableComponent } from './TableColsResizableComponent';
import { TableColsresizableSortComponent } from './TableColsresizableSortComponent';
import { TableColsresizableColstoggleComponent } from './TableColsresizableColstoggleComponent';
import { TableColsresizableLoadfailComponent } from './TableColsresizableLoadfailComponent';
import { TableCellTipComponent } from './TableCellTipComponent';
import { TableCelliconsColsresizableComponent } from './TableCelliconsColsresizableComponent';
import { TableNodataComponent } from './TableNodataComponent';
import { TableNodataSimpleComponent } from './TableNodataSimpleComponent';
import { TableLoadFailComponent } from './TableLoadFailComponent';
import { TableGuideComponent } from './TableGuideComponent';
import { TableColAlignComponent } from './TableColAlignComponent';
import { TableColalignSortResizableTestComponent } from './TableColalignSortResizableTestComponent';
import { TableGroupComponent } from './TableGroupComponent';
import { TableCheckboxComponent } from './TableCheckboxComponent';
import { TableRadioComponent } from './TableRadioComponent';
import { TableRowspanComponent } from './TableRowspanComponent';
import { TableSoldoutComponent } from './TableSoldoutComponent';
import { TableTreeComponent } from './TableTreeComponent';
import { TableTreeUnknowdeepthComponent } from './TableTreeUnknowdeepthComponent';
import { TableTreeMulitiselectComponent } from './TableTreeMulitiselectComponent';
import { TableSmallComponent } from './TableSmallComponent';
import { TableFixedHeadComponent } from './TableFixedHeadComponent';
import { TableFixedHeadPaginationDetailsComponent } from './TableFixedHeadPaginationDetailsComponent';
import { TableFixedHeadInAccordionComponent } from './TableFixedHeadInAccordionComponent';
import { TableFixedHeadNodataComponent } from './TableFixedHeadNodataComponent';
import { TableFixedHeadColsResizableComponent } from './TableFixedHeadColsResizableComponent';
import { TableFixedheadColsresizablePaginationDetailsComponent } from './TableFixedheadColsresizablePaginationDetailsComponent';
import { TableActionmenuComponent } from './TableActionmenuComponent';
import { TableHeadFilterTestComponent } from './TableHeadFilterTestComponent';
import { TableHeadFilterValuekeyComponent } from './TableHeadFilterValuekeyComponent';
import { TableHeadFilterMultiValuekeyComponent } from './TableHeadFilterMultiValuekeyComponent';
import { TableHeadFilterMultiComponent } from './TableHeadFilterMultiComponent';
import { TableHeadFilterDatetimeComponent } from './TableHeadFilterDatetimeComponent';
import { TableHeadFilterVirtualscrollComponent } from './TableHeadFilterVirtualscrollComponent';
import { TableColsresizableSortHeadfilterComponent } from './TableColsresizableSortHeadfilterComponent';
import { TableServerPagiSearchSortComponent } from './TableServerPagiSearchSortComponent';
import { TableColsresizableColstoggleFixedheadComponent } from './TableColsresizableColstoggleFixedheadComponent';
import { TableColumnFixedComponent } from './TableColumnFixedComponent';
import { TableColumnfixedResizableComponent } from './TableColumnfixedResizableComponent';
import { TableColumnfixedHeadfixedComponent } from './TableColumnfixedHeadfixedComponent';
import { TableColumnfixedEditrowComponent } from './TableColumnfixedEditrowComponent';
import { TableColumnfixedNodataComponent } from './TableColumnfixedNodataComponent';
import { TableColumnfixedCheckboxComponent } from './TableColumnfixedCheckboxComponent';
import { TableColumnfixedColstoggleComponent } from './TableColumnfixedColstoggleComponent';
import { TableColumnfixedPaginationComponent } from './TableColumnfixedPaginationComponent';
import { TableColumnfixedFixedheadColsresizablePaginationComponent } from './TableColumnfixedFixedheadColsresizablePaginationComponent';
import { TableColumnfixedLeftmenuComponent } from './TableColumnfixedLeftmenuComponent';
import { TableEditrowComponent } from './TableEditrowComponent';
import { TableEditallComponent } from './TableEditallComponent';
import { TableOverflowLinkComponent } from './TableOverflowLinkComponent';
import { TableFixheadScrollComponent } from './TableFixheadScrollComponent';
import { TableRowDrag2Component } from './TableRowDrag2Component';
import { TableStorageFilterComponent } from './TableStorageFilterComponent';
import { TableStorageConfigComponent } from './TableStorageConfigComponent';
import { TableStorageServeComponent } from './TableStorageServeComponent';
import { TableStorageComponent } from './TableStorageComponent';
import { TableCheckboxPaginationComponent } from './TableCheckboxPaginationComponent';
import { TableComprehensiveComponent } from './TableComprehensiveComponent';
import { TableVirtualscrollBasicComponent } from './TableVirtualscrollBasicComponent';
import { TableVirtualscrollSizesComponent } from './TableVirtualscrollSizesComponent';
import { TableVirtualscrollComprehensiveComponent } from './TableVirtualscrollComprehensiveComponent';
import { TableVirtualscrollTreeComponent } from './TableVirtualscrollTreeComponent';
import { TableCheckboxPaginationHeadmenuComponent } from './TableCheckboxPaginationHeadmenuComponent';
import { TableNodataTestComponent } from './TableNodataTestComponent';
import { TableSortComponent } from './TableSortComponent';
import { TableSortResetComponent } from './TableSortResetComponent';
import { TableSearchComponent } from './TableSearchComponent';
import { TableHeadFilterComponent } from './TableHeadFilterComponent';
import { TableHeadFilterDatetimeTestComponent } from './TableHeadFilterDatetimeTestComponent';
import { TableRadioTestComponent } from './TableRadioTestComponent';
import { TableColsToggleTestComponent } from './TableColsToggleTestComponent';
import { TableColsresizableBasicComponent } from './TableColsresizableBasicComponent';
import { TableEditrowTestComponent } from './TableEditrowTestComponent';
import { TableEditallTestComponent } from './TableEditallTestComponent';
import { TableVirtualscrollComponent } from './TableVirtualscrollComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiActionmenuModule,
    TiPaginationModule,
    TiTipModule,
    TiOverflowModule,
    TiCheckboxModule,
    TiRadioModule,
    TiAccordionModule,
    TiTextModule,
    TiSearchboxModule,
    TiTableModule,
    TiIconModule,
    TiSelectModule,
    TiDateModule,
    TiValidationModule,
    TiLeftmenuModule,
    TiMessageModule,
    ScrollingModule,
    TiFormfieldModule,
    TiButtonModule,
    TiLoadingModule,
    DemoLogModule,
    RouterModule.forChild(TableTestModule.ROUTES)
  ],
  declarations: [
    TableBasicComponent,
    TableFilterComponent,
    TableFilterStrictComponent,
    TablePaginationComponent,
    TableServerPagiComponent,
    TablePagiWithFilterComponent,
    TableSortBasicComponent,
    TableDetailsComponent,
    TableDetailsCloseotherdetailsComponent,
    TableDynamicDetailsComponent,
    TableSortComparefnComponent,
    TableSortComparefnLocaleComponent,
    TableSortTestComponent,
    TableSortDetailsComponent,
    TableColsToggleComponent,
    TableColsToggleDetailsComponent,
    TableDetailsNesttableComponent,
    TableDetailsPaginationComponent,
    NestedTableComponent,
    TableColsResizableComponent,
    TableColsresizableSortComponent,
    TableColsresizableColstoggleComponent,
    TableColsresizableLoadfailComponent,
    TableCellTipComponent,
    TableCelliconsColsresizableComponent,
    TableNodataComponent,
    TableNodataSimpleComponent,
    TableLoadFailComponent,
    TableGuideComponent,
    TableColAlignComponent,
    TableColalignSortResizableTestComponent,
    TableGroupComponent,
    TableCheckboxComponent,
    TableRadioComponent,
    TableRowspanComponent,
    TableSoldoutComponent,
    TableTreeComponent,
    TableTreeUnknowdeepthComponent,
    TableTreeMulitiselectComponent,
    TableSmallComponent,
    TableFixedHeadComponent,
    TableFixedHeadPaginationDetailsComponent,
    TableFixedHeadInAccordionComponent,
    TableFixedHeadNodataComponent,
    TableFixedHeadColsResizableComponent,
    TableFixedheadColsresizablePaginationDetailsComponent,
    TableActionmenuComponent,
    TableHeadFilterTestComponent,
    TableHeadFilterValuekeyComponent,
    TableHeadFilterMultiValuekeyComponent,
    TableHeadFilterMultiComponent,
    TableHeadFilterDatetimeComponent,
    TableHeadFilterVirtualscrollComponent,
    TableColsresizableSortHeadfilterComponent,
    TableServerPagiSearchSortComponent,
    TableColsresizableColstoggleFixedheadComponent,
    TableColumnFixedComponent,
    TableColumnfixedResizableComponent,
    TableColumnfixedHeadfixedComponent,
    TableColumnfixedNodataComponent,
    TableColumnfixedCheckboxComponent,
    TableColumnfixedColstoggleComponent,
    TableColumnfixedPaginationComponent,
    TableColumnfixedFixedheadColsresizablePaginationComponent,
    TableEditrowComponent,
    TableEditallComponent,
    TableFixheadScrollComponent,
    TableColumnfixedLeftmenuComponent,
    TableColumnfixedEditrowComponent,
    TableStorageComponent,
    TableStorageFilterComponent,
    TableStorageConfigComponent,
    TableStorageServeComponent,
    TableCheckboxPaginationComponent,
    TableCheckboxPaginationHeadmenuComponent,
    TableRowDrag2Component,
    TableComprehensiveComponent,
    TableVirtualscrollBasicComponent,
    TableVirtualscrollSizesComponent,
    TableVirtualscrollComprehensiveComponent,
    TableVirtualscrollTreeComponent,
    TableOverflowLinkComponent,
    TableBasicTestComponent,
    TableNodataTestComponent,
    TableSortComponent,
    TableSortResetComponent,
    TableSearchComponent,
    TableHeadFilterComponent,
    TableHeadFilterDatetimeTestComponent,
    TableRadioTestComponent,
    TableColsToggleTestComponent,
    TableColsresizableBasicComponent,
    TableEditrowTestComponent,
    TableEditallTestComponent,
    TableVirtualscrollComponent
  ]
})
export class TableTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiTableComponent.html', label: 'TiTable' },
    { href: 'components/TiColsToggleComponent.html', label: 'ColsToggle' },
    { href: 'components/TiCellTextComponent.html', label: 'CellText' },
    { href: 'components/TiCellIconsComponent.html', label: 'CellIcons' },
    { href: 'components/TiHeadSortComponent.html', label: 'HeadSort' },
    {
      href: 'directives/TiColsResizableDirective.html',
      label: 'ColsResizable'
    },
    { href: 'components/TiDetailsIconComponent.html', label: 'DetailsIcon' },
    { href: 'directives/TiDetailsTrDirective.html', label: 'DetailsTr' },
    { href: 'directives/TiColspanDirective.html', label: 'Colspan' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'table/table-basic',
      component: TableBasicComponent
    },
    {
      path: 'table/table-small',
      component: TableSmallComponent
    },
    {
      path: 'table/table-pagination',
      component: TablePaginationComponent
    },
    {
      path: 'table/table-server-pagi',
      component: TableServerPagiComponent
    },
    {
      path: 'table/table-checkbox',
      component: TableCheckboxComponent
    },
    {
      path: 'table/table-checkbox-pagination',
      component: TableCheckboxPaginationComponent
    },
    {
      path: 'table/table-checkbox-pagination-headmenu',
      component: TableCheckboxPaginationHeadmenuComponent
    },
    {
      path: 'table/table-radio-test',
      component: TableRadioTestComponent
    },
    {
      path: 'table/table-filter',
      component: TableFilterComponent
    },
    {
      path: 'table/table-filter-strict',
      component: TableFilterStrictComponent
    },
    {
      path: 'table/table-sort-basic',
      component: TableSortBasicComponent
    },
    {
      path: 'table/table-sort-comparefn',
      component: TableSortComparefnComponent
    },
    {
      path: 'table/table-sort-comparefn-locale',
      component: TableSortComparefnLocaleComponent
    },
    {
      path: 'table/table-details',
      component: TableDetailsComponent
    },
    {
      path: 'table/table-details-closeotherdetails',
      component: TableDetailsCloseotherdetailsComponent
    },
    {
      path: 'table/table-details-nesttable',
      component: TableDetailsNesttableComponent
    },
    {
      path: 'table/table-dynamic-details',
      component: TableDynamicDetailsComponent
    },
    {
      path: 'table/table-cols-toggle-test',
      component: TableColsToggleTestComponent
    },
    {
      path: 'table/table-colsresizable-basic',
      component: TableColsresizableBasicComponent
    },
    {
      path: 'table/table-colsresizable-sort',
      component: TableColsresizableSortComponent
    },
    {
      path: 'table/table-cellicons-colsresizable',
      component: TableCelliconsColsresizableComponent
    },
    {
      path: 'table/table-nodata',
      component: TableNodataComponent
    },
    {
      path: 'table/table-nodata-simple',
      component: TableNodataSimpleComponent
    },
    {
      path: 'table/table-load-fail',
      component: TableLoadFailComponent
    },
    {
      path: 'table/table-guide',
      component: TableGuideComponent
    },
    {
      path: 'table/table-soldout',
      component: TableSoldoutComponent
    },
    {
      path: 'table/table-cell-tip',
      component: TableCellTipComponent
    },
    {
      path: 'table/table-col-align',
      component: TableColAlignComponent
    },
    {
      path: 'table/table-group',
      component: TableGroupComponent
    },
    {
      path: 'table/table-rowspan',
      component: TableRowspanComponent
    },
    {
      path: 'table/table-tree',
      component: TableTreeComponent
    },
    {
      path: 'table/table-tree-unknowdeepth',
      component: TableTreeUnknowdeepthComponent
    },
    {
      path: 'table/table-tree-mulitiselect',
      component: TableTreeMulitiselectComponent
    },
    {
      path: 'table/table-fixed-head',
      component: TableFixedHeadComponent
    },
    {
      path: 'table/table-actionmenu',
      component: TableActionmenuComponent
    },
    {
      path: 'table/table-head-filter-test',
      component: TableHeadFilterTestComponent
    },
    {
      path: 'table/table-head-filter-valuekey',
      component: TableHeadFilterValuekeyComponent
    },
    {
      path: 'table/table-head-filter-multi-valuekey',
      component: TableHeadFilterMultiValuekeyComponent
    },
    {
      path: 'table/table-head-filter-multi',
      component: TableHeadFilterMultiComponent
    },
    {
      path: 'table/table-head-filter-datetime-test',
      component: TableHeadFilterDatetimeTestComponent
    },
    {
      path: 'table/table-head-filter-virtualscroll',
      component: TableHeadFilterVirtualscrollComponent
    },
    {
      path: 'table/table-server-pagi-search-sort',
      component: TableServerPagiSearchSortComponent
    },
    {
      path: 'table/table-colsresizable-colstoggle-fixedhead',
      component: TableColsresizableColstoggleFixedheadComponent
    },
    {
      path: 'table/table-column-fixed',
      component: TableColumnFixedComponent
    },
    {
      path: 'table/table-columnfixed-resizable',
      component: TableColumnfixedResizableComponent
    },
    {
      path: 'table/table-columnfixed-headfixed',
      component: TableColumnfixedHeadfixedComponent
    },
    {
      path: 'table/table-columnfixed-checkbox',
      component: TableColumnfixedCheckboxComponent
    },
    {
      path: 'table/table-columnfixed-colstoggle',
      component: TableColumnfixedColstoggleComponent
    },
    {
      path: 'table/table-editrow-test',
      component: TableEditrowTestComponent
    },
    {
      path: 'table/table-editall-test',
      component: TableEditallTestComponent
    },
    {
      path: 'table/table-row-drag2',
      component: TableRowDrag2Component
    },
    {
      path: 'table/table-storage',
      component: TableStorageComponent
    },
    {
      path: 'table/table-storage-filter',
      component: TableStorageFilterComponent
    },
    {
      path: 'table/table-storage-config',
      component: TableStorageConfigComponent
    },
    {
      path: 'table/table-storage-serve',
      component: TableStorageServeComponent
    },
    {
      path: 'table/table-virtualscroll-basic',
      component: TableVirtualscrollBasicComponent
    },
    {
      path: 'table/table-virtualscroll-comprehensive',
      component: TableVirtualscrollComprehensiveComponent
    },
    {
      path: 'table/table-virtualscroll-tree',
      component: TableVirtualscrollTreeComponent
    },
    // 用作内部测试用例
    {
      path: 'table/table-pagi-with-filter',
      component: TablePagiWithFilterComponent
    },
    {
      path: 'table/table-details-pagination',
      component: TableDetailsPaginationComponent
    },
    { path: 'table/table-sort-details', component: TableSortDetailsComponent },
    {
      path: 'table/table-cols-toggle-details',
      component: TableColsToggleDetailsComponent
    },
    {
      path: 'table/table-colsresizable-toggle',
      component: TableColsresizableColstoggleComponent
    },
    {
      path: 'table/table-colsresizable-loadfail',
      component: TableColsresizableLoadfailComponent
    },
    {
      path: 'table/table-colsresizable-sort-headfilter',
      component: TableColsresizableSortHeadfilterComponent
    },
    {
      path: 'table/table-col-align-sort-resizable',
      component: TableColalignSortResizableTestComponent
    },
    {
      path: 'table/table-fixed-head-pagination-details',
      component: TableFixedHeadPaginationDetailsComponent
    },
    {
      path: 'table/table-fixed-head-accordion',
      component: TableFixedHeadInAccordionComponent
    },
    {
      path: 'table/table-fixed-head-nodata',
      component: TableFixedHeadNodataComponent
    },
    {
      path: 'table/table-fixed-head-cols-resizable',
      component: TableFixedHeadColsResizableComponent
    },
    {
      path: 'table/table-fixed-head/cols-resizable-pagination-details',
      component: TableFixedheadColsresizablePaginationDetailsComponent
    },
    {
      path: 'table/table-columnfixed-nodata',
      component: TableColumnfixedNodataComponent
    },
    {
      path: 'table/table-columnfixed-pagination',
      component: TableColumnfixedPaginationComponent
    },
    {
      path: 'table/table-columnfixed-fixedhead-colsresizable-pagination',
      component: TableColumnfixedFixedheadColsresizablePaginationComponent
    },
    {
      path: 'table/table-columnfixed-leftmenu',
      component: TableColumnfixedLeftmenuComponent
    },
    {
      path: 'table/table-columnfixed-editrow',
      component: TableColumnfixedEditrowComponent
    },
    {
      path: 'table/table-fixhead-scroll',
      component: TableFixheadScrollComponent
    },
    {
      path: 'table/table-comprehensive',
      component: TableComprehensiveComponent
    },
    {
      path: 'table/table-virtualscroll-sizes',
      component: TableVirtualscrollSizesComponent
    },
    {
      path: 'table/table-overflow-link',
      component: TableOverflowLinkComponent
    },
    {
      path: 'table/table-sort-test',
      component: TableSortTestComponent
    },
    {
      path: 'table/table-basic-test',
      component: TableBasicTestComponent
    },
    {
      path: 'table/table-nodata-test',
      component: TableNodataTestComponent
    },
    {
      path: 'table/table-sort',
      component: TableSortComponent
    },
    {
      path: 'table/table-sort-reset',
      component: TableSortResetComponent
    },
    {
      path: 'table/table-search',
      component: TableSearchComponent
    },
    {
      path: 'table/table-head-filter',
      component: TableHeadFilterComponent
    },
    {
      path: 'table/table-head-filter-datetime',
      component: TableHeadFilterDatetimeComponent
    },
    {
      path: 'table/table-radio',
      component: TableRadioComponent
    },
    {
      path: 'table/table-cols-toggle',
      component: TableColsToggleComponent
    },
    {
      path: 'table/table-cols-resizable',
      component: TableColsResizableComponent
    },
    {
      path: 'table/table-editrow',
      component: TableEditrowComponent
    },
    {
      path: 'table/table-editall',
      component: TableEditallComponent
    },
    {
      path: 'table/table-virtualscroll',
      component: TableVirtualscrollComponent
    }
  ];
}
