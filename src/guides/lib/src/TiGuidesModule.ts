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

import { TiGuidesComponent } from './TiGuidesComponent';
import { TiGuideComponent } from './TiGuideComponent';
import { TiGuideHeaderComponent } from './TiGuideHeaderComponent';
import { TiGuideContentComponent } from './TiGuideContentComponent';
import { TiGuideBodyComponent } from './TiGuideBodyComponent';

@NgModule({
  imports: [CommonModule, TiIconModule],
  exports: [TiGuidesComponent, TiGuideComponent, TiGuideHeaderComponent, TiGuideContentComponent, TiGuideBodyComponent],
  declarations: [TiGuidesComponent, TiGuideComponent, TiGuideHeaderComponent, TiGuideContentComponent, TiGuideBodyComponent]
})
export class TiGuidesModule {}
export { TiGuidesComponent } from './TiGuidesComponent';
export { TiGuideComponent } from './TiGuideComponent';
export { TiGuideHeaderComponent } from './TiGuideHeaderComponent';
export { TiGuideContentComponent } from './TiGuideContentComponent';
export { TiGuideBodyComponent } from './TiGuideBodyComponent';
