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
 * 组件描述
 */
@Component({
  selector: 'ti-badge',
  templateUrl: 'badge.html',
  styleUrls: ['badge.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-badge-container]': 'true'
  }
})
export class TiBadgeComponent {
  /**
   * 指定的数据信息
   */
  @Input() value: number | string;

  /**
   * 标识的显示状态
   */
  @Input() show: boolean = true;
}
