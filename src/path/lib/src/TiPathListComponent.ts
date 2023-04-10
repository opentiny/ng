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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';

export interface TiPathListItem {
  /**
   * 路径项目内容
   */
  label: string;
  /**
   * 路径项目类型
   */
  type: 'document' | 'file';
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}

/**
 * pathList组件用于显示路径列表
 */
@Component({
  selector: 'ti-path-list',
  templateUrl: 'path-list.html',
  styleUrls: ['path-list.less']
})
export class TiPathListComponent extends TiBaseComponent {
  /**
   * 路径列表数据项
   */
  @Input() items: Array<TiPathListItem>;
  /**
   * 路径项目是否可删除
   */
  @Input() clearable: boolean = false;
  /**
   * 当路径项目删除时触发的回调
   */
  @Output() readonly clear: EventEmitter<TiPathListItem> = new EventEmitter<TiPathListItem>();

  /**
   * @ignore
   * 清除列表项
   */
  public clearItem(item: TiPathListItem): void {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    // 触发路径项目删除 clear 事件
    this.clear.emit(item);
  }
}
