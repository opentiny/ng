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
import { TiPopconfirmComponent } from './TiPopconfirmComponent';
import { TiTipServiceModule } from '../../services/tip/TiTipServiceModule';
import { TiLocaleModule } from '../../locale/TiLocaleModule';
import { TiIconModule } from '../../components/icon/TiIconModule';
import { TiButtonModule } from '../../components/button/TiButtonModule';
import { TiPopconfirmDirective } from './TiPopconfirmDirective';

@NgModule({
  imports: [
    CommonModule,
    TiTipServiceModule,
    TiLocaleModule,
    TiIconModule,
    TiButtonModule
  ],
  exports: [TiPopconfirmDirective],
  declarations: [TiPopconfirmComponent, TiPopconfirmDirective],
  entryComponents: [TiPopconfirmComponent]
})

export class TiPopconfirmModule { }
export { TiPopconfirmComponent } from './TiPopconfirmComponent';
export { TiPopconfirmDirective, TiPopconfirmConfig } from './TiPopconfirmDirective';
