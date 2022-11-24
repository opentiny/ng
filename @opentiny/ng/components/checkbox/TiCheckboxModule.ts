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
import { TiCheckboxComponent } from './TiCheckboxComponent';
import { TiIconModule } from '../icon/TiIconModule';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';
import { TiCheckboxGroupComponent } from './TiCheckboxGroupComponent';
import { TiCheckgroupComponent } from './TiCheckgroupComponent';
import { TiCheckitemComponent } from './TiCheckitemComponent';
@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    TiOutlineModule
  ],
  exports: [TiCheckboxComponent, TiCheckgroupComponent, TiCheckitemComponent, TiCheckboxGroupComponent],
  declarations: [TiCheckboxComponent, TiCheckgroupComponent, TiCheckitemComponent, TiCheckboxGroupComponent]
})
export class TiCheckboxModule {
}
export { TiCheckboxComponent } from './TiCheckboxComponent';
export { TiCheckboxGroupComponent, TiCheckboxItem } from './TiCheckboxGroupComponent';
export { TiCheckgroupComponent } from './TiCheckgroupComponent';
export { TiCheckitemComponent } from './TiCheckitemComponent';
