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

import { TiDroplistModule } from '@opentiny/ng-droplist';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOutlineModule } from '@opentiny/ng-outline';

import { TiButtonselectComponent } from './TiButtonselectComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiDroplistModule, TiIconModule, TiOutlineModule],
  exports: [TiButtonselectComponent],
  declarations: [TiButtonselectComponent]
})
export class TiButtonselectModule {}

export { TiButtonselectComponent } from './TiButtonselectComponent';
