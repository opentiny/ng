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
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiTimeComponent } from './TiTimeComponent';
import { TiDateDominatorModule } from '../datedominator/TiDateDominatorModule';
import { TiDropModule } from '../drop/TiDropModule';
import { TiListModule } from '../list/TiListModule';
import { TiLocaleModule } from '../../locale/TiLocaleModule';
import { TiTextModule } from '../text/TiTextModule';
import { TiButtonModule } from '../button/TiButtonModule';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TiButtonModule,
        TiDropModule,
        TiListModule,
        TiDateDominatorModule,
        TiLocaleModule,
        TiTextModule
    ],
    exports: [ TiTimeComponent ],
    declarations: [ TiTimeComponent ]
})

export class TiTimeModule {
}
export { TiTimeComponent } from './TiTimeComponent';
