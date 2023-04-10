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

import { Component, Input, TemplateRef } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiPositionType } from '@opentiny/ng-utils';

export interface TiRightsItem {
  /**
   * 显示权益标题
   */
  label: string;
  /**
   * tip提示的内容
   */
  tip?: string | TemplateRef<any>;
  /**
   * tip提示方位
   */
  tipPosition?: TiPositionType;
  /**
   * 权益类型,默认显示正向权益类型，'noSupport'为负向类型
   */
  type?: 'support' | 'noSupport';
  /**
   * 允许多余的属性字段
   */
  [propName: string]: any;
}
/**
 * 组件描述
 */
@Component({
  selector: 'ti-rights',
  templateUrl: 'rights.html',
  styleUrls: ['rights.less', './icon.less']
})
export class TiRightsComponent extends TiBaseComponent {
  /**
   * 权益总数据
   */
  @Input() items: Array<TiRightsItem>;
  /**
   * 权益级别，分为页面级别(page)和参数级别(param)
   */
  @Input() type: 'page' | 'param' = 'param';

  ngOnInit(): void {
    super.ngOnInit();
    // 权益数量不超过6个
    if (this.items.length >= 6) {
      this.items = this.items.slice(0, 5);
    }
  }
}
