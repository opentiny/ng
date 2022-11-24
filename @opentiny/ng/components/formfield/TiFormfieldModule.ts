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
import { TiIncludeModule } from '../../directives/include/TiIncludeModule';
import { TiIconModule } from '../icon/TiIconModule';
import { TiFormfieldComponent } from './TiFormfieldComponent';
import { TiItemComponent } from './TiItemComponent';
import { TiItemLabelComponent } from './TiItemLabelComponent';
import { TiButtonItemComponent } from './TiButtonItemComponent';

@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    TiIncludeModule
  ],
  exports: [TiFormfieldComponent,
            TiItemComponent,
            TiItemLabelComponent,
            TiButtonItemComponent],
  declarations: [TiFormfieldComponent,
                 TiItemComponent,
                 TiItemLabelComponent,
                 TiButtonItemComponent]
})
export class TiFormfieldModule {
}
export { TiFormfieldComponent } from './TiFormfieldComponent';
export { TiItemComponent } from './TiItemComponent';
export { TiItemLabelComponent } from './TiItemLabelComponent';
export { TiButtonItemComponent } from './TiButtonItemComponent';
