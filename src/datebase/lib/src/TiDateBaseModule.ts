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
import { TiDateBaseComponent } from './TiDateBaseComponent';
// 在使用tiny npm包生产环境编辑时，要求基类也注册。
/**
 * @ignore
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [TiDateBaseComponent]
})
export class TiDateBaseModule {}
export { TiDateBaseComponent, TimeOptions, TiPicker, TiDatetimeFormat, TiDateValue, TiDateCustomizeOptions } from './TiDateBaseComponent';
