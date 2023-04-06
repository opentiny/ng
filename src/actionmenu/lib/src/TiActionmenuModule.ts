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
import { TiActionmenuComponent } from './TiActionmenuComponent';
import { TiMenuModule } from '@opentiny/ng-menu';
import { TiTipModule } from '@opentiny/ng-tip';
import { TiPopconfirmModule } from '@opentiny/ng-popconfirm';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';

@NgModule({
  imports: [CommonModule, TiMenuModule, TiTipModule, TiPopconfirmModule],
  exports: [TiActionmenuComponent],
  declarations: [TiActionmenuComponent]
})
export class TiActionmenuModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiActionmenuComponent, TiActionmenuItem } from './TiActionmenuComponent';
