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
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TiRenderer } from '../renderer/TiRenderer';
import { Util } from '../../utils/Util';
import { TiDragServiceModule } from './TiDragServiceModule';
/**
 * @ignore
 *
 * h5提供拖放特性，后续内部开发或服务开发建议优先使用原生拖放，故10.1.11起，在官网隐藏该组件。
 */

// Renderer2注入运行时报错。临时改法，只为通过编译：改为RendererFactory2注入
// 服务的设计目标，并不涉及到渲染。
// https://huncode.com/using-renderer2-inside-services-in-angular/
/**
 * 拖拽事件：start drag stop的参数类型
 *
 * helper: 可拖拽元素
 *
 * position: 设置给helper元素的位置信息
 */
export interface TiDraggableEvent {
    position: {
        left: number,
        top: number
    };
    helper: Element;
}
/**
 * 拖拽配置项参数设置接口
 */
export interface TiDraggableConfig {
    /**
     * 可拖拽元素，仅用于服务生成方式的配置
     */
     helper?: Element;
     /**
      * 拖拽生效元素，即只有当鼠标按下该元素时才可开始拖拽
      */
     handle?: Element;
     /**
      * 可拖拽坐标轴，可定义为x/y，即只可在x和Y方向拖拽
      */
     axis?: 'x' | 'y' | null;
     /**
      * 是否可拖拽，仅用于服务生成方式的配置
      */
     disabled?: boolean;
     /**
      * 拖拽开始事件
      * event参数
      */
     start?(event?: TiDraggableEvent): any;
     /**
      * 拖拽中事件
      * event参数
      */
     drag?(event?: TiDraggableEvent): any; // 在modal组件中调用该函数，有返回值position: {left: number, top: number}
     /**
      * 拖拽结束事件
      * event参数
      */
     stop?(event?: TiDraggableEvent): any;
}
/**
 * 拖拽服务，适用于可拖拽元素不在html模板中显示声明的情况，除服务方式外，还提供了指令生成方式[TiDraggableDirective]{@link ../directives/TiDraggableDirective.html}，
 * 使用该服务时需要引入模块TiDragServiceModule
 *
 */
@Injectable({
    providedIn: TiDragServiceModule
  })
export class TiDragService {
    private renderer: Renderer2;
    constructor(rendererFactory: RendererFactory2, private tiRenderer: TiRenderer) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * 创建拖拽对象
     *
     * 函数返回值为
     * {
     * destroy: () => void
     * }
     */
    create(options: TiDraggableConfig): {
        destroy(): void
    } {
        const helper: Element = options.helper; // 可拖拽元素，原生HTML类型
        const handle: Element = options.handle || helper; // 拖拽生效元素,未定义情况下，默认为helper元素
        // 标志位，用于记录是否是拖拽引起的事件触发,在mousedown和mouseup中分别进行了置位
        let mouseStart: boolean = false;
        // 记录初始位置信息
        let originalPagePos: {
            pageX: number,
            pageY: number
        };
        let originalPos: {
            left: number
            top: number
        };
        // 设置给helper元素的位置信息，用于位置设置及事件中参数传递
        let position: {
            left: number
            top: number
        };
        // 非定位元素情况下设置left/top无效，因此需先将其设置为relative定位
        // 修复SSR错误：ERROR ReferenceError: getComputedStyle is not defined
        const pos: string = typeof getComputedStyle !== 'undefined' ? getComputedStyle(helper).position : '';
        if (!/(fixed|absolute|relative)/.test(pos)) {
            this.renderer.setStyle(helper, 'position', 'relative');
        }
        // 拖拽时需要用到的mouse事件句柄记录
        let mouseMoveEvt: Function;
        let mouseUpEvt: Function;
        this.renderer.listen(handle, 'mousedown', (event: MouseEvent) => {
            if (options.disabled) {// 灰化情况下不做处理
                return;
            }
            mouseStart = true;
            // 初始拖拽时鼠标距离页面边距位置（包含滚动条在内）
            originalPagePos = {
                pageX: event.pageX,
                pageY: event.pageY
            };
            // 拖拽元素初始位置,由于获取到的位置为'xxpx',因此此处需要转化为数字
            originalPos = position = {
                left: parseInt(getComputedStyle(helper).left, 10) || 0,
                top: parseInt(getComputedStyle(helper).top, 10) || 0
            };
            // 触发初始拖拽事件
            triggerEvt('start');
            mouseMoveEvt = this.renderer.listen(document, 'mousemove', (evt: MouseEvent) => {
                onMouseMove(evt);
            });
            mouseUpEvt = this.renderer.listen(document, 'mouseup', (evt: MouseEvent) => {
                onMouseUp(evt);
            });
        });
        const onMouseMove: (evt: MouseEvent) => void = (evt: MouseEvent): void => {
            // 防止非拖拽触发的mousemove事件
            if (!mouseStart) {
                return;
            }
            evt.preventDefault(); // 阻止拖拽过程中的选中处理等操作
            const topPos: number = (options.axis === 'x')
                                ? originalPos.top
                                : (evt.pageY - originalPagePos.pageY + originalPos.top - document.body.scrollTop);
            const leftPos: number = (options.axis === 'y')
                                    ? originalPos.left
                                    : (evt.pageX - originalPagePos.pageX + originalPos.left - document.body.scrollLeft);
            position = {
                left: leftPos,
                top: topPos
            };
            // 触发拖拽时间，该事件中处理拖拽过程中的位置纠正
            triggerEvt('drag');
            this.tiRenderer.setStyles(helper, {
                left: `${position.left}px`,
                top: `${position.top}px`
            });
        };
        const onMouseUp: (evt: MouseEvent) => void = (evt: MouseEvent): void => {
            mouseStart = false;
            triggerEvt('stop');
            // 拖拽停止后，解绑document上的相关事件
            mouseMoveEvt();
            mouseUpEvt();
        };
        const triggerEvt: (evtType: string) => void = (evtType: string): void => {
            if (options[evtType]) {
                const ret: object = options[evtType]({position, helper});
                if (typeof ret === 'object') {
                    position = {...ret, ...position};
                }
            }
        };

        return {
            destroy: (): void => {
                if (!Util.isUndefined(mouseMoveEvt)) {
                    mouseMoveEvt();
                }
                if (!Util.isUndefined(mouseUpEvt)) {
                    mouseUpEvt();
                }
            }
        };
    }
}
