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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TiNavComponent } from './TiNavComponent';
import { TiNavLeftComponent } from './TiNavLeftComponent';
import { TiNavMenuComponent } from './TiNavMenuComponent';
import { TiNavRightComponent } from './TiNavRightComponent';

@NgModule({
  imports: [CommonModule],
  exports: [TiNavComponent, TiNavLeftComponent, TiNavRightComponent, TiNavMenuComponent],
  declarations: [TiNavComponent, TiNavLeftComponent, TiNavRightComponent, TiNavMenuComponent]
})
export class TiNavModule {}

export { TiNavComponent } from './TiNavComponent';
export { TiNavLeftComponent } from './TiNavLeftComponent';
export { TiNavRightComponent } from './TiNavRightComponent';
export { TiNavMenuComponent } from './TiNavMenuComponent';
export { TiNavMenuItem } from './interface';
