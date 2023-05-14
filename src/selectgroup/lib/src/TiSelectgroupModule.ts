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
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiIconModule } from '@opentiny/ng-icon';

import { TiSelectgroupComponent } from './TiSelectgroupComponent';
import { TiSelectitemComponent } from './TiSelectitemComponent';

@NgModule({
  imports: [CommonModule, TiOverflowModule, TiIconModule],
  exports: [TiSelectgroupComponent, TiSelectitemComponent],
  declarations: [TiSelectgroupComponent, TiSelectitemComponent]
})
export class TiSelectgroupModule {}
export { TiSelectgroupComponent } from './TiSelectgroupComponent';
export { TiSelectitemComponent, TiSelectgroupItem } from './TiSelectitemComponent';