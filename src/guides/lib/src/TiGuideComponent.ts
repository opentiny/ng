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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';

import { TiGuidesComponent } from './TiGuidesComponent';
/**
 * TiGuideComponent 是单个引导模块组件
 */
@Component({
  selector: 'ti-guide',
  templateUrl: './guide.html',
  styleUrls: ['./guide.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-guide-card-container]': 'true',
    '[class.ti3-guide-card-undo]': 'isUndo(cardIndex)',
    '[class.ti3-guide-card-active]': 'isActive(cardIndex)',
    '[class.ti3-guide-card-done]': 'isDone(cardIndex)',
    '[class.ti3-guide-card-error]': "type === 'error'"
  }
})
export class TiGuideComponent extends TiBaseComponent {
  constructor(
    protected elementRef: ElementRef,
    protected renderer2: Renderer2,
    private guidesComp: TiGuidesComponent,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer2);
  }
  /**
   * 当前步骤的状态，默认值是 'info'
   */
  @Input() type: 'info' | 'error' = 'info';

  /**
   * @ignore
   * 下标值
   */
  public cardIndex: number = -1;
  /**
   * @ignore
   * 是否含有body
   */
  public hasBody: boolean = false;

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.setCardIndex();
    this.cardIndex = this.nativeElement.cardIndex;
  }

  ngDoCheck(): void {
    // guides组件当前激活项变化时，需要手动更新，否则无法触发模板上绑定的事件并更新视图
    if (this.guidesComp.activeIndex !== this.guidesComp.lastActiveIndex) {
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * @ignore
   * 设置步骤标志
   */
  private setCardIndex(): void {
    const cardNum: number = this.guidesComp.nativeElement.children.length;
    for (let i: number = 0; i < cardNum; i++) {
      this.guidesComp.nativeElement.children[i].cardIndex = i;
      if (cardNum <= 2) {
        this.renderer.setStyle(this.guidesComp.nativeElement.children[i], 'max-width', '445px');
      }
    }
  }

  /**
   * @ignore
   * 是否待办项
   */
  public isUndo(index: number): boolean {
    return this.guidesComp.activeIndex >= 0 && index > this.guidesComp.activeIndex;
  }
  /**
   * @ignore
   * 是否当前项
   */
  public isActive(index: number): boolean {
    return this.guidesComp.activeIndex >= 0 && index === this.guidesComp.activeIndex;
  }
  /**
   * @ignore
   * 是否已完成
   */
  public isDone(index: number): boolean {
    return this.guidesComp.activeIndex >= 0 && index < this.guidesComp.activeIndex;
  }
  /**
   * @ignore
   * 是否含有间距
   */
  public hasSpace(index: number): boolean {
    return this.isActive(index) && this.hasBody;
  }
}
