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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TiDatePanelComponent } from './TiDatePanelComponent';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiListModule } from '@opentiny/ng-list';
import { TiLocaleModule } from '@opentiny/ng-locale';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';

/**
 * @ignore
 */
@NgModule({
  imports: [CommonModule, FormsModule, TiIconModule, TiListModule, TiLocaleModule],
  exports: [TiDatePanelComponent],
  declarations: [TiDatePanelComponent]
})
export class TiDatePanelModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiDatePanelComponent, TiDatePanel, TiPickerHeadText, TiDateValueAndState, TiYearRange } from './TiDatePanelComponent';
