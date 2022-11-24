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
import { Component, ViewEncapsulation } from '@angular/core';

/**
 *  @ignore
 *
 *  栅格样式组件
 *
 *  10.0.4及之前的版本grid.less是全局的。10.1.0版本为了实现样式按需加载，将grid.less封装在一个组件模块，所以该组件实际只提供了样式。
 *
 * 使用示例在 card 组件示例中
 *
 */
@Component({
    selector: '.ti-row', // 兼容延用栅格样式选择器
    template: '<ng-content></ng-content>',
    styleUrls: ['./grid.less'],
    encapsulation: ViewEncapsulation.None
})
export class TiGridComponent { }
