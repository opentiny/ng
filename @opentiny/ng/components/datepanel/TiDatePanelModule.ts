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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TiDatePanelComponent } from './TiDatePanelComponent';
import { TiIconModule } from '../icon/TiIconModule';
import { TiListModule } from '../list/TiListModule';
import { TiLocaleModule } from '../../locale/TiLocaleModule';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiIconModule,
    TiListModule,
    TiLocaleModule
  ],
  exports: [TiDatePanelComponent],
  declarations: [TiDatePanelComponent]
})

export class TiDatePanelModule {
}
export { TiDatePanelComponent, TiDatePanel, TiPickerHeadText, TiDateValueAndState, TiYearRange } from './TiDatePanelComponent';
