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

import { TiButtonModule } from '@opentiny/ng-button';
import { TiLocaleModule, TiLocale } from '@opentiny/ng-locale';
import { TiIconModule } from '@opentiny/ng-icon';

import { TiCollapsebuttonComponent } from './TiCollapsebuttonComponent';
import { TiCollapsepanelComponent } from './TiCollapsepanelComponent';

import { locales } from './i18n';

@NgModule({
  imports: [CommonModule, TiButtonModule, TiLocaleModule, TiIconModule],
  exports: [TiCollapsebuttonComponent, TiCollapsepanelComponent],
  declarations: [TiCollapsebuttonComponent, TiCollapsepanelComponent]
})
export class TiCollapsebuttonModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiCollapsebuttonComponent } from './TiCollapsebuttonComponent';
export { TiCollapsepanelComponent } from './TiCollapsepanelComponent';
