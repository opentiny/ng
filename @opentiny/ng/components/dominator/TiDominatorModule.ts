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
import { TiTipModule } from '../../directives/tip/TiTipModule';
import { TiDominatorComponent } from './TiDominatorComponent';
import { TiTagModule } from '../tag/TiTagModule';
import { TiIconModule } from '../icon/TiIconModule';
import { TiLocaleModule } from '../../locale/TiLocaleModule';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiIconModule,
    TiTipModule,
    TiLocaleModule,
    TiTagModule
  ],
  exports: [TiDominatorComponent],
  declarations: [TiDominatorComponent]
})
export class TiDominatorModule {
}
export { TiDominatorComponent } from './TiDominatorComponent';
