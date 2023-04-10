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
import { TiTipDirective } from './TiTipDirective';
import { TiTipServiceModule } from './TiTipServiceModule';
// 引用TiTipModule，可以使用Tip指令和Tip服务
@NgModule({
  imports: [CommonModule, TiTipServiceModule],
  exports: [TiTipDirective],
  declarations: [TiTipDirective]
})
export class TiTipModule {}
export { TiTipDirective } from './TiTipDirective';
