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
import { TiIconModule } from '../icon/TiIconModule';
import { TiRendererModule } from '../../services/renderer/TiRendererModule';
import { TiLeftmenuComponent } from './TiLeftmenuComponent';
import { TiLeftmenuHeadComponent } from './TiLeftmenuHeadComponent';
import { TiLeftmenuGroupItemComponent } from './TiLeftmenuGroupItemComponent';
import { TiLeftmenuGroupComponent } from './TiLeftmenuGroupComponent';
import { TiLeftmenuLevel1Component } from './TiLeftmenuLevel1Component';
import { TiLeftmenuItemComponent } from './TiLeftmenuItemComponent';
import { TiLeftmenuLevel2Component } from './TiLeftmenuLevel2Component';
import { TiLeftmenuFootComponent } from './TiLeftmenuFootComponent';
import { TiOutlineModule } from '../../directives/outline/TiOutlineModule';

@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    TiRendererModule,
    TiOutlineModule
  ],
  exports: [TiLeftmenuComponent,
            TiLeftmenuHeadComponent,
            TiLeftmenuLevel1Component,
            TiLeftmenuItemComponent,
            TiLeftmenuLevel2Component,
            TiLeftmenuGroupComponent,
            TiLeftmenuGroupItemComponent,
            TiLeftmenuFootComponent],
  declarations: [TiLeftmenuComponent,
                 TiLeftmenuHeadComponent,
                 TiLeftmenuLevel1Component,
                 TiLeftmenuItemComponent,
                 TiLeftmenuLevel2Component,
                 TiLeftmenuGroupComponent,
                 TiLeftmenuGroupItemComponent,
                 TiLeftmenuFootComponent]
})
export class TiLeftmenuModule {
}
export * from './TiLeftmenuComponent';
export { TiLeftmenuComponent, TiLeftmenuItem } from './TiLeftmenuComponent';
export { TiLeftmenuHeadComponent } from './TiLeftmenuHeadComponent';
export { TiLeftmenuLevel1Component } from './TiLeftmenuLevel1Component';
export { TiLeftmenuItemComponent } from './TiLeftmenuItemComponent';
export { TiLeftmenuLevel2Component } from './TiLeftmenuLevel2Component';
export { TiLeftmenuGroupComponent } from './TiLeftmenuGroupComponent';
export { TiLeftmenuGroupItemComponent } from './TiLeftmenuGroupItemComponent';
export { TiLeftmenuFootComponent } from './TiLeftmenuFootComponent';
