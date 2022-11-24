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
/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */
/**
 * 该类提供服务，用于管理Tip组件的创建和销毁
 * 服务中提供三个方法:
 * create(hostEle, config) 生成一个tip实例并返回对象，
 *   hostEle:宿主元素
 *   config:{
 *      position：tip元素位置
 *      maxWidth：最大宽度
 *      hasArrow：是否带箭头
 *      theme：tip色系 'white'/'dark'
 *  }
 * 返回的实例对象中提供方法:
 * {
 *  show({ // 显示Tip组件
 *   content:弹出组件内容
 *   context:弹出组件上下文
 * })
 *  hide():隐藏并销毁Tip
 * }
 */
import { ComponentRef, Inject, Injectable, NgZone, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TiContentType, TiPopUpRef, TiPopupService } from '../popup/TiPopupService';
import { Position, TiPositionResult, TiPositionType } from '../../utils/Position';
import { Util } from '../../utils/Util';
import { TiRenderer } from '../renderer/TiRenderer';

import { TiTipContainerComponent } from './TiTipContainerComponent';
import { TiTipServiceModule } from './TiTipServiceModule';
import { TiTipConfig, TiTipRef, TiTipShowInfo } from './TiTipInterface';
/**
 * @ignore
 */
export interface TiTipShowConfig {
    popInstance: TiPopUpRef;
    hostEle: Element;
    content: TiContentType;
    context: any;
    config: TiTipConfig;
}

/**
 * @ignore
 */
 interface ShareValues {
    mouseenterTimer: any;
}
/**
 * tip提供了两种使用方式:
 *
 * 1.服务方式（见如下说明），使用该服务时需要引入模块TiTipServiceModule
 *
 * 2.指令方式：[TiTipDirective]{@link ../directives/TiTipDirective.html}
 *
 */
