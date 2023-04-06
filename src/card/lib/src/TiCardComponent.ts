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
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

/**
 * 卡片组件
 *
 */
@Component({
  selector: 'ti-card',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./card.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-card-disabled]': 'disabled',
    '[class.ti3-card-active]': 'active',
    '[attr.tabindex]': 'disabled? "-1":"0"'
  }
})
export class TiCardComponent extends TiBaseComponent {
  /**
   * 卡片是否禁用
   */
  @Input() disabled: boolean = false;
  /**
   * 卡片是否激活
   */
  @Input() active: boolean = false;

  protected versionInfo: string = super.getVersion(packageInfo);
}
