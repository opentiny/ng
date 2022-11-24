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
import { TiLayoutHeaderComponent } from './TiLayoutHeaderComponent';
import { TiLayoutContentComponent } from './TiLayoutContentComponent';
import { TiLayoutSectionComponent } from './TiLayoutSectionComponent';
import { TiLayoutContentBodyComponent } from './TiLayoutContentBodyComponent';
import { TiLayoutContentHeaderComponent } from './TiLayoutContentHeaderComponent';
import { TiLayoutColumnComponent } from './TiLayoutColumnComponent';

@NgModule({
  imports: [CommonModule],
  exports: [ TiLayoutContentComponent,
             TiLayoutContentBodyComponent,
             TiLayoutHeaderComponent,
             TiLayoutSectionComponent,
             TiLayoutContentHeaderComponent,
             TiLayoutColumnComponent],
  declarations: [TiLayoutContentComponent,
                 TiLayoutContentBodyComponent,
                 TiLayoutHeaderComponent,
                 TiLayoutSectionComponent,
                 TiLayoutContentHeaderComponent,
                 TiLayoutColumnComponent]
})
export class TiLayoutModule {}
export { TiLayoutContentComponent } from './TiLayoutContentComponent';
export { TiLayoutContentBodyComponent } from './TiLayoutContentBodyComponent';
export { TiLayoutHeaderComponent } from './TiLayoutHeaderComponent';
export { TiLayoutSectionComponent } from './TiLayoutSectionComponent';
export { TiLayoutContentHeaderComponent } from './TiLayoutContentHeaderComponent';
export { TiLayoutColumnComponent } from './TiLayoutColumnComponent';
