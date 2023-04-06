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
import { TiDropModule } from '@opentiny/ng-drop';
import { TiLocaleModule } from '@opentiny/ng-locale';
import { TiDatetimeRangeComponent } from './TiDatetimeRangeComponent';
import { TiButtonModule } from '@opentiny/ng-button';
import { TiDatePanelModule } from '@opentiny/ng-datepanel';
import { TiDateEditModule } from '@opentiny/ng-dateedit';
import { TiTimeModule } from '@opentiny/ng-time';
import { TiTextModule } from '@opentiny/ng-text';
import { TiDateDominatorModule } from '@opentiny/ng-datedominator';
import { TiSelectModule } from '@opentiny/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiLocaleModule,
    TiDropModule,
    TiButtonModule,
    TiDatePanelModule,
    TiDateEditModule,
    TiTimeModule,
    TiTextModule,
    TiDateDominatorModule,
    TiSelectModule
  ],
  exports: [TiDatetimeRangeComponent],
  declarations: [TiDatetimeRangeComponent]
})
export class TiDatetimeRangeModule {}
export { TiDatetimeRangeComponent } from './TiDatetimeRangeComponent';
