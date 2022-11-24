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
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TiRadioBaseComponent } from '../base/TiBaseModule';

/**
 * radio单选框组件
 *
 * radio组件完全基于原生input实现，但是需要在input中添加tiRadio属性
 *
 */
@Component({
    selector: '[tiRadio]', // 指定组件名称
    templateUrl: './radio.html', // 指定组件模板
    styleUrls: ['./radio.less'], // 样式路径
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // 设置组件的试图包装选项：三个值Emulated(默认值)，Native，None
})
export class TiRadioComponent extends TiRadioBaseComponent {
    /**
     *  @ignore
     */
    protected canChange(): boolean {
        return !this.nativeElement.checked;
    }
}
