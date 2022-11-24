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
import { ComponentRef, TemplateRef } from '@angular/core';
import { TiPositionEventType, TiPositionType } from '../../utils/Position';
/**
 * tip配置项，
 * 作为[TiTipService.create]{@link ../injectables/TiTipService.html#create}方法中的参数类型使用
 */
export interface TiTipConfig {
    /**
     * 位置
     *
     * @default 'auto'
     */
    position?: TiPositionType;
    /**
     * 最大宽度
     *
     * @default '276px'
     */
    maxWidth?: string;
    /**
     * 是否带箭头
     *
     * @default true
     */
    hasArrow?: boolean;
    /**
     * tip色系 'white'(tip背景为浅色)/'dark'(tip背景为深色)， 不设置时默认为 'dark'
     */
    theme?: 'dark' | 'white';
    /**
     * @ignore
     * 触发方式
     */
    trigger?: 'mouse' | 'manual';
    /**
     * @ignore
     *
     * 页面不可见时，是否让tip消失，默认消失，intro组件不消失
     */
    registerVisibilityChangeEvent?: boolean;
    /**
     *
     * tip的z-index属性值
     */
     zIndex?: number;
    /**
     * @ignore
     */
    positionEventTypes?: Array<TiPositionEventType>;
    /**
     * @ignore
     * mouse触发方式下，tip显示函数，返回值同tipRef show函数返回值
     */
    showFn?(): TiTipShowInfo;
    /**
     * @ignore
     * 决定定位元素水平方向的元素，用于宿主元素水平方向位置与host元素不一致的场景，暂不对外开放
     */
    hostEleX?: Element;
}
/**
 * tip生成实例对象
 * 作为[TiTipService.create]{@link ../injectables/TiTipService.html#create}方法的返回值使用
 */
export interface TiTipRef {
    /**
     * @ignore
     * 内部变量，用于标识mouse事件触发情况下，鼠标是否在tip元素上
     */
    isInsideTip?: boolean;
    /**
     * 显示tip方法
     *
     * **函数类型：**(content: string | TemplateRef<any> | any, context?: any) => void;
     *
     * **参数类型：**
     *
     * 1. content tip显示内容，可为字符串/ng-template/component，具体用法见示例
     *
     * 2. context tip显示内容对应的上下文，content类型为templateRef或Component形式时会用到该参数
     *
     */
    show(content: string | TemplateRef<any> | any, context?: any): ComponentRef<any>;
    /**
     * 隐藏tip方法
     *
     * **函数类型：** () => void;
     */
    hide(): void;
    /**
     * @ignore
     * 销毁tip实例方法，如下场景需要此方法：
     * 一定条件下，希望通过TiTpService给目标元素添加tip，并使用mouseenter/mouseleave 触发tip, 当条件改变后需要去除目标元素上的tip。
     * 目前 TpFrozen 在使用此接口
     * **函数类型：** () => void;
     */
    destroy(): void;
}
/**
 * showFn 函数返回值类型
 *
 */
export interface TiTipShowInfo {
    /**
     * tip显示内容,可为字符串/ng-template/component
     */
    content: string | TemplateRef<any> | any;
    /**
     * tip显示内容对应的上下文，content类型为templateRef或Component形式时会用到该参数
     */
    context?: any;
}
