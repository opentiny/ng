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
import { TiPhonenumberComponent } from './TiPhonenumberComponent';
import { TiPhoneValidatorDirective } from './TiPhoneValidatorDirective';
import { TiLocale, TiLocaleModule } from '@opentiny/ng-locale';
import { locales } from './i18n';
import { FormsModule } from '@angular/forms';
import { TiSelectModule } from '@opentiny/ng-select';
import { TiTextModule } from '@opentiny/ng-text';
import { TiValidationModule } from '@opentiny/ng-validation';

@NgModule({
  declarations: [TiPhonenumberComponent, TiPhoneValidatorDirective],
  imports: [CommonModule, FormsModule, TiLocaleModule, TiSelectModule, TiTextModule, TiValidationModule],
  exports: [TiPhonenumberComponent, TiPhoneValidatorDirective]
})
export class TiPhonenumberModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiPhonenumberComponent, TiCountryCode } from './TiPhonenumberComponent';
export { TiPhoneValidatorDirective } from './TiPhoneValidatorDirective';
