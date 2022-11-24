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
import { TiTipModule } from '../../directives/tip/TiTipModule';
import { TiProgresspieModule } from '../progresspie/TiProgresspieModule';
import { TiUploadServiceModule } from '../../services/upload/TiUploadServiceModule';
import { TiIconModule } from '../icon/TiIconModule';
import { TiOverflowModule } from '../../directives/overflow/TiOverflowModule';
import { TiValidationModule } from '../../directives/validation/TiValidationModule';
import { TiProgressbarModule } from '../progressbar/TiProgressbarModule';
import { TiUploadbaseComponent } from './TiUploadbaseComponent';
import { TiUploadimageComponent } from './TiUploadimageComponent';
import { TiModalModule } from '../../services/modal/TiModalModule';
import { TiImagepreviewModule } from '../imagepreview/TiImagepreviewModule';
import { TiButtonModule } from '../button/TiButtonModule';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';

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
}
export { TiUploadComponent } from './TiUploadComponent';
export { TiFileSelectDirective } from './TiFileSelectDirective';
export { TiDisabledDirective } from './TiDisabledDirective';
export { TiUploadbaseComponent, TiUploadInitFile, TiUploadimageInitFile } from './TiUploadbaseComponent';
export { TiUploadimageComponent } from './TiUploadimageComponent';
