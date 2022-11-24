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
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef
} from '@angular/core';
import { TiItemComponent } from './TiItemComponent';
/**
 * 本组件嵌在 tiItem 中使用，包裹着单个表单条目中 label显示的dom片段
 */
@Component({
  selector: 'ti-item-label',
  templateUrl: './formfield-item-label.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TiItemLabelComponent implements AfterContentInit {
    constructor(private item: TiItemComponent, private elementRef: ElementRef) {}

    ngAfterContentInit(): void {
      this.item.label = this.elementRef.nativeElement;
      // onpush策略 无法通知formfiled值变更，需要手动使formfiled强制变更检测一次
      this.item.formfield.changeDetector.detectChanges();
    }
}
