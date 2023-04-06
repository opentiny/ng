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
  ElementRef,
  Input,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
/**
 * 情景引导组件
 */
@Component({
  selector: 'ti-guides',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./guides.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiGuidesComponent extends TiBaseComponent {
  /**
   * 激活项的下标，默认值为 -1 表示无激活状态；显示的步骤下标小于该值为完成项，大于该值则为待办项。
   */
  @Input() activeIndex: number = -1;
  /**
   * @ignore
   * 上次激活项
   */
  public lastActiveIndex: number;
  constructor(protected elementRef: ElementRef, protected renderer2: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, renderer2);
  }

  ngOnInit(): void {
    this.lastActiveIndex = this.activeIndex;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const activeIndexObj: SimpleChange = changes['activeIndex'];
    if (activeIndexObj && !activeIndexObj.isFirstChange()) {
      this.lastActiveIndex = activeIndexObj.previousValue;
    }
  }
}
