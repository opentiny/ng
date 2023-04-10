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
/**
 * 该类对外暴露，以服务的方式提供方法生成message组件
 * open({
 *  id:message id,string类型,用于生成唯一的按钮可测试id，并且防止弹框多次打开（同modal组件）
 *  type:message类型，支持'prompt' | 'warn' | 'error' | 'confirm'，默认为confirm
 *  title:头部title,string类型，可支持string形式的DOM片段
 *  content:内容区域DOM,支持类型为：TemplateRef<any> | Function | string
 *  context:内容区域上下文，类型为Object
 *  okButton:{
 *    text：string，按钮文本显示
 *    click: Function，点击回调
 *    primary: boolean,默认为true,程序中保证了两个按钮中只有一个可为true
 *    autofocus: boolean,默认为true,程序中保证了两个按钮中只有一个可为true
 *    show: boolean，标识按钮是否显示,默认为true
 * }
 *  cancleBtn:{
 *    text：string，按钮文本显示
 *    click: Function，点击回调
 *    primary: boolean,默认为false,程序中保证了两个按钮中只有一个可为true
 *    autofocus: boolean,默认为false,程序中保证了两个按钮中只有一个可为true
 *    show: boolean，标识按钮是否显示,默认为true
 * }
 * })
 */
import { Injectable } from '@angular/core';
import { TiModalRef } from '@opentiny/ng-modal';
import { TiModalService } from '@opentiny/ng-modal';
import { TiMessageComponent } from './TiMessageComponent';
import { TiMessageModule } from './TiMessageModule';
import { TiMessageConfig } from './TiMessageInterface';

/**
 * 消息弹框组件，使用服务方式生成，使用该服务时需要引入模块TiMessageModule，通过调用TiMessageService.open(config)方法生成弹出框
 *
 * <p><span style="color: red">使用此组件时需要开发者在项目模块(建议在根模块)
 * 中引入BrowserAnimationsModule。</span>这是因为此组件中使用了Angular动画，需要引入BrowserAnimationsModule，
 * 但是 BrowserAnimationsModule 不能在懒加载模块被重复引入，所以需要开发者来引入BrowserAnimationsModule，保证其引入一次。</p>
 *
 */
@Injectable({
  providedIn: TiMessageModule
})
export class TiMessageService {
  constructor(private tiModal: TiModalService) {}
  /**
   * 生成消息弹框方法
   * [config] 弹框配置信息
   * 返回 弹框实例信息，使用该实例信息可调用弹框的close等方法；内容为component类型时，也可通过content属性获取内容结果数据
   */
  public open(config?: TiMessageConfig): TiModalRef {
    const { type, title, content, context, okButton, cancelButton, ...modalConfig }: TiMessageConfig = config;

    return this.tiModal.open(TiMessageComponent, {
      context: {
        id: config.id,
        type,
        title,
        content,
        context,
        okButton,
        cancelButton
      },
      modalClass: 'ti3-msg-default-width',
      ...modalConfig
    });
  }
}
