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
import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, RendererFactory2, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CheckStyleService } from './checkHandle/CheckStyleService';
import { CommonService } from './checkHandle/CommonService';
import { TiValidationConfig, TiValidationType } from './TiValidationInterface';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

/**
 * Tiny校验是基于Angular提供的表单校验进行的封装，在使用Tiny组件前，请先了解[Angular表单校验]{@link https://angular.io/guide/form-validation}
 *
 * 组件支持的校验规则及方法见 [TiValidators]{@link ../classes/TiValidators.html}
 *
 */
@Directive({
  selector: '[tiValidation]',
  // 声明该组件定义时需要用到的服务
  providers: [CheckStyleService, CommonService],
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()'
  }
})
export class TiValidationDirective implements OnInit, OnChanges, OnDestroy {
  public static readonly ASYNC_DEBOUNCE_TIME: number = 500; // 这个数值跟tiny2的异步校验一致
  /**
   * 校验配置信息
   */
  @Input() tiValidation: TiValidationConfig | '';
  /**
   * 错误提示信息显示容器，适用于blur/password类型校验形式下，错误提示信息位置自定义场景
   */
  @Input() errorMessageWrapper: Element;
  private renderer: Renderer2;
  // 当前formControl的statusChanges订阅，在指令销毁时取消
  private formStatusSubscription: Subscription;
  private asyncFormStatusSubscription: Subscription;
  constructor(private formControl: NgControl,
              private checkStyleFactory: CheckStyleService,
              private element: ElementRef,
              rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
  }
  private _validationHandleFn: any;
  private eleNative: Element = this.element.nativeElement;
  ngOnInit(): void {
    // 初始化handleFn,用于处理tiValidation指令声明但未定义值场景
    this._setHandleFn();
    // 订阅onStatusChange事件,传递校验时机
    this.formStatusSubscription = this.formControl.statusChanges.subscribe(() => {
      this._validationHandleFn.onStatusChange(this.element, this.formControl);
    });
    // 订阅onStatusChange事件来特别处理异步校验pending状态的loading图标
    if (this.formControl.control.asyncValidator) {
      this.asyncFormStatusSubscription =  this.formControl.statusChanges
        .pipe(
          // 由于异步校验有防抖处理(输入停顿后再进行异步校验)，所以需要在异步校验开始时才能出现loading图标
          debounce(() => timer(Number(this.formControl.pending) * TiValidationDirective.ASYNC_DEBOUNCE_TIME))
        )
        .subscribe(() => {
          if (this._validationHandleFn.onAsyncStatusChange) {
            this._validationHandleFn.onAsyncStatusChange(this.element, this.formControl);
          }
        });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tiValidation'] && !changes['tiValidation'].firstChange) { // validation动态修改支持,此处根据validation重新创建校验实体方法函数
      this._setHandleFn();
    }
  }
  ngOnDestroy(): void {
    // 宿主元素销毁时，销毁其附属tip
    this._validationHandleFn.destroy(this.element);
    // 取消formControl中statusChanges的订阅
    this.formStatusSubscription.unsubscribe();
    if (this.asyncFormStatusSubscription) {
      this.asyncFormStatusSubscription.unsubscribe();
    }
  }
  /**
   * @ignore
   */
  onFocus(): void {
    this._markAsFocus();
    this._validationHandleFn.onFocus(this.element, this.formControl);
  }
  /**
   * @ignore
   */
  onBlur(): void {
    this._markAsBlur();
    this._validationHandleFn.onBlur(this.element, this.formControl);
  }
  private _setHandleFn(): void {
    // 将errorMessageWrapper和tiValidation属性合并，方便后续处理
    const validationConfig: TiValidationConfig = {...this.tiValidation, errorMessageWrapper: this.errorMessageWrapper};
    let type: TiValidationType;
    if (['TI-CHECKBOX-GROUP', 'TI-RADIO-GROUP'].includes(this.eleNative.tagName)
      || this.eleNative.matches('input[ticheckbox]')) {
      type = 'radiobase';
      this.renderer.setAttribute(this.eleNative, 'tiRadiobaseCheck', '');
    }
    this._validationHandleFn = this.checkStyleFactory.
            createHandler(type || (this.tiValidation && this.tiValidation.type), validationConfig);

    // 失焦校验时给宿主元素添加tiBlurCheck属性标识
    if (this.tiValidation && this.tiValidation.type === 'blur') {
      this.renderer.setAttribute(this.eleNative, 'tiBlurCheck', '');
    }
  }

  // 设置focus状态标志,标志包括两部分(如下markAsBlur逻辑类似)：
  // 1.样式类,用于根据focus/blur状态设置CSS中表单边框颜色;
  // 2.标志位,用于根据focus/blur判断是否显示提示信息
  private _markAsFocus(): void {
    this.renderer.setAttribute(this.eleNative, 'tiFocused', 'tiFocused');
  }
  private _markAsBlur(): void {
    this.renderer.removeAttribute(this.eleNative, 'tiFocused');
  }
}
