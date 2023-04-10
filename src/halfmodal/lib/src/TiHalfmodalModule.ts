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
import { TiOutlineModule } from '@opentiny/ng-outline';
import { TiPopupModule } from '@opentiny/ng-popup';
import { TiIconModule } from '@opentiny/ng-icon';

import { TiHalfmodalComponent } from './TiHalfmodalComponent';
import { TiHalfmodalHeaderComponent } from './TiHalfmodalHeaderComponent';
import { TiHalfmodalFooterComponent } from './TiHalfmodalFooterComponent';
import { TiHalfmodalBodyComponent } from './TiHalfmodalBodyComponent';
import { TiHalfmodalContainerComponent } from './TiHalfmodalContainerComponent';

@NgModule({
  imports: [CommonModule, TiOutlineModule, TiPopupModule, TiIconModule],
  exports: [
    TiHalfmodalComponent,
    TiHalfmodalHeaderComponent,
    TiHalfmodalFooterComponent,
    TiHalfmodalBodyComponent,
    TiHalfmodalContainerComponent
  ],
  declarations: [
    TiHalfmodalComponent,
    TiHalfmodalHeaderComponent,
    TiHalfmodalFooterComponent,
    TiHalfmodalBodyComponent,
    TiHalfmodalContainerComponent
  ]
})
export class TiHalfmodalModule {}
export { TiHalfmodalComponent } from './TiHalfmodalComponent';
export { TiHalfmodalHeaderComponent } from './TiHalfmodalHeaderComponent';
export { TiHalfmodalBodyComponent } from './TiHalfmodalBodyComponent';
export { TiHalfmodalFooterComponent } from './TiHalfmodalFooterComponent';
export { TiHalfmodalContainerComponent } from './TiHalfmodalContainerComponent';
