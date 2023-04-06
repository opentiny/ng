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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiLabeleditorComponent } from './TiLabeleditorComponent';
import { TiTipModule } from '@opentiny/ng-tip';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiTextModule } from '@opentiny/ng-text';
import { TiTextareaModule } from '@opentiny/ng-textarea';
import { TiValidationModule } from '@opentiny/ng-validation';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiOutlineModule,
    TiIconModule,
    TiOverflowModule,
    TiIconModule,
    TiTextareaModule,
    TiTipModule,
    TiTextModule,
    TiValidationModule
  ],
  exports: [TiLabeleditorComponent],
  declarations: [TiLabeleditorComponent]
})
export class TiLabeleditorModule {}
export { TiLabeleditorComponent } from './TiLabeleditorComponent';
