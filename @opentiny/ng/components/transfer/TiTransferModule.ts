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
import { TiTransferComponent } from './TiTransferComponent';
import { TiTransferListComponent } from './transferlist/TiTransferListComponent';
import { FormsModule } from '@angular/forms';
import { TiDropsearchModule } from '../dropsearch/TiDropsearchModule';
import { TiDropModule } from '../drop/TiDropModule';
import { TiLocaleModule } from '../../locale/TiLocaleModule';
import { TiIconModule } from '../icon/TiIconModule';
import { TiListModule } from '../list/TiListModule';
import { TiSearchboxModule } from '../searchbox/TiSearchboxModule';
import { TiTableModule } from '../table/TiTableModule';
import { TiOverflowModule } from '../../directives/overflow/TiOverflowModule';
import { TiCheckboxModule } from '../checkbox/TiCheckboxModule';
import { TiPaginationModule } from '../pagination/TiPaginationModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiLocaleModule,
    TiIconModule,
    TiDropsearchModule,
    TiDropModule,
    TiListModule,
    TiSearchboxModule,
    TiPaginationModule,
    TiTableModule,
    TiOverflowModule,
    TiCheckboxModule
  ],
  exports: [TiTransferComponent, TiTransferListComponent],
  declarations: [TiTransferComponent, TiTransferListComponent]
})

export class TiTransferModule {
}
export { TiTransferComponent } from './TiTransferComponent';
export { TiTransferListComponent } from './transferlist/TiTransferListComponent';
export { TiTransferColumn } from './TiTransferColumn';
