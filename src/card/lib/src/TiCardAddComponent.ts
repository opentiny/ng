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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

/**
 *  特殊卡片组件，添加卡片组件
 *
 */
@Component({
  selector: 'ti-card-add',
  templateUrl: './card-add.html',
  styleUrls: ['./card-add.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-card-add-disabled]': 'disabled',
    '[class.ti3-card-add-active]': 'active',
    '[attr.tabindex]': 'disabled? "-1":"0"'
  }
})
export class TiCardAddComponent extends TiBaseComponent {
  /**
   * 卡片是否禁用
   */
  @Input() disabled: boolean = false;
  /**
   * 卡片激活选中状态
   */
  @Input() active: boolean = false;
  /**
   * 点击加号添加卡片时触发的回调
   */
  @Output() readonly add: EventEmitter<any> = new EventEmitter<any>();

  protected versionInfo: string = super.getVersion(packageInfo);

  /**
   * @ignore
   * 加号点击回调
   */
  public onClick($event: Event): void {
    if (this.disabled) {
      return;
    }
    this.add.emit($event);
  }
}
