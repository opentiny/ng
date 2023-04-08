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
import { TiIconModule } from '@opentiny/ng-icon';
import { TiModalModule } from '@opentiny/ng-modal';
import { TiTipServiceModule } from '@opentiny/ng-tip';
import { TiLocaleModule, TiLocale } from '@opentiny/ng-locale';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiIntromodalComponent } from './TiIntromodalComponent';
import { TiIntrotipComponent } from './TiIntrotipComponent';
import { locales } from './i18n';

/**
 * @ignore
 */
@NgModule({
  imports: [CommonModule, TiButtonModule, TiIconModule, TiLocaleModule, TiModalModule, TiTipServiceModule, TiOutlineModule],
  declarations: [TiIntrotipComponent, TiIntromodalComponent],
  entryComponents: [TiIntrotipComponent, TiIntromodalComponent]
})
export class TiIntroServiceModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiIntroConfig, TiIntroRef, TiIntroStep, TiIntroShape } from './TiIntroInterface';
