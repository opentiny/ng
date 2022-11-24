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
import { TiImagepreviewComponent } from './TiImagepreviewComponent';
import { TiModalModule } from '../../services/modal/TiModalModule';
import { TiIconModule } from '../../components/icon/TiIconModule';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';
/**
 * @ignore
 */
@NgModule({
  imports: [TiModalModule, CommonModule, TiIconModule, TiOutlineModule],
  exports: [TiImagepreviewComponent],
  declarations: [TiImagepreviewComponent]
})

export class TiImagepreviewModule {}
export { TiImagepreviewComponent, TiFilePreviewInfo } from './TiImagepreviewComponent';
