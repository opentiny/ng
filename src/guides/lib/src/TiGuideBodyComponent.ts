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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiRenderer } from '@opentiny/ng-renderer';

import { TiGuideComponent } from './TiGuideComponent';
import { TiGuidesComponent } from './TiGuidesComponent';
/**
 * TiGuideBodyComponent 是单个引导模块的body区域
 */
@Component({
  selector: 'ti-guide-body',
  templateUrl: './guide-body.html',
  styleUrls: ['./guide-body.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiGuideBodyComponent extends TiBaseComponent {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private tiRenderer: TiRenderer,
    private guideComp: TiGuideComponent,
    private guidesComp: TiGuidesComponent,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer2);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.guideComp.hasBody = true;
    this.tiRenderer.insertAfter(this.nativeElement, this.guidesComp.nativeElement);
  }

  ngDoCheck(): void {
    // guides组件当前激活项变化时，需要手动更新，否则无法触发模板上绑定的事件并更新视图
    if (this.guidesComp.activeIndex !== this.guidesComp.lastActiveIndex) {
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * @ignore
   * 展示激活项body
   */
  public showActiveBody(): boolean {
    return this.guidesComp.activeIndex === this.guideComp.cardIndex;
  }
}
