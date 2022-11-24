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
import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TiHostLayout, TiPositionType } from '../../utils/Position';
import { TiTipRef } from '../../services/tip/TiTipInterface';
import { TiTipService } from '../../services/tip/TiTipService';
import { TiTipDirective } from '../../directives/tip/TiTipDirective';
import { TiPopconfirmComponent } from './TiPopconfirmComponent';
import { TiKeymap, Util } from '../../utils/Util';

export interface TiPopconfirmConfig {
    /**
     * 确认框 id
     */
    id?: string;
    /**
     * 确认框描述信息
     */
    content: string;
    /**
     * 自定义“是”按钮文本
     */
    yesText?: string;
    /**
     * 自定义“否”按钮文本
     */
    noText?: string;
    /**
     * 设置“是”按钮为强调按钮
     */
    yesPrimary?: boolean;
    /**
     * 确认框弹出方向
     */
    position?: TiPositionType;
    /**
     * 触发“是”按钮事件
     */
    close?(data?: any): void;
    /**
     * 触发“否”按钮事件
     */
    dismiss?(data?: any): void;
    /**
     * 允许有多余的属性字段
     */
    [propName: string]: any;

}

/**
 * TiPopconfirm 气泡确认框指令
 *
 * 一般用于操作执行后对用户业务不会有严重影响的轻量级场景。
 *
 *
 */
@Directive({
    selector: '[tiPopconfirm]'
})
export class TiPopconfirmDirective extends TiTipDirective implements OnInit, OnDestroy {
    private static readonly Z_INDEX: number = 100; // 默认层级是100，暂不支持可配置
    /**
     * 气泡确认框配置对象
     */
    @Input() tiPopconfirm: TiPopconfirmConfig;
    /**
     *
     * 数据接口， 常常绑定表格本行数据
     */
    @Input() data: any;
    protected tipInstance: TiTipRef;
    private hostElement: any;
    private popoverComponentRef: ComponentRef<any> = null;
    private tipElement; // popoverComponentRef的原生元素
    private unlistenClick: () => void;
     // 可聚焦元素
     private focusableElementsString: string = `a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']),
     button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']),
     textarea:not([disabled]):not([tabindex=\'-1\']),
     iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]`;
    constructor(private tiTipService: TiTipService, private hostEleRef: ElementRef, private zone: NgZone, private render: Renderer2,
                @Inject(DOCUMENT) private document, private changeDetectorRef: ChangeDetectorRef) {
        super(tiTipService, hostEleRef);
    }
    /**
     * tip 组件配置
     */
    private tipConfig: any = {
        trigger: 'manual',
        theme: 'white'
    };
    private unListenDocumentKeydown: () => void;

    ngOnInit(): void {
        if (!this.tiPopconfirm || !this.tiPopconfirm.content) {
            return;
        }
        this.hostElement = this.hostEleRef.nativeElement;
        // 创建实例
        this.tipInstance = this.tiTipService.create(this.hostElement, {
            ...this.tipConfig,
            position: this.tiPopconfirm.position,
            zIndex: TiPopconfirmDirective.Z_INDEX,
            registerVisibilityChangeEvent: false
        });

        this.addClickEvent();
    }

    ngOnDestroy(): void {
        if (this.tipInstance) {
            super.ngOnDestroy();
        }
        if (this.unlistenClick) {
            this.unlistenClick();
        }
        if (this.unListenDocumentKeydown) {
            this.unListenDocumentKeydown();
        }

    }

    private addClickEvent(): void {
        this.zone.runOutsideAngular(() => {
            this.unlistenClick = this.render.listen(this.document, 'click', (event: MouseEvent) => {
                if (this.hostElement.contains(event.target) && !this.popoverComponentRef) {
                    this.showPopandFocus();

                    return;
                }
                if (!(this.tipElement && this.tipElement.contains(event.target))) {
                    this.zone.run(() => {
                        this.hide();
                    });
                    this.popoverComponentRef = null;
                }
            });

            this.unListenDocumentKeydown = this.render.listen(document, 'keydown', (event: KeyboardEvent): void => {
                switch (event.which) {
                    case TiKeymap.KEY_TAB: // tab键用于处理在提示框内循环获取焦点
                        this.clickTab(event);
                        break;
                    case TiKeymap.KEY_ENTER:
                        if (this.hostElement.contains(event.target) && !this.popoverComponentRef) {
                            this.showPopandFocus();
                        }
                        break;
                    default:
                        break;
                }
            });

        });
    }

    /**
     * @ignore
     *
     */
    public clickTab(event: KeyboardEvent): void {
        const dialogModalEle: HTMLElement = document.querySelector('.ti3-popconfirm-container');
        const focusableElements: NodeList = dialogModalEle?.querySelectorAll(this.focusableElementsString);
        Util.focusInDialogOnTabchange(event, focusableElements);
    }
    /**
     * 打开气泡组件，并且把焦点转移到提示框内部，为后续把焦点限制在提示框内做准备。
     * @private
     */
    private showPopandFocus(): void {
        this.zone.run(() => {
            this.popoverComponentRef = this.show();
            const popContainerEle: HTMLElement = document.querySelector('.ti3-popconfirm-container');
            if (popContainerEle) {
                popContainerEle.focus();
            }
        });
    }

    /**
     * 显示气泡确认框
     * @ignore
     */
    public show(): ComponentRef<any> {
        if (!this.tipInstance) {
            return;
        }
        const destroyPopover: (result?: boolean) => void = (result?: boolean): void => {
            this.hide();
            if (result && Util.isFunction(this.tiPopconfirm.close)) {
                this.tiPopconfirm.close(this.data);
            } else if (!result && Util.isFunction(this.tiPopconfirm.dismiss)) {
                this.tiPopconfirm.dismiss(this.data);
            }

            // 服务在close和dismiss事件中自行添加逻辑时，视图无法更新需要手动变更刷新
            this.changeDetectorRef.markForCheck();
        };
        const popoverComponentRef: ComponentRef<any> = this.tipInstance.show(TiPopconfirmComponent, {
            id: this.tiPopconfirm.id,
            config: this.tiPopconfirm,
            destroyPopover
        });
        this.tipElement = popoverComponentRef.location.nativeElement;
        const hostPosition: TiHostLayout = this.tiTipService.positionResult?.hostLayout;
        if (typeof getComputedStyle !== 'undefined' && hostPosition?.fixedAncestor) {
            const fixedAncestorZindex: number = parseInt(getComputedStyle(hostPosition.fixedAncestor).zIndex, 10);
            if (typeof fixedAncestorZindex === 'number' &&
            fixedAncestorZindex > TiPopconfirmDirective.Z_INDEX) {
                this.render.setStyle(this.tipElement, 'z-index', fixedAncestorZindex);
            }
        }

        return popoverComponentRef;
    }
}
