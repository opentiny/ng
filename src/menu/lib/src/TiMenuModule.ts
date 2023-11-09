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
import { TiDropModule } from '@opentiny/ng-drop';
import { TiTipModule } from '@opentiny/ng-tip';
import { TiListModule } from '@opentiny/ng-list';
import { TiMenuComponent } from './TiMenuComponent';
import { TiMenuListComponent } from './TiMenuListComponent';

@NgModule({
  imports: [CommonModule, TiDropModule, TiTipModule, TiListModule],
  exports: [TiMenuComponent, TiMenuListComponent],
  declarations: [TiMenuComponent, TiMenuListComponent]
})
export class TiMenuModule {}
export { TiMenuComponent } from './TiMenuComponent';
export { TiMenuListComponent } from './TiMenuListComponent';
export { TiMenuItem } from './TiMenuItem';
