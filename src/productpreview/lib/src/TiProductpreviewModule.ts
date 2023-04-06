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
import { TiIconModule } from '@opentiny/ng-icon';
import { TiImagepreviewModule } from '@opentiny/ng-imagepreview';
import { TiModalModule } from '@opentiny/ng-modal';
import { TiZoomModule } from '@opentiny/ng-zoom';
import { TiOutlineModule } from '@opentiny/ng-outline';

import { TiProductpreviewComponent } from './TiProductpreviewComponent';

@NgModule({
  imports: [CommonModule, TiImagepreviewModule, TiIconModule, TiModalModule, TiZoomModule, TiOutlineModule],
  exports: [TiProductpreviewComponent],
  declarations: [TiProductpreviewComponent]
})
export class TiProductpreviewModule {}
export { TiProductpreviewComponent } from './TiProductpreviewComponent';
