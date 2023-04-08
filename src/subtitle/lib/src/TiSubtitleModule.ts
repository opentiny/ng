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
import { RouterModule } from '@angular/router';

import { TiSubtitleComponent, TiSubtitleListScrollLoad } from './TiSubtitleComponent';
import { TiOverflowModule } from '@opentiny/ng-overflow';
import { TiSelectModule } from '@opentiny/ng-select';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiTipModule } from '@opentiny/ng-tip';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, TiOverflowModule, TiSelectModule, TiTipModule, TiIconModule],
  exports: [TiSubtitleComponent],
  declarations: [TiSubtitleComponent]
})
export class TiSubtitleModule {}
export { TiSubtitleComponent, TiSubtitleItem, TiSubtitleListScrollLoad } from './TiSubtitleComponent';
