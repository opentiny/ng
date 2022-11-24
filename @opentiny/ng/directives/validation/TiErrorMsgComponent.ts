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
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TiBaseComponent } from '../../components/base/TiBaseModule';
/**
 * @ignore
 */
@Component({
    selector: 'ti-error-msg',
    template: `
        <span class="ti3-error-icon-bg">
            <span class='ti3-error-icon ti3-icon ti3-icon-alert-warn'></span>
        </span>
        <span [innerHTML]="errorMessage"></span>
    `,
    styleUrls: ['./errorMsg.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // 由于样式文件中存在全局样式，因此使用该方式
    host: {
        '[class.ti3-unifyvalid-error-container]': '!appendToTip',
        '[class.ti3-unifyvalid-tip-error-container]': 'true'
    }
})
export class TiErrorMsgComponent extends TiBaseComponent {
    @Input() errorMessage: string;
    @Input() appendToTip: boolean;
}
