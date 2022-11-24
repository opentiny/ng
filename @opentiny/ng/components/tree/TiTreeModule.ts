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
import { TiCheckboxModule } from '../checkbox/TiCheckboxModule';
import { TiIconModule } from '../icon/TiIconModule';
import { TiLoadingModule } from '../loading/TiLoadingModule';
import { TiHighlightPipe } from './TiHighlightPipe';
import { TiRendererModule } from '../../services/renderer/TiRendererModule';
import { TiTextModule } from '../text/TiTextModule';
import { TiValidationModule } from '../../directives/validation/TiValidationModule';
import { TiAutoSelectDirective } from './TiAutoSelectDirective'
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

}

export * from './TiTreeComponent';
export { TiTreeComponent, TiTreeNode, TiTreeDragNode } from './TiTreeComponent';
export { TiTreeUtil } from './TiTreeUtil';
