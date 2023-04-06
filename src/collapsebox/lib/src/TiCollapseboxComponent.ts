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

import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
/**
 * 折叠框组件 collapsebox
 *
 * collapsebox组件是一个带有关闭操作的容器类组件，服务可自定义内容。
 *
 */
@Component({
  selector: 'ti-collapsebox',
  templateUrl: './collapsebox.html',
  styleUrls: ['./collapsebox.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiCollapseboxComponent extends TiBaseComponent {
  /**
   * @ignore
   * 设置折叠框默认展开
   */
  collapsed: boolean = false;
  /**
   * 控制关闭按钮的显示/隐藏
   */
  @Input() closeable: boolean = true;
  /**
   * 折叠框在关闭时触发的回调
   */
  @Output() readonly close: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @ignore
   */
  public onClickClose(event: Event): void {
    if (this.close.observers.length > 0) {
      this.close.emit();
    } else {
      this.collapsed = true;
    }
  }
}
