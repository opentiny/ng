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
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TiOverflowService } from './TiOverflowService';
import { TiPositionType } from '@opentiny/ng-utils';

/**
 * 超长情况下文本处理出...并tip提示
 *
 */
@Directive({
  selector: '[tiOverflow]:not([maxLine])'
})
export class TiOverflowDirective implements OnInit {
  /**
   * 配置宿主元素支持文本过长提示功能，不需要配置属性值，存在该属性即可
   */
  @Input() tiOverflow: any;
  /**
   * 配置文本过长时显示的 tip 内容，默认为宿主元素文本
   */
  @Input() tiTipContent: string;
  /**
   * 配置文本过长时显示的 tip 方向
   */
  @Input() tiTipPosition: TiPositionType;
  /**
   * 配置文本过长时显示的 tip 的最大宽度
   */
  @Input() tiTipMaxWidth: string = '276px';
  /**
   * @ignore
   * 决定tip水平方向位置的宿主元素配置
   */
  @Input() tiTipHostEleX: Element;
  private overflowRef: any;
  constructor(private ele: ElementRef, private overflowService: TiOverflowService) {}
  ngOnInit(): void {
    this.overflowRef = this.overflowService.create(this.ele.nativeElement, {
      tipContent: this.tiTipContent,
      tipPosition: this.tiTipPosition,
      tipHostEleX: this.tiTipHostEleX,
      tipMaxWidth: this.tiTipMaxWidth
    });
  }
  // 服务方式的overflow无法自销毁，因此此处在组件销毁时销毁服务方式生成的组件实例
  ngOnDestroy(): void {
    if (this.overflowRef) {
      this.overflowRef.destroy();
    }
  }
}
