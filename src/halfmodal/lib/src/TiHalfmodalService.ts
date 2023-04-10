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
import { ComponentRef, Injectable, Renderer2, RendererFactory2, TemplateRef } from '@angular/core';
import { TiPopUpRef, TiPopupService } from '@opentiny/ng-popup';

import { TiHalfmodalModule } from './TiHalfmodalModule';
import { TiHalfmodalContainerComponent } from './TiHalfmodalContainerComponent';
/**
 * 通过TiHalfmodalService打开弹窗的配置参数
 */
export interface TiHalfmodalConfig {
  /**
   * 弹窗宽度，默认600px
   */
  width?: string;
  /**
   * 是否含有遮罩层，默认没有遮罩层
   */
  backdrop?: boolean;
  /**
   * 弹窗顶部距窗口顶部的距离
   */
  clientRectTop?: string;
  /**
   * 是否显示关闭图标
   */
  closeIcon?: boolean;
  /**
   * 弹窗内使用的上下文
   */
  context?: {};
  /**
   * 不带遮罩层的场景下，点击页面是否允许关闭
   */
  nomaskCloseable?: boolean;
  /**
   * @ignore
   *
   * 弹窗将要关闭的时候触发的回调
   */
  beforeClose?(context: any, destroy: (reason: boolean) => void, reason: boolean): void;
  /**
   * 调用上下文中 close 的时候触发回调
   */
  close?(context: any): void;
  /**
   * 调用上下文中 dismiss 、无背景层的弹窗点击弹窗外，以及点击右上角关闭图标的时候触发的回调
   */
  dismiss?(context?: any): void;
}
/**
 * 半屏弹窗实例，是通过Service的方式打开半屏弹窗时方法的返回值
 */
export interface TiHalfmodalRef {
  /**
   * 通过 service 的方式打开半屏弹窗时方法返回的实例；弹窗内容为 TemplateRef 时为空；弹窗内容为组件时，是半屏弹窗内容的实例
   */
  content: ComponentRef<any>;
  /**
   * 调用上下文中 close 的时候绑定的事件
   */
  close(): void;
  /**
   * 调用上下文中 dismiss 、无背景层的弹窗点击弹窗外，以及点击右上角关闭图标绑定的事件
   */
  dismiss(): void;
}

@Injectable({
  providedIn: TiHalfmodalModule
})
export class TiHalfmodalService {
  private renderer2: Renderer2;
  private openModals: Array<any> = [];
  constructor(private tiPopup: TiPopupService<any>, protected rendererFactory: RendererFactory2) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
  }

  public open(content: TemplateRef<any> | any, config?: TiHalfmodalConfig): TiHalfmodalRef {
    let halfmodalInstance: TiHalfmodalRef;
    let halfmodalContainerComponent: TiPopUpRef;
    let halfmodalComponentRef: ComponentRef<any>;
    let unListenWindowHashchange: () => void;
    if (this.openModals.includes(content) && !config.backdrop) {
      return;
    }
    const context: any = config.context;
    /**
     * 不同关闭方式的回调，包括事件注销，config中的事件函数回调
     */
    const destroyCallback: (reason: boolean, halfmodalRef?: TiPopUpRef, content?: TemplateRef<any> | any) => void = (
      reason: boolean,
      halfmodalRef?: TemplateRef<any> | any,
      modalContent?: TemplateRef<any> | any
    ): void => {
      destroy(reason, halfmodalRef, modalContent);
    };
    const destroy: (reason: boolean, halfmodalRef?: TiPopUpRef, content?: TemplateRef<any> | any) => void = (
      reason: boolean,
      halfmodalRef?: TiPopUpRef,
      modalContent?: TemplateRef<any> | any
    ): void => {
      if (halfmodalRef) {
        halfmodalRef.hide();
        this.openModals.splice(this.openModals.indexOf(modalContent), 1);
      } else {
        halfmodalContainerComponent.hide();
        this.openModals.splice(this.openModals.indexOf(halfmodalComponentRef), 1);
        halfmodalComponentRef.instance.isShow = false;
      }
      unListenWindowHashchange();
      if (typeof config.dismiss === 'function' && !reason) {
        config.dismiss(context);
      } else if (typeof config.close === 'function' && reason) {
        config.close(context);
      }
    };
    /**
     * hide和dismiss的区别在于，hide从TiHalfmodalContainerComponent中传入了参数，在多个halfmodal的情况下，能区分关闭的是哪一个
     */
    const hide: (halfmodal: TemplateRef<any> | any, content?: TemplateRef<any> | any) => void = (
      halfmodalRef: TemplateRef<any> | any,
      modalContent: TemplateRef<any> | any
    ): void => {
      destroyCallback(false, halfmodalRef, modalContent);
    };
    halfmodalContainerComponent = this.tiPopup.create(TiHalfmodalContainerComponent);
    /**
     * “确认”按钮的绑定事件
     */
    const close: () => void = (): void => {
      destroyCallback(true);
    };
    /**
     * “取消”按钮、右上角叉号、点击弹窗外 的绑定事件
     */
    const dismiss: () => void = (): void => {
      destroyCallback(false);
    };
    halfmodalInstance = {
      content: undefined,
      close,
      dismiss
    };

    halfmodalComponentRef = halfmodalContainerComponent.show({
      content,
      container: 'body',
      contentContext: { ...context, close, dismiss },
      context: {
        ...config,
        dismiss: hide,
        halfmodal: halfmodalContainerComponent,
        content,
        destroyCallback
      }
    });
    unListenWindowHashchange = this.renderer2.listen('window', 'hashchange', (): void => {
      destroyCallback(false);
      unListenWindowHashchange();
    });
    this.openModals.push(content);
    halfmodalComponentRef.instance.isShow = true;
    halfmodalInstance.content = (halfmodalComponentRef as any).tiContentRef.componentRef;

    return halfmodalInstance;
  }
}
