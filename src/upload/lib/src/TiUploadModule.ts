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
import { TiFileSelectDirective } from './TiFileSelectDirective';
import { TiUploadComponent } from './TiUploadComponent';
import { TiDisabledDirective } from './TiDisabledDirective';
import { TiTipModule } from '@opentiny/ng-tip';
import { TiProgresspieModule } from '@opentiny/ng-progresspie';
import { TiUploadServiceModule } from './TiUploadServiceModule';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiValidationModule } from '@opentiny/ng-validation';
import { TiProgressbarModule } from '@opentiny/ng-progressbar';
import { TiUploadbaseComponent } from './TiUploadbaseComponent';
import { TiUploadimageComponent } from './TiUploadimageComponent';
import { TiModalModule } from '@opentiny/ng-modal';
import { TiImagepreviewModule } from '@opentiny/ng-imagepreview';
import { TiButtonModule } from '@opentiny/ng-button';
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';

@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    TiTipModule,
    TiProgresspieModule,
    TiUploadServiceModule,
    TiOverflowModule,
    TiValidationModule,
    TiProgressbarModule,
    TiModalModule,
    TiImagepreviewModule,
    TiButtonModule,
    TiOutlineModule
  ],
  exports: [TiFileSelectDirective, TiUploadComponent, TiDisabledDirective, TiUploadbaseComponent, TiUploadimageComponent],
  declarations: [TiFileSelectDirective, TiUploadComponent, TiDisabledDirective, TiUploadbaseComponent, TiUploadimageComponent]
})
export class TiUploadModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}
export { TiUploadComponent } from './TiUploadComponent';
export { TiFileSelectDirective } from './TiFileSelectDirective';
export { TiDisabledDirective } from './TiDisabledDirective';
export { TiUploadbaseComponent, TiUploadInitFile, TiUploadimageInitFile } from './TiUploadbaseComponent';
export { TiUploadimageComponent } from './TiUploadimageComponent';
