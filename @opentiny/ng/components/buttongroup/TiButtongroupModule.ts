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

import { TiTipModule } from '../../directives/tip/TiTipModule';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';
import { TiIconModule } from '../icon/TiIconModule';

import { TiButtongroupComponent } from './TiButtongroupComponent';

@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    TiTipModule,
    TiOutlineModule
  ],
  exports: [
    TiButtongroupComponent
  ],
  declarations: [
    TiButtongroupComponent
  ]
})
export class TiButtongroupModule {

}
export { TiButtongroupComponent, TiButtonItem } from './TiButtongroupComponent';
