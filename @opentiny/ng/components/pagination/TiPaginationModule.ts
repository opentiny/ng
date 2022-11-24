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
import { TiPaginationComponent } from './TiPaginationComponent';
import { FormsModule } from '@angular/forms';
import { TiSelectModule } from '../select/TiSelectModule';
import { TiTextModule } from '../text/TiTextModule';
import { TiLocaleModule } from '../../locale/TiLocaleModule';
import { TiIconModule } from '../icon/TiIconModule';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiIconModule,
    TiSelectModule,
    TiTextModule,
    TiLocaleModule,
    TiOutlineModule
  ],
  exports: [TiPaginationComponent],
  declarations: [TiPaginationComponent]
})

export class TiPaginationModule {
}

export * from './TiPaginationComponent';
export { TiPaginationComponent, TiPageSizeConfig, TiPaginationEvent } from './TiPaginationComponent';