@Injectable({
    providedIn: TiTipServiceModule
})
export class TiTipService {
    private static readonly DEFAULT_WIDTH: number = 276; // tip换行宽度
    private static readonly SPACE: number = 6.5 + 5; // tip框与元素本身的距离 = 三角宽高 + tip三角到触发tip的内容区域的距离
    private static readonly MOUSE_ENTER_DELAY: number = 500; // 防止每次鼠标不小心经过目标元素就会显示出tip的内容，所以增加适当的延迟
    private render: Renderer2;
    /**
     * @ignore
     */
    public positionResult: TiPositionResult; // Position.setPosition()的返回值;
    constructor(private popService: TiPopupService<TiTipContainerComponent>,
        rendererFactory: RendererFactory2, private tiRenderer: TiRenderer, private zone: NgZone
        , @Inject(DOCUMENT) private document, @Optional() private router: Router) {
    this.render = rendererFactory.createRenderer(null, null);
}
    /**
     * 页面激活窗口改变事件处理，此处获取事件名称，该事件后续会在tip显示时注册，隐藏时销毁
     * 添加该事件用于解决的问题现象是：tip带链接，并且点击链接跳转至新开页面，因此，当返回先前页面时，tip不消失（因为未触发任何tip消失的事件），
     * 且移入其他出tip的元素，会出现页面有多个tip的现象
     */
    private getVisibleChangeEventName(): string {
        const hiddenProperty: string = 'hidden' in this.document ? 'hidden' :
            'webkitHidden' in this.document ? 'webkitHidden' :
                'mozHidden' in this.document ? 'mozHidden' :
                    '';

        return hiddenProperty.replace(/hidden/i, 'visibilitychange');
    }
    /**
     * 创建 tip 实例
     */
    public create(hostEle: Element, config?: TiTipConfig): TiTipRef {
        // 宿主元素不存在情况下，不做处理
        if (!Util.isElement(hostEle)) {
            return;
        }
        const shareValues: ShareValues = { mouseenterTimer: undefined };
        const tipConfig: TiTipConfig = config ? config : {};
        const tipInstance: TiTipRef = this.createTip(hostEle, shareValues, tipConfig);
        this.addTriggerEvent(hostEle, tipConfig, tipInstance, shareValues);

        return tipInstance;
    }
    /**
     * 创建Tip实例
     *
     * @param hostEle tip生成所依附的宿主元素
     *
     * @param config tip属性配置
     *
     * @returns 生成的Tip实例对象如下：
     *
     * ```
     * {
     *      // 显示tip方法
     *      // @param content {string | TemplateRef<any> | any} tip显示内容，可为字符串/ng-template/component，具体用法见示例
     *      // @param context {any} tip显示内容对应的上下文，content类型为templateRef或Component形式时会用到该参数
     *      show: (content: string | TemplateRef<any> | any, context?: any) => void;
     *
     *      // 隐藏tip方法
     *      hide: () => void;
     * }
     * ```
     */
    private createTip(hostEle: Element, shareValues: ShareValues, config?: TiTipConfig): TiTipRef {
        const popInstance: TiPopUpRef = this.popService.create(TiTipContainerComponent); // tip弹出服务实例，可通过调用show/hide方法切换组件的显示状态
        let tipComponentRef: any; // 生成好的 tip 组件实例对象componentRef
        const visibilityChangeEvent: string = this.getVisibleChangeEventName();
        let visibleChangeEvtHandle: () => void;
        let routerChangeSub: Subscription;

        // 组件添加全局事件销毁相关处理
        let eventHandles: Array<() => void> = []; // 用于存储事件句柄，事件句柄在事件取消时需要用到

        // 隐藏处理函数
        const hideFn: () => void =
           (): void => {
            if(shareValues?.mouseenterTimer !== undefined) {
                clearTimeout(shareValues.mouseenterTimer);
            }
            if (tipComponentRef != null) {
                // 销毁弹出元素
                popInstance.hide();
                // 通过执行事件返回句柄方法解绑事件
                Position.removePosChangeEvts(eventHandles);
                if (config.registerVisibilityChangeEvent !== false) {
                    visibleChangeEvtHandle();
                }
                routerChangeSub?.unsubscribe();
                tipComponentRef = null;
            }
        };

        return {
            show: (content: string, context?: any): ComponentRef<any> | undefined => {
                if (Util.isUndefined(content) || content === '') {
                    return;
                }
                // 显示Tip元素
                tipComponentRef = this.showTip({
                    popInstance,
                    hostEle,
                    content,
                    context,
                    config
                });
                // 添加全局事件，用于控制特殊情况下宿主位置改变时Tip的隐藏
                eventHandles = Position.addPosChangeEvts(hideFn, this.render, config.positionEventTypes);
                if (config.registerVisibilityChangeEvent !== false) {
                    visibleChangeEvtHandle = this.render.listen(this.document, visibilityChangeEvent, hideFn);
                }
                // 部分服务使用了路由复用策略重写了 angular/router 的 RouteReuseStrategy 接口
                // 使用 hashchange 监听不到通过 routerLink/navigate 路由跳转的场景
                // 此时宿主元素的 ngOnDestroy 不会触发不会销毁 tip，因此监听路由变化的方式
                routerChangeSub = this.router?.events.pipe(
                    filter((event: RouterEvent) => event instanceof NavigationEnd))
                    .subscribe(() => {
                        hideFn();
                    }
                );

                return tipComponentRef;
            },
            hide: (): void => {
                hideFn();
            },
            // 销毁tip
            destroy: (): void => {
                // 销毁tip前先隐藏
                hideFn();
            }

        };
    }

