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
 * Nav 顶部导航组件
 *
 * 提供页面顶部导航组件，包含了logo区域、菜单区域、操作区域
 */
@Component({
  selector: 'ti-nav',
  templateUrl: 'nav.html',
  styleUrls: ['./nav.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ti3-nav',
    '[class.ti3-nav-light]': 'theme === "light"',
    '[class.ti3-nav-dark]': 'theme === "dark"',
  },
})
export class TiNavComponent {
  /**
   * 主题，light|dark 默认light
   */
  @Input() theme: 'light' | 'dark' = 'light';
}
