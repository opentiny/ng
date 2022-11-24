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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TiSearchboxComponent } from './TiSearchboxComponent';
import { TiFormComponent } from '../base/TiBaseModule';
/**
 * @ignore
 */
@Component({
    selector: 'ti-searchbox-notsearch',
    templateUrl: './searchbox.html',
    styleUrls: ['./searchbox.less', './searchbox-notsearch.less',  '../text/text.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    providers: [ TiFormComponent.getValueAccessor(TiSearchboxNotsearchComponent) ],
    host: {
        '[class.ti3-searchbox-container]': 'true',
        '(blur)': 'onBlur()',
        '(focus)': 'onFocus()'
    }
    })
export class TiSearchboxNotsearchComponent extends TiSearchboxComponent {
    onInputEnter(): void {
        event.preventDefault(); // 不做搜索等处理
    }
    onSearch(): void {
        event.preventDefault(); // 点击搜索图标时，阻止默认行为
    }
}
