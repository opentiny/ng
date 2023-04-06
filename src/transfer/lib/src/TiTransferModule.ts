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
import { TiDropsearchModule } from '@opentiny/ng-dropsearch';
import { TiDropModule } from '@opentiny/ng-drop';
import { TiLocaleModule, TiLocale } from '@opentiny/ng-locale';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiListModule } from '@opentiny/ng-list';
import { TiSearchboxModule } from '@opentiny/ng-searchbox';
import { TiTableModule } from '@opentiny/ng-table';
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiCheckboxModule } from '@opentiny/ng-checkbox';
import { TiPaginationModule } from '@opentiny/ng-pagination';
import { locales } from './i18n';

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
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiTransferComponent } from './TiTransferComponent';
export { TiTransferListComponent } from './transferlist/TiTransferListComponent';
export { TiTransferColumn } from './TiTransferColumn';
