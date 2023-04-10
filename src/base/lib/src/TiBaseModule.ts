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
import { TiBaseComponent } from './TiBaseComponent';
import { TiFormComponent } from './TiFormComponent';
import { TiRadioBaseComponent } from './TiRadioBaseComponent';
import { TiWholeComponent } from './TiWholeComponent';
import { TiAutofocusComponent } from './TiAutofocusComponent';
// 在使用tiny npm包生产环境编辑时，要求基类也注册。
/**
 * @ignore
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [TiBaseComponent, TiFormComponent, TiRadioBaseComponent, TiWholeComponent, TiAutofocusComponent]
})
export class TiBaseModule {}
export { TiBaseComponent } from './TiBaseComponent';
export { TiFormComponent } from './TiFormComponent';
export { TiRadioBaseComponent } from './TiRadioBaseComponent';
export { TiWholeComponent } from './TiWholeComponent';
export { TiAutofocusComponent } from './TiAutofocusComponent';
