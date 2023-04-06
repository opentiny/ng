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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';

import { TiSelectgroupComponent } from './TiSelectgroupComponent';
export interface TiSelectgroupItem {
  /**
   * 卡片标题
   */
  title: string;
  /**
   * 卡片内容
   */
  content?: string;
  /**
   * 卡片是否禁用
   */
  disabled?: boolean;
  /**
   * 卡片左侧图标名
   */
  iconName: string;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
@Component({
  selector: 'ti-selectitem',
  templateUrl: './selectitem.html',
  styleUrls: ['./selectgroup.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-selectitem-box]': 'true',
    '[class.ti3-selectitem-disabled]': 'item.disabled',
    '[class.ti3-selectitem-checked]': 'isChecked()',
    '[class.ti3-selectitem-template]': 'itemTemplate',
    '(click)': 'onClick()'
  }
})
export class TiSelectitemComponent extends TiBaseComponent {
  /**
   * 数据配置
   */
  @Input() item: TiSelectgroupItem;
  /**
   * 选中标识位置
   */
  @Input() checkPosition: 'right-top' | 'right-bottom' = 'right-top';
  /**
   * 每项模板
   */
  @ContentChild('item', /* TODO: add static flag */ { static: true }) itemTemplate: TemplateRef<any>;

  /**
   * @ignore
   */
  public selectgroup: TiSelectgroupComponent;

  constructor(
    selectgroup: TiSelectgroupComponent,
    protected hostRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostRef, renderer);
    this.selectgroup = selectgroup;
  }

  private valueFn: (item: any) => any = (item: any) => {
    return item[this.selectgroup.valueKey];
  };

  /**
   * @ignore
   */
  public onClick(): void {
    if (this.item.disabled) {
      return;
    }
    // valuekey是否存在，存在时做处理
    const itemValue: any = this.selectgroup.valueKey ? this.valueFn(this.item) : this.item;
    if (this.selectgroup.multiple) {
      // 多选
      this.selectgroup.model = this.selectgroup.model || [];
      const index: number = this.selectgroup.model.indexOf(itemValue);
      if (index > -1) {
        this.selectgroup.model.splice(index, 1);
      } else {
        this.selectgroup.model.push(itemValue);
      }
      this.selectgroup.model = this.selectgroup.model.concat();
    } else {
      // 单选
      this.selectgroup.model = itemValue;
    }
  }
  /**
   * @ignore
   * 是否选中
   */
  public isChecked(): boolean {
    if (this.selectgroup.model) {
      this.changeDetectorRef.markForCheck();
      const itemValue: any = this.selectgroup.valueKey ? this.valueFn(this.item) : this.item;

      return this.selectgroup.multiple ? this.selectgroup.model.includes(itemValue) : this.selectgroup.model === itemValue;
    }
  }
}
