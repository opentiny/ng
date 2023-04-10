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

import { TiLocaleModule, TiLocale } from '@opentiny/ng-locale';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiPopupModule } from '@opentiny/ng-popup';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiCopyComponent } from './TiCopyComponent';
import { TiToastComponent } from './TiToastComponent';

import { locales } from './i18n';

@NgModule({
  imports: [CommonModule, TiLocaleModule, TiPopupModule, TiIconModule, TiOutlineModule],
  exports: [TiCopyComponent],
  declarations: [TiCopyComponent, TiToastComponent],
  entryComponents: [TiToastComponent]
})
export class TiCopyModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiCopyComponent } from './TiCopyComponent';
