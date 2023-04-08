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
import { TiInputNumberModule } from '@opentiny/ng-inputnumber';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiSpinnerComponent } from './TiSpinnerComponent';
import { TiTextModule } from '@opentiny/ng-text';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiTipModule } from '@opentiny/ng-tip';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';
@NgModule({
  imports: [CommonModule, FormsModule, TiIconModule, TiTextModule, TiInputNumberModule, TiTipModule],
  exports: [TiSpinnerComponent],
  declarations: [TiSpinnerComponent]
})
export class TiSpinnerModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiSpinnerComponent } from './TiSpinnerComponent';
