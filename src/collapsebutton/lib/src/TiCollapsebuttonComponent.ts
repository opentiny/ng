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

import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { TiBaseComponent } from '@opentiny/ng-base';
/**
 * 折叠按钮组件，在高级搜索场景中使用
 *
 */
@Component({
  selector: 'ti-collapsebutton',
  templateUrl: './collapsebutton.html',
  styleUrls: ['./collapsebutton.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-collapsebutton-uncollapsed]': '!collapsed'
  }
})
export class TiCollapsebuttonComponent extends TiBaseComponent {
  /**
   * 是否折叠，true：折叠状态 false：非折叠状态，双向绑定
   */
  @Input() collapsed: boolean = true;
  /**
   * 高级搜索显示的筛选条件数目
   */
  @Input() searchCount: number = 0;
  /**
   *  折叠状态改变事件，用于实现折叠状态双向绑定，也可单独使用
   */
  @Output() readonly collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * @ignore
   * 用户自定义按钮文本
   */
  @ContentChild(TemplateRef) textTemplateRef: TemplateRef<any>;

  /**
   * @ignore
   * 按钮点击事件处理
   */
  public onClickToggle($event: Event): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
