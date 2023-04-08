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
import { TiPositionType } from '@opentiny/ng-utils';
import packageInfo from '../package.json';
// TODO: 等待规范统一，可能只保留方形tag
// TODO: hover时是否需要高亮，选中是否高亮。增加selectable接口，表示是否可以选中。
// TODO: 禁用时是否显示叉号？规范和tiny2不一致。
// TODO: 禁用时，不发出原生click事件。
/**
 * Tag标签组件，支持显示自定义内容，和删除事件通知。
 *
 */
@Component({
  selector: 'ti-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag-rect.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-multiselect-box-cell]': 'true',
    '[class.ti3-multiselect-option-disabled]': 'disabled',
    '[style.maxWidth]': 'maxWidth'
  }
})
export class TiTagComponent extends TiBaseComponent {
  /**
   * 是否禁用
   */
  @Input() disabled: boolean = false;
  /**
   * @ignore
   * 选中项文本超出时tip展开方向
   */
  @Input() selectedTipPosition: TiPositionType = 'auto';
  /**
   * @ignore
   * 最大宽度，TpSearchbox 使用
   */
  @Input() maxWidth: string;
  /**
   * 点击删除按钮时触发的回调
   */
  @Output() readonly delete: EventEmitter<any> = new EventEmitter<any>();
  protected versionInfo: string = super.getVersion(packageInfo);
  /**
   * @ignore
   * @param $event
   */
  public onClickDelete($event: MouseEvent): void {
    if (this.disabled) {
      return;
    }
    $event.stopPropagation(); // 阻止冒泡，阻止了Tag整体的onClick事件，也阻止Tag之外接收到Click。
    this.delete.emit();
  }
  /**
   * 删除 Tag 标签元素
   */
  public remove(): void {
    this.renderer.removeChild(this.renderer.parentNode(this.nativeElement), this.nativeElement);
  }
}
