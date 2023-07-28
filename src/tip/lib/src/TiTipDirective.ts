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
import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TiPositionType, Util } from '@opentiny/ng-utils';
import { TiTipRef, TiTipShowInfo } from './TiTipInterface';
import { TiTipService } from './TiTipService';

// TODO:exportAs: 'tiTip' 可去除？
/**
 * tip提供了两种使用方式:
 * 1.服务方式：[TiTipService]{@link ../injectables/TiTipService.html}
 *
 * 2.指令方式（见如下说明）
 *
 */
@Directive({
  selector: '[tiTip]',
  exportAs: 'tiTip'
})
export class TiTipDirective implements OnInit, OnDestroy {
  /**
   * tip 提示方向
   */
  @Input() tiTipPosition?: TiPositionType = 'auto';
  /**
   * tip 最大宽度
   */
  @Input() tiTipMaxWidth: string = '276px';
  /**
   * 是否带箭头
   */
  @Input() tiTipHasArrow?: boolean = true;
  /**
   * tip 显示内容对应的上下文，tip内容类型为 templateRef 或 Component 形式时会用到该参数，参数为自定义对象形式
   *
   * 注意：指令形式时才会使用到该参数
   */
  @Input() tiTipContext?: any;
  /**
   * tip 触发行为，默认支持鼠标移入时显示
   *
   * 注意：指令形式时才会使用到该参数
   */
  @Input() tiTipTrigger?: 'mouse' | 'manual' = 'mouse';
  /**
   * @ignore
   * 决定tip水平方向位置的宿主元素配置
   */
  @Input() tiTipHostEleX: Element;
  /**
   * z-index 属性值
   */
  @Input() tiTipZIndex: number;
  protected tipInstance: TiTipRef;
  private hostEle: Element;
  private _tiTip: string | TemplateRef<any> | any;
  constructor(private tipService: TiTipService, hostEleRef: ElementRef) {
    this.hostEle = hostEleRef.nativeElement;
  }

  private static isInValidValue(value: string | TemplateRef<any> | any): boolean {
    return Util.isUndefined(value) || Util.isNull(value) || value === '';
  }
  ngOnInit(): void {
    // 初始创建tip实例
    this.tipInstance = this.tipService.create(this.hostEle, {
      position: this.tiTipPosition,
      maxWidth: this.tiTipMaxWidth,
      hasArrow: this.tiTipHasArrow,
      hostEleX: this.tiTipHostEleX,
      zIndex: this.tiTipZIndex,
      trigger: this.tiTipTrigger || 'mouse', // 指令方式，默认为'mouse'
      showFn: (): TiTipShowInfo => {
        if (!this.tipInstance || TiTipDirective.isInValidValue(this._tiTip)) {
          return;
        }

        return { content: this._tiTip, context: this.tiTipContext };
      }
    });
  }
  /**
   * tip显示内容配置
   *
   * 类型：string | TemplateRef<any> | any
   *
   * 传入string类型时支持html字符串片段，也已做安全处理。
   */
  @Input()
  // 监听tip值的变化，当tip为''或undefined情况下，直接隐藏tip组件
  /**
   * @ignore
   */
  set tiTip(value: string | TemplateRef<any> | any) {
    this._tiTip = value;
    if (TiTipDirective.isInValidValue(value)) {
      this.hide();
    }
  }
  /**
   * @ignore
   */
  get tiTip(): string | TemplateRef<any> | any {
    return this._tiTip;
  }
  /**
   * 显示 tip 的方法
   */
  public show(): ComponentRef<any> {
    if (!this.tipInstance || TiTipDirective.isInValidValue(this._tiTip)) {
      return;
    }

    return this.tipInstance.show(this._tiTip, this.tiTipContext);
  }
  /**
   * 隐藏 tip 的方法
   */
  public hide(): void {
    if (this.tipInstance) {
      this.tipInstance.hide();
    }
  }
  // 宿主销毁，tip连带销毁
  ngOnDestroy(): void {
    if (this.tipInstance) {
      this.tipInstance.hide();
      this.tipInstance = null;
    }
  }
}
