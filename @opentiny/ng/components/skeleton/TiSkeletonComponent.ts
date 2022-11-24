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
import { Component, Input } from '@angular/core';
/**
 * 骨架屏组件
 *
 */
@Component({
    selector: 'ti-skeleton',
    templateUrl: 'skeleton.html',
    styleUrls: ['skeleton.less'],
    host: {
        '[class.ti3-skeleton-container]': 'true'
    }
})

export class TiSkeletonComponent {
    /**
     * 是否显示标题
     */
    @Input() title: boolean = true;
    /**
     * 类型
     */
    @Input() type: 'rows' | 'block' = 'rows';
}
