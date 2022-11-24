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
import { Directive, forwardRef } from '@angular/core';
import { CdkFixedSizeVirtualScroll, FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

/**
 * @ignore
 */
export function fixedSizeVirtualScrollStrategyFactory(
          fixedSizeDir: TiTableFixedSizeVirtualScrollDirective): FixedSizeVirtualScrollStrategy {
  return fixedSizeDir._scrollStrategy;
}

/**
 * @ignore
 * 配合表格的表体虚拟滚动容器组件 TiTableVirtualScrollViewportComponent 来使用的指令。
 *
 * 主要是重新定义了指令选择器selector。
 *
 *
 * 相关代码参考 @angular/cdk/scrolling 提供的 CdkFixedSizeVirtualScroll 指令。
 *
 */
@Directive({
  selector: '.ti3-table-container[itemSize]',
  providers: [{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: fixedSizeVirtualScrollStrategyFactory,
    deps: [forwardRef(() => TiTableFixedSizeVirtualScrollDirective)]
  }]
})
export class TiTableFixedSizeVirtualScrollDirective extends CdkFixedSizeVirtualScroll { }
