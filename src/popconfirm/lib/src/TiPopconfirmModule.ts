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
import { TiTipServiceModule } from '@opentiny/ng-tip';
import { TiLocaleModule, TiLocale } from '@opentiny/ng-locale';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiButtonModule } from '@opentiny/ng-button';
import { TiPopconfirmDirective } from './TiPopconfirmDirective';
import { locales } from './i18n';

@NgModule({
  imports: [CommonModule, TiTipServiceModule, TiLocaleModule, TiIconModule, TiButtonModule],
  exports: [TiPopconfirmDirective],
  declarations: [TiPopconfirmComponent, TiPopconfirmDirective],
  entryComponents: [TiPopconfirmComponent]
})
export class TiPopconfirmModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiPopconfirmComponent } from './TiPopconfirmComponent';
export { TiPopconfirmDirective, TiPopconfirmConfig } from './TiPopconfirmDirective';
