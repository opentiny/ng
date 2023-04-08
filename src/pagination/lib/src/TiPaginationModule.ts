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
import { TiPaginationComponent } from './TiPaginationComponent';
import { FormsModule } from '@angular/forms';
import { TiSelectModule } from '@opentiny/ng-select';
import { TiTextModule } from '@opentiny/ng-text';
import { TiLocaleModule } from '@opentiny/ng-locale';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';

@NgModule({
  imports: [CommonModule, FormsModule, TiIconModule, TiSelectModule, TiTextModule, TiLocaleModule, TiOutlineModule],
  exports: [TiPaginationComponent],
  declarations: [TiPaginationComponent]
})
export class TiPaginationModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}

export * from './TiPaginationComponent';
export { TiPaginationComponent, TiPageSizeConfig, TiPaginationEvent } from './TiPaginationComponent';
