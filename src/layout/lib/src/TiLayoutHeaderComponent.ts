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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * 布局组件，提供整个页面内容区域的布局
 *
 * 头部
 *
 */
@Component({
  selector: 'ti-layout-header',
  template: '<div class="ti3-layout-header-content"><ng-content></ng-content></div>',
  styleUrls: ['./layout-header.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-layout-header]': 'true',
    // 这里用 false 判断是为了兼容业务在ti-layout-header标签上直接添加responsive属性(非input接口)来使用响应式布局。
    // 所以responsive接口的值为true或undefined(以标签属性的方式使用)时都应该是响应式布局，只有为false时才不是响应式布局。
    '[class.ti3-layout-purchase-responsive]': 'responsive !== false'
  }
})
export class TiLayoutHeaderComponent {
  /**
   * 是否为响应式布局
   */
  @Input() responsive: boolean = false;
}
