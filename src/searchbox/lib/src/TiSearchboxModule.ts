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
import { TiSearchboxComponent } from './TiSearchboxComponent';
import { FormsModule } from '@angular/forms';
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiDroplistModule } from '@opentiny/ng-droplist';
import { TiTextModule } from '@opentiny/ng-text';
import { TiSearchboxNotsearchComponent } from './TiSearchboxNotsearchComponent';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';

@NgModule({
  imports: [CommonModule, FormsModule, TiOverflowModule, TiDroplistModule, TiIconModule, TiTextModule, TiOutlineModule],
  exports: [TiSearchboxComponent, TiSearchboxNotsearchComponent],
  declarations: [TiSearchboxComponent, TiSearchboxNotsearchComponent]
})
export class TiSearchboxModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiSearchboxComponent } from './TiSearchboxComponent';
export { TiSearchboxNotsearchComponent } from './TiSearchboxNotsearchComponent';
