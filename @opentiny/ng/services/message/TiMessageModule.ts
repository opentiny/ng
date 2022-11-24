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
import { TiMessageComponent } from './TiMessageComponent';
import { TiContentWrapperComponent } from './TiContentWrapperComponent';
import { TiTranscludeDirective } from './TiTranscludeDirective';
import { TiModalModule } from '../modal/TiModalModule';
import { TiButtonModule } from '../../components/button/TiButtonModule';
import { TiIconModule } from '../../components/icon/TiIconModule';

/**
 * @ignore
 */
@NgModule({
imports: [CommonModule, TiModalModule, TiButtonModule, TiIconModule],
    declarations: [TiMessageComponent, TiTranscludeDirective, TiContentWrapperComponent],
    entryComponents: [TiMessageComponent, TiContentWrapperComponent]
})
export class TiMessageModule {
}
export { TiMessageButtonConfig, TiMessageConfig } from './TiMessageInterface';
export { TiMessageType } from './TiMessageComponent';
