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
import { TemplateRef } from '@angular/core';
import { TiModalConfig } from '@opentiny/ng-modal';
// 外部可传入的message配置项
/**
 * 消息组件配置项接口
 *
 * 该接口用于消息弹框组件[open]{@link TiMessageService#open}方法的参数的定义
 */
export interface TiMessageConfig extends TiModalConfig {
  /**
   * 消息弹框类型
   * @default 'confirm'
   */
  type?: 'confirm' | 'warn' | 'error' | 'prompt';
  /**
   * 消息弹框标题
   */
  title?: string;
  /**
   * 消息弹框内容，支持字符串、 template 模板、组件格式
   */
  content?: string | TemplateRef<any> | any;
  /**
   * 内容区域的上下文，为对象形式
   */
  context?: any;
  /**
   * 底部 ok 按钮配置
   */
  okButton?: TiMessageButtonConfig;
  /**
   * 底部 cancel 按钮配置
   */
  cancelButton?: TiMessageButtonConfig;
}

/**
 * 消息弹框底部按钮的配置项接口
 *
 * 该接口用于定义消息弹框的[okButton]{@link ../injectables/TiMessageService.html#okButton}
 * 或[cancelButton]{@link ../injectables/TiMessageService.html#cancelButton}的接口类型
 */
export interface TiMessageButtonConfig {
  /**
   * 按钮文本
   *
   * @default okButton为确认/OK（国际化），cancelButton为取消/Cancel（国际化）
   */
  text?: string;
  /**
   * 是否显示
   *
   * @default true
   */
  show?: boolean;
  /**
   * 是否禁用
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否为主按钮，主按钮为较醒目的按钮样式
   *
   * @default okButton为主按钮
   */
  primary?: boolean;
  /**
   * 是否自动聚焦
   *
   * @default okButton默认聚焦
   */
  autofocus?: boolean;
  /**
   * 点击事件
   */
  click?(): void;
}
