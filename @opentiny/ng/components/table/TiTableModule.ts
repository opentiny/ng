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
import { TiDateModule } from '../date/TiDateModule';
import { TiDatetimeModule } from '../datetime/TiDatetimeModule';
import { TiListModule } from '../list/TiListModule';
import { TiSearchboxModule } from '../searchbox/TiSearchboxModule';
import { TiDropModule } from '../drop/TiDropModule';
import { TiOverflowModule } from '../../directives/overflow/TiOverflowModule';
import { TiIconModule } from '../icon/TiIconModule';
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
import { TiLocaleModule } from '../../locale/TiLocaleModule';
import { TiRendererModule } from '../../services/renderer/TiRendererModule';
import { TiTipModule } from '../../directives/tip/TiTipModule';
import { TiButtonModule } from '../button/TiButtonModule';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';
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
    TiTableFixedSizeVirtualScrollDirective ],
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
    TiTableFixedSizeVirtualScrollDirective]
})
export class TiTableModule {
}
export { TiTableComponent, TiTableSrcState, TiTableDataState, TiTableRowData, TiTableSrcData, TiTableColumns,
  TiTableStorageConfig, TiPaginationStorageConfig } from './TiTableComponent';
export { TiHeadFilterComponent } from './TiHeadFilterComponent';
export { TiHeadSortComponent } from './TiHeadSortComponent';
export { TiHeadMenuComponent  } from './TiHeadMenuComponent';
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
