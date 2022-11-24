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
import { TiIpsectionComponent } from './TiIpsectionComponent';
import { TiSelectModule } from '../select/TiSelectModule';
import { TiTextModule } from '../text/TiTextModule';
import { TiValidationModule } from '../../directives/validation/TiValidationModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiSelectModule,
    TiTextModule,
    ReactiveFormsModule,
    TiValidationModule],
  exports: [TiIpsectionComponent],
  declarations: [TiIpsectionComponent]
})

export class TiIpsectionModule { }
export { TiIpsectionComponent, TiIpsectionConfig } from './TiIpsectionComponent';