    // 根据trigger配置为宿主元素添加事件，该事件用于控制tip的显示/隐藏
    private addTriggerEvent(hostEle: Element, config: TiTipConfig, tipInstance: TiTipRef, shareValues: ShareValues): void {
        // 非mouse情况下，不用做事件处理
        if (config.trigger !== 'mouse') {
            return;
        }
        let tipComponentRef: ComponentRef<any> = null;
        // 默认情况下，使用mouse进行tip显示和隐藏控制（只对指令形式有效）
        this.zone.runOutsideAngular(() => {
            const unlistenMouseenterFn: () => void = this.render.listen(hostEle, 'mouseenter', () => {
                if (typeof config.showFn !== 'function') {
                    return;
                }
                shareValues.mouseenterTimer = setTimeout(() => {
                    this.zone.run(() => {
                        const showInfo: TiTipShowInfo = config.showFn();
                        if (!showInfo) {
                            return;
                        }
                        tipComponentRef = tipInstance.show(showInfo.content, showInfo.context);
                        if (!tipComponentRef) {
                            return;
                        }
                        // 根据trigger配置添加tip元素本身事件，此处事件用于支持移出tip元素时tip消失
                        const targetEle: Element = tipComponentRef.location.nativeElement;
                        // eslint-disable-next-line max-nested-callbacks
                        this.render.listen(targetEle, 'mouseleave', (event: MouseEvent) => {
                            /**
                             * 此处处理是为了解决Chrome高版本下，连续点击tip区域情况下，导致tip消失的问题
                             * 【问题原因】chrome高版本（chrome60以上版本）下，连续的click事件会触发tipEle的mouseleave事件,
                             * 从而导致tip消失
                             * 【解决方案】如mouseleve事件是由tip元素本身点击触发的，则event.relatedTarget为null，则通过该
                             * 方式进行特殊情况排除
                             */
                            if (event.relatedTarget === null) {
                                return;
                            }
                            tipInstance.hide();
                            tipComponentRef = null;
                        });

                    });
              }, TiTipService.MOUSE_ENTER_DELAY);
            });
            const unlistenMouseleaveFn: () => void = this.render.listen(hostEle, 'mouseleave', (event: MouseEvent) => {
                if(shareValues?.mouseenterTimer !== undefined) {
                    clearTimeout(shareValues?.mouseenterTimer);
                }
                // 鼠标移入tip时，tip不消失
                if (tipComponentRef && !tipComponentRef.location.nativeElement.contains(event.relatedTarget)) {
                    this.zone.run(() => {
                        tipInstance.hide();
                        tipComponentRef = null;
                    });
                }
            });
            // 给实例添加销毁方法
            tipInstance.destroy = (): void => {
                // 先隐藏tip示例再取消监听事件
                tipInstance.hide();
                unlistenMouseenterFn();
                unlistenMouseleaveFn();
            };
        });
    }

    private showTip(options: TiTipShowConfig): ComponentRef<any> {
        const tipComponentRef: ComponentRef<any> = options.popInstance.show({
            content: options.content,
            contentContext: options.context,
            context: { zIndex: options.config.zIndex },
            container: 'body'
        });
        const targetEle: Element = tipComponentRef.location.nativeElement;
        this.tiRenderer.setStyles(targetEle, {
            left: '-9999px',
            top: '-9999px'
        });
        this.setTipTheme(targetEle, options.config);
        // 计算元素宽高时，需要确保元素已生成
        this.setTipWidth(targetEle, options.config);
        this.setPosition(options.hostEle, targetEle, options.config);

        return tipComponentRef;
    }

    private setTipTheme(ele: Element, config: TiTipConfig): void {
        if (!config || !config.theme) {
            return;
        }
        if (config.theme === 'white') {
            this.render.addClass(ele, 'ti3-tip-white-theme');
        }
    }

    private setTipWidth(ele: Element, config: TiTipConfig): void {
        const maxWidth: number = parseInt((config && config.maxWidth) || TiTipService.DEFAULT_WIDTH as any, 10);
        // 修复SSR错误：ERROR TypeError: ele.getBoundingClientRect is not a function
        if (typeof ele.getBoundingClientRect !== 'function') {
            return;
        }
        const targetWidth: number = ele.getBoundingClientRect().width;
        if (targetWidth > maxWidth) {
            // 如果宽度超过最大值，重新设置当前tip的内容宽度
            this.render.setStyle(ele, 'width', `${maxWidth}px`);
        }
    }

    private setPosition(hostEle: Element, targetEle: Element, config: TiTipConfig): void {
        this.positionResult = Position.setPosition({
            targetEle,
            hostEle,
            hostEleX: config.hostEleX,
            position: config && config.position || 'auto',
            hostSpace: TiTipService.SPACE,
            fixMaxHeight: true,
            hasOffsetFix: true
        });
        const position: TiPositionType = this.positionResult.position;
        if (!config || config.hasArrow !== false) {// 未定义或定义为false情况下都需要加该样式类控制三角样式
            this.render.addClass(targetEle, `ti3-tooltip-${position}`);
        }
        // 设置该样式类是为了支持鼠标移入Tip不消失：使用该样式类用于确保tip和宿主元素连接处的DOM在tip范围内
        this.render.addClass(targetEle.querySelector('.ti3-tooltip-sqr'), `ti3-tooltip-${position}-sqr`);
        // 设置当前tip的内容最大高度，超出显示滚动条
        this.tiRenderer.setStyles(targetEle.querySelector('.ti3-tooltip-content'), {
            // targetEle的最大高度 = 可视区域高度avilableHeight - 11 * 2 (tip的横向padding) - 1 * 2(border)
            maxHeight: `${this.positionResult.avilableHeight - 22 - 2}px`
        });
    }
}
