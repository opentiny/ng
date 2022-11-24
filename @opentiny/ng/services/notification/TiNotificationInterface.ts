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
import { TemplateRef, EventEmitter } from '@angular/core';

/**
 * @ignore
 */
export type TiTimerType = ReturnType<typeof setTimeout> | number | null;

/**
 * 存储全局唯一容器的 mapper
 * @ignore
 */
export interface TiNotificationMapperItem {
  target: any;
}

/**
 * 通知弹窗位置
 */
export type TiNotificationPosition = 'top-right' | 'top' | 'top-left' | 'bottom-left' | 'bottom' | 'bottom-right';

/**
 * 通知弹窗类型
 */
export type TiNotificationType = 'success' | 'prompt' | 'warn' | 'error' | 'simple';

/**
 * 返回的实例对象中提供方法
 */
export type TiNotificationRef = Pick<Required<TiNoticeData>, 'close'>;

/**
 * @ignore
 */
export type TiNoticeBasicConfig = Omit<Required<TiNoticeConfig>, 'name' | 'onClose'>;

/**
 * 包装后的 notice 信息
 * @ignore
 */
export interface TiNoticeData {
  /**
   * @ignore
   * 通知弹窗类型，包括 'success' | 'prompt' | 'warn' | 'error' | 'simple'
   */
  type?: TiNotificationType;
  /**
   * 通知弹窗内容，可能为字符串内容或 template
   * @ignore
   */
  content?: string | TemplateRef<void>;
  /**
   * @ignore
   * 通知弹窗唯一标识
   */
  noticeId?: string;
  /**
   * 可选配置内容
   */
  config?: TiNoticeConfig;
  /**
   * @ignore
   * 通知弹窗进出场状态
   */
  state?: 'enter' | 'leave';
  /**
   * @ignore
   * 自定义内容通知弹窗的 TemplateRef
   */
  template?: TemplateRef<any>;
  /**
   * @ignore
   * 返回给用户的关闭引用
   */
  close?: () => void;
}

/**
 * 用户输入的配置
 */
export interface TiNoticeConfig {
  /**
  * 通知弹窗索引，可通过 name 改变弹窗属性
  */
  name?: string;
  /**
  * 通知弹窗位置
  * @default 'top-right'
  */
  position?: TiNotificationPosition;
  /**
   * 自动关闭时间，单位毫秒
   * @default 4500
   */
  duration?: number;
  /**
   * 是否开启动画
   * @default true
   */
  animation?: boolean;
  /**
   * 是否在鼠标悬停时暂停自动关闭的计时
   * @default true
   */
  hoverPause?: boolean;
  /**
   * 通知弹窗关闭后的回调函数
   */
  onClose?: () => void;
}