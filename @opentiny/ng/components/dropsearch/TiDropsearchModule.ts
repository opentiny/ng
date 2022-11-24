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
import { TiDropsearchComponent } from './TiDropsearchComponent';
import { TiDropModule } from '../drop/TiDropModule';
import { TiListModule } from '../list/TiListModule';
import { TiSearchboxModule } from '../searchbox/TiSearchboxModule';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiDropModule,
    TiListModule,
    TiSearchboxModule
  ],
  exports: [TiDropsearchComponent],
  declarations: [TiDropsearchComponent]
})
export class TiDropsearchModule {
}
export { TiDropsearchComponent } from './TiDropsearchComponent';
