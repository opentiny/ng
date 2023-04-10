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
import { TiPopupModule } from '@opentiny/ng-popup';
import { TiModalComponent } from './TiModalComponent';
import { TiModalNoAnimationComponent } from './TiModalNoAnimationComponent';
import { TiBackdropComponent } from './TiBackdropComponent';
import { TiBackdropNoAnimationComponent } from './TiBackdropNoAnimationComponent';
import { TiModalHeaderComponent } from './TiModalHeaderComponent';
import { TiModalBodyComponent } from './TiModalBodyComponent';
import { TiModalFooterComponent } from './TiModalFooterComponent';
import { TiRendererModule } from '@opentiny/ng-renderer';
import { TiDraggableModule } from '@opentiny/ng-drag';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOutlineModule } from '@opentiny/ng-outline';

@NgModule({
  imports: [CommonModule, TiDraggableModule, TiIconModule, TiPopupModule, TiOutlineModule, TiRendererModule],
  exports: [
    TiModalComponent,
    TiModalNoAnimationComponent,
    TiBackdropNoAnimationComponent,
    TiModalHeaderComponent,
    TiModalFooterComponent,
    TiModalBodyComponent
  ],
  declarations: [
    TiModalComponent,
    TiModalNoAnimationComponent,
    TiBackdropNoAnimationComponent,
    TiModalHeaderComponent,
    TiModalFooterComponent,
    TiModalBodyComponent,
    TiBackdropComponent
  ],
  entryComponents: [TiModalComponent, TiModalNoAnimationComponent, TiBackdropNoAnimationComponent, TiBackdropComponent]
})
export class TiModalModule {}

export * from './TiModalInterface';
export { TiModalHeaderComponent } from './TiModalHeaderComponent';
export { TiModalFooterComponent } from './TiModalFooterComponent';
export { TiModalBodyComponent } from './TiModalBodyComponent';
export { TiModalComponent } from './TiModalComponent';
export { TiModalNoAnimationComponent } from './TiModalNoAnimationComponent';
export { TiBackdropNoAnimationComponent } from './TiBackdropNoAnimationComponent';
