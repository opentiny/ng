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
import { ComponentRef, Injector } from '@angular/core';

/**
 * 弹出框组件生成配置参数接口
 *
 * 该接口用于弹出框组件[open]{@link TiModalService#open}方法的参数的定义
 */
export interface TiModalConfig {
    /**
     * 弹出框 id 唯一标识，避免同一页面生成多个相同弹出框
     */
    id?: string;
    /**
     * 头部内容水平对齐方向
     *
     * @default 'left'
     */
    headerAlign?: 'center' | 'left' | 'right'; // 头部内容水平对齐位置
    /**
     * 是否有关闭按钮
     *
     * @default true
     */
    closeIcon?: boolean;
    /**
     * 弹出框样式定义，该样式定义在弹出框整体元素上，可通过该样式定义弹出框的宽高等
     */
    modalClass?: string;
    /**
     * 是否显示模态背景
     *
     * @default true
     */
    backdrop?: boolean;
    /**
     * 是否可拖拽
     *
     * @default true
     */
    draggable?: boolean;
    /**
     * 弹出框显示/隐藏是否带动画效果
     *
     * @default true
     */
    animation?: boolean;
    /**
     * 弹出框内容上下文，为自定义对象形式
     */
    context?: any;
    /**
     * 是否可通过 ESC 快捷键关闭弹出框
     *
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * 弹出框内容为组件时，内容组件的父级注入器
     */
    parentInjector?: Injector;
    /**
     * 关闭弹出框前的回调函数，可通过 beforeClose 事件阻止弹出框关闭：在 beforeClose 中通过 modalRef 调用 destroy 时，关闭弹出框，否则不关闭
     *
     * 参数：TiModalRef：弹出框实例 reason：弹出框关闭原因（调用 close 关闭时，reason 为 true；调用 dismiss 关闭时，reason 为 false）
     *
     */
    beforeClose?(modalRef: TiModalRef, reason: boolean): void;
    /**
     * 关闭弹出框的事件回调（一般点确认时会进入该回调），参数：modalRef 弹出框实例
     */
    close?(modalRef: TiModalRef): void;
     /**
      * 关闭弹出框的事件回调（一般点击取消或右上角X关闭时会进入该回调），参数：modalRef 弹出框实例
      */
    dismiss?(modalRef: TiModalRef): void;
}

/**
 * 弹出框组件实例对象接口
 *
 * 该接口用于弹出框组件[open]{@link TiModalService#open}方法的返回值定义
 */
export interface TiModalRef {
    /**
     * 弹出框内容实例，适用于component形式的内容数据获取，具体用法可参考示例
     */
    content: ComponentRef<any>; // 弹出框内容实例，可通过该实例获取content对应的相关数据，component形式的模板数据获取需要使用该方式
    /**
     * @ignore
     */
    _id: string; // 弹出框ID存储，该id用来标识弹出框的唯一性
    /**
     * @ignore
     */
    _backdrop: boolean; // 用于标记当前弹出框是否有遮罩
    /**
     * 弹出框关闭方法，主要用在点击"确认(OK)"按钮时关闭弹出框
     *
     * **函数类型：**() => void;
     */
    close(): void; // 弹出框实例的方法，用来关闭弹出框，主要用在点击"确认(OK)"按钮时关闭弹出框
    /**
     * 弹出框关闭方法，主要用在点击"取消(Cancel)"或右上方X按钮时关闭弹出框
     *
     * **函数类型：**() => void;
     */
    dismiss(): void; // 弹出框实例的方法，用来关闭弹出框，与close()的区别是：dismiss()主要用在点击"取消(Cancel)"按钮时关闭弹出框
    /**
     * 弹出框销毁方法
     *
     * **函数类型：**(reason: boolean) => void;
     *
     * **参数：**
     *
     * 弹出框关闭原因 boolean，同beforeClose参数中reason的意义
     */
    destroy(reason: boolean): void; // 销毁弹出框，外部调用
    /**
     * @ignore
     * 弹出框销毁方法，无关取消/关闭事件等
     */
    _remove(): void;
}
