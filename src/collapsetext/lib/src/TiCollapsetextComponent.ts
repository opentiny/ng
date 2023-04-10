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

/**
 * Collapsetext组件用于显示 标题下展/内容下展，状态可折叠或展开
 */
@Component({
  selector: 'ti-collapsetext',
  templateUrl: 'collapsetext.html',
  styleUrls: ['collapsetext.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiCollapsetextComponent {
  /**
   * 显示的文本内容
   */
  @Input() label: string;
  /**
   * 下展的类型
   */
  @Input() type: 'title' | 'content' = 'title';
  /**
   * 是否高亮
   */
  @Input() highlight: boolean = false;
  /**
   * 是否折叠
   */
  @Input() collapsed: boolean = true;
  /**
   * 折叠状态变化时触发的回调，参数：折叠状态 collapsed 的值
   */
  @Output() readonly collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @ignore
   * 切换展开状态方法
   */
  public changeCollapse($event: Event): void {
    this.collapsed = !this.collapsed;
    // 通知collapsed展开状态，确保collapsed状态双向绑定功能正常
    this.collapsedChange.emit(this.collapsed);
  }
}
