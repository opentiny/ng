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
import { TiTranslatePipe } from './TiTranslatePipe';
/**
 * @ignore
 */
@NgModule({
  declarations: [ TiTranslatePipe ],
  exports: [ TiTranslatePipe ]
})
export class TiLocaleModule {}
export { TiLocale } from './TiLocale';
export { TiLocaleFormat } from './TiLocaleFormat';
export { TiLocaleWords } from './TiLocaleWords';
export { zh_CN, en_US, de_DE, es_ES, es_US, fr_FR, pt_BR } from './i18n';
export { TiTranslatePipe } from './TiTranslatePipe';
