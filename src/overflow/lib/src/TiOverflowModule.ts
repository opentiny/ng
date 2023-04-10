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
import { TiOverflowDirective } from './TiOverflowDirective';
import { TiOverflowMaxlineDirective } from './TiOverflowMaxlineDirective';
import { TiOverflowServiceModule } from './TiOverflowServiceModule';

@NgModule({
  imports: [TiOverflowServiceModule],
  exports: [TiOverflowDirective, TiOverflowMaxlineDirective],
  declarations: [TiOverflowDirective, TiOverflowMaxlineDirective]
})
export class TiOverflowModule {}
export { TiOverflowDirective } from './TiOverflowDirective';
export { TiOverflowMaxlineDirective } from './TiOverflowMaxlineDirective';
