/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TiDateModule } from '@opentiny/ng-date';
import { TiDatetimeModule } from '@opentiny/ng-datetime';
import { TiListModule } from '@opentiny/ng-list';
import { TiSearchboxModule } from '@opentiny/ng-searchbox';
import { TiDropModule } from '@opentiny/ng-drop';
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiTableFixedHeadServiceModule } from './TiTableFixedHeadServiceModule';
import { TiTableComponent } from './TiTableComponent';
import { TiHeadFilterComponent } from './TiHeadFilterComponent';
import { TiHeadFilterDropComponent } from './TiHeadFilterDropComponent';
import { TiHeadSortComponent } from './TiHeadSortComponent';
import { TiHeadMenuComponent } from './TiHeadMenuComponent';
import { TiDetailsIconComponent } from './TiDetailsIconComponent';
import { TiDetailsTrDirective } from './TiDetailsTrDirective';
import { TiColspanDirective } from './TiColspanDirective';
import { TiColsToggleComponent } from './TiColsToggleComponent';
import { TiColsToggleDropComponent } from './TiColsToggleDropComponent';
import { TiColsResizableDirective } from './TiColsResizableDirective';
import { TiCellTextComponent } from './TiCellTextComponent';
import { TiCellIconsComponent } from './TiCellIconsComponent';
import { TiColumnsPipe } from './TiColumnsPipe';
import { TiColumnFixedDirective } from './TiColumnFixedDirective';
import { TiColClickDirective } from './TiColClickDirective';
import { TiTableVirtualScrollViewportComponent } from './TiTableVirtualScrollViewportComponent';
import { TiTableFixedSizeVirtualScrollDirective } from './TiTableFixedSizeVirtualScrollDirective';
import { TiLocaleModule, TiLocale } from '@opentiny/ng-locale';
import { TiRendererModule } from '@opentiny/ng-renderer';
import { TiTipModule } from '@opentiny/ng-tip';
import { TiButtonModule } from '@opentiny/ng-button';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { locales } from './i18n';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiIconModule,
    TiListModule,
    TiSearchboxModule,
    TiDropModule,
    TiOverflowModule,
    TiTableFixedHeadServiceModule,
    TiLocaleModule,
    TiRendererModule,
    TiTipModule,
    TiOutlineModule,
    ScrollingModule,
    TiDateModule,
    TiDatetimeModule
  ],
  exports: [
    TiTableComponent,
    TiHeadFilterComponent,
    TiHeadSortComponent,
    TiHeadMenuComponent,
    TiDetailsIconComponent,
    TiDetailsTrDirective,
    TiColspanDirective,
    TiColsToggleComponent,
    TiColsResizableDirective,
    TiCellTextComponent,
    TiCellIconsComponent,
    TiColumnFixedDirective,
    TiColClickDirective,
    TiTableVirtualScrollViewportComponent,
    TiTableFixedSizeVirtualScrollDirective
  ],
  declarations: [
    TiTableComponent,
    TiHeadFilterComponent,
    TiHeadFilterDropComponent,
    TiHeadSortComponent,
    TiHeadMenuComponent,
    TiDetailsIconComponent,
    TiDetailsTrDirective,
    TiColspanDirective,
    TiColsToggleComponent,
    TiColsToggleDropComponent,
    TiColsResizableDirective,
    TiCellTextComponent,
    TiCellIconsComponent,
    TiColumnsPipe,
    TiColumnFixedDirective,
    TiColClickDirective,
    TiTableVirtualScrollViewportComponent,
    TiTableFixedSizeVirtualScrollDirective
  ]
})
export class TiTableModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export {
  TiTableComponent,
  TiTableSrcState,
  TiTableDataState,
  TiTableRowData,
  TiTableSrcData,
  TiTableColumns,
  TiTableStorageConfig,
  TiPaginationStorageConfig
} from './TiTableComponent';
export { TiHeadFilterComponent } from './TiHeadFilterComponent';
export { TiHeadSortComponent } from './TiHeadSortComponent';
export { TiHeadMenuComponent } from './TiHeadMenuComponent';
export { TiDetailsIconComponent } from './TiDetailsIconComponent';
export { TiDetailsTrDirective } from './TiDetailsTrDirective';
export { TiColspanDirective } from './TiColspanDirective';
export { TiColsToggleComponent } from './TiColsToggleComponent';
export { TiColsResizableDirective } from './TiColsResizableDirective';
export { TiCellTextComponent } from './TiCellTextComponent';
export { TiCellIconsComponent } from './TiCellIconsComponent';
export { TiColumnFixedDirective } from './TiColumnFixedDirective';
export { TiColClickDirective } from './TiColClickDirective';
export { TiTableVirtualScrollViewportComponent } from './TiTableVirtualScrollViewportComponent';
export { fixedSizeVirtualScrollStrategyFactory, TiTableFixedSizeVirtualScrollDirective } from './TiTableFixedSizeVirtualScrollDirective';
