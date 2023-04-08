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
import { TiTabsComponent } from './TiTabsComponent';
import { TiTabComponent } from './TiTabComponent';
import { TiTabHeaderComponent } from './TiTabHeaderComponent';
import { TiIncludeModule } from '@opentiny/ng-include';
import { TiRendererModule } from '@opentiny/ng-renderer';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiDroplistModule } from '@opentiny/ng-droplist';

@NgModule({
  imports: [CommonModule, FormsModule, TiDroplistModule, TiIconModule, TiIncludeModule, TiRendererModule],
  exports: [TiTabsComponent, TiTabComponent, TiTabHeaderComponent],
  declarations: [TiTabsComponent, TiTabComponent, TiTabHeaderComponent]
})
export class TiTabModule {}
export { TiTabComponent } from './TiTabComponent';
export { TiTabsComponent } from './TiTabsComponent';
export { TiTabHeaderComponent } from './TiTabHeaderComponent';
