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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TiTreeselectComponent } from './TiTreeselectComponent';
import { TiDominatorModule } from '../dominator/TiDominatorModule';
import { TiDropsearchModule } from '../dropsearch/TiDropsearchModule';
import { TiDropModule } from '../drop/TiDropModule';
import { TiTreeModule } from '../tree/TiTreeModule';
import { TiSearchboxModule } from '../searchbox/TiSearchboxModule';
import { TiCheckboxModule } from '../checkbox/TiCheckboxModule';

@NgModule({
  imports: [
    TiDominatorModule, TiDropsearchModule, TiDropModule, TiTreeModule, TiSearchboxModule, TiCheckboxModule,
    FormsModule,
    CommonModule
  ],
  exports: [TiTreeselectComponent],
  declarations: [TiTreeselectComponent]
})

export class TiTreeselectModule {}

export { TiTreeselectComponent } from './TiTreeselectComponent';
