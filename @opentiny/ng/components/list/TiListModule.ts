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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TiTipModule } from '../../directives/tip/TiTipModule';
import { TiListComponent, TiListScrollLoad } from './TiListComponent';
import { TiIconModule } from '../icon/TiIconModule';
import { TiLoadingModule } from '../loading/TiLoadingModule';
/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    TiIconModule,
    TiTipModule,
    TiLoadingModule
  ],
  exports: [TiListComponent],
  declarations: [TiListComponent]
})
export class TiListModule {
}
export { TiListComponent, TiListScrollLoad } from './TiListComponent';
