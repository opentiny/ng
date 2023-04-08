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
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TiTreeComponent } from './TiTreeComponent';
import { TiCheckboxModule } from '@opentiny/ng-checkbox';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiLoadingModule } from '@opentiny/ng-loading';
import { TiHighlightPipe } from './TiHighlightPipe';
import { TiRendererModule } from '@opentiny/ng-renderer';
import { TiTextModule } from '@opentiny/ng-text';
import { TiValidationModule } from '@opentiny/ng-validation';
import { TiAutoSelectDirective } from './TiAutoSelectDirective';
import { TiLocale } from '@opentiny/ng-locale';
import { locales } from './i18n';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    TiCheckboxModule,
    TiIconModule,
    FormsModule,
    TiLoadingModule,
    TiRendererModule,
    TiTextModule,
    TiValidationModule
  ],
  exports: [TiTreeComponent],
  declarations: [TiTreeComponent, TiHighlightPipe, TiAutoSelectDirective]
})
export class TiTreeModule {
  constructor() {
    TiLocale.setTiWords(locales);
  }
}

export * from './TiTreeComponent';
export { TiTreeComponent, TiTreeNode, TiTreeDragNode } from './TiTreeComponent';
export { TiTreeUtil } from './TiTreeUtil';
