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
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';
import { TiIconModule } from '../icon/TiIconModule';

import { TiAccordionComponent } from './TiAccordionComponent';
import { TiAccordionItemComponent } from './TiAccordionItemComponent';
import { TiAccordionHeadComponent } from './TiAccordionHeadComponent';

@NgModule({
  imports: [CommonModule, TiIconModule, TiOutlineModule],
  exports: [TiAccordionComponent, TiAccordionItemComponent, TiAccordionHeadComponent],
  declarations: [TiAccordionComponent, TiAccordionItemComponent, TiAccordionHeadComponent]
})
export class TiAccordionModule {}

export { TiAccordionComponent } from './TiAccordionComponent';
export { TiAccordionItemComponent, TiAccordionHeadClickEvent } from './TiAccordionItemComponent';
export { TiAccordionHeadComponent } from './TiAccordionHeadComponent';
