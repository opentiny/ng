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
import { TiPositionType } from '@opentiny/ng-utils';
import { TemplateRef } from '@angular/core';

export type TiIntroShape = 'rect' | 'circle';

/**
 * 某一步的intro信息对象
 */
export interface TiIntroStep {
  /**
   * 被引导元素，第一步没有指定 element 则以弹窗的形式呈现
   */
  element?: any;
  /**
   * 必选，第几步引导，从 0 开始
   */
  step: number;
  /**
   * 元素被引导时高亮区域的形状
   */
  shape?: TiIntroShape;
  /**
   * 引导信息标题
   */
  title?: string;
  /**
   * 引导信息内容
   */
  content?: string | TemplateRef<any>;
  /**
   * 引导信息方向
   */
  position?: TiPositionType;
  /**
   * @ignore
   * 是否为关闭多个 tip 的操作元素
   */
  isAction?: boolean;
}

export interface TiIntroConfig {
  /**
   * 组件整体 id
   */
  id?: string;
  /**
   * 必选，引导数据集
   */
  steps: Array<TiIntroStep>;
  /**
   * 最后一步引导信息的重要按钮文本
   */
  finishButtonText?: string;
  /**
   * 是否显示跳过按钮
   */
  skipable?: boolean;
  /**
   * 每一步引导前触发的回调
   */
  beforeStep?(TiIntroRef: TiIntroRef, currentNumber?: number): void;
  /**
   * 完成引导信息时触发的回调
   */
  onFinish?(): void;
  /**
   * 退出引导触发的回调
   */
  onExit?(): void;
}
export interface TiIntroRef {
  /**
   * 开始新手引导（intro）的方法
   *
   * **函数类型：**() => void;
   */
  start(): void;
  /**
   * 结束新手引导（intro）的方法
   *
   * **函数类型：**() => void;
   */
  end(): void;
  /**
   * 跳转至某一步的方法
   *
   * **函数类型：**() => void;
   */
  step(number: number): void;
  /**
   * 在beforeStep中调用introRef.proceed()，以便进入该步，否则不会进入
   *
   * **函数类型：**() => void;
   */
  proceed(): void;
}
