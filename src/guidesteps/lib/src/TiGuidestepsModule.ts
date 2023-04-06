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

import { TiGuidestepsComponent } from './TiGuidestepsComponent';
import { TiGuidestepComponent } from './TiGuidestepComponent';
import { TiGuidestepHeaderComponent } from './TiGuidestepHeaderComponent';
import { TiGuidestepContentComponent } from './TiGuidestepContentComponent';

@NgModule({
  imports: [CommonModule],
  exports: [TiGuidestepsComponent, TiGuidestepComponent, TiGuidestepHeaderComponent, TiGuidestepContentComponent],
  declarations: [TiGuidestepsComponent, TiGuidestepComponent, TiGuidestepHeaderComponent, TiGuidestepContentComponent]
})
export class TiGuidestepsModule {}
export { TiGuidestepsComponent } from './TiGuidestepsComponent';
export { TiGuidestepComponent } from './TiGuidestepComponent';
export { TiGuidestepHeaderComponent } from './TiGuidestepHeaderComponent';
export { TiGuidestepContentComponent } from './TiGuidestepContentComponent';
