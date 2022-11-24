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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, NgZone,
    Output, Renderer2 } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseModule';
import { TiKeymap, Util } from '../../utils/Util';
import { TiHalfmodalHeaderComponent } from './TiHalfmodalHeaderComponent';

/**
 * 半屏弹窗组件
 *
 * 半屏弹窗分为两种：1.不带遮罩层，默认点击弹窗外会关闭弹窗；2.带遮罩层，点击弹窗外不能关闭弹窗。
 *
 * 两种弹窗都可以通过点击右上角的关闭按钮或者hide()方法关闭弹窗
 *
 * 注：第一类弹窗，点击弹窗外关闭的原理是在document上注册点击事件触发`TiHalfmodalComponent.hide()`，如果不想关闭弹窗可以阻止事件冒泡。
 *
 */
@Component({
    selector: 'ti-halfmodal',
    templateUrl: './halfmodal.html',
    styleUrls: ['./halfmodal.less'],
    host: {
        '[style.width]': 'width',
        '[style.top]': 'clientRectTop',
        '[style.right]': 'width ? "-" + width : "-600px"',
        '[style.z-index]': 'backdrop? "1300":"900"',
        '[hidden]': '!isShow'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TiHalfmodalComponent extends TiBaseComponent {
    constructor(protected elementRef: ElementRef, protected renderer2: Renderer2, protected zone: NgZone,
                protected changeDetector: ChangeDetectorRef) {
        super(elementRef, renderer2);
    }
    /**
     * 弹窗宽度
     */
    @Input() width: string = '600px';
    /**
     * 是否展示遮罩
     */
    @Input() backdrop: boolean = false;
    /**
     * 弹窗顶部距窗口顶部的距离
     */
    @Input() clientRectTop: string = '50px';
    /**
     * 是否显示右上角的关闭按钮
     */
    @Input() closeIcon: boolean = true;
    /**
     * 不带遮罩层的场景下，点击页面是否允许关闭
     */
    @Input() nomaskCloseable: boolean = true;
    /**
     * 弹窗将要关闭的时候触发的回调
     */
    @Output() readonly beforeHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * @ignore
     * 头部区域
     */
    @ContentChild(TiHalfmodalHeaderComponent) headElement: TiHalfmodalHeaderComponent;
    /**
     * @ignore
     */
    public isShow: boolean = false;
    /**
     * @ignore
     */
    public isWantShow: boolean = false;
    /**
     * @ignore
     */
    public unlistenClick: () => void;
    /**
     * @ignore
     */
    public unlistenMousedown: () => void;
    /**
     * mousedown的时候，鼠标对应的X坐标
     */
    private mousedownX: number;
    /**
     * mousedown的时候，鼠标对应的Y坐标
     */
    private mousedownY: number;
    // 遮罩层元素
    private backdropEle: Element;
    // 可聚焦元素
    private focusableElementsString: string = `a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']),
    button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']),
    textarea:not([disabled]):not([tabindex=\'-1\']),
    iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]`;
    private unListenDocumentKeydown: () => void;
    private onHeadChange: (e: CustomEvent) => void;
    private consoleDataService: any;
    /**
     * @description 向上查找最近的指定祖先元素
     * @param ele 子元素
     * @param parentNode 祖先元素标签名
     * @return 找到的祖先元素或者undefined
     */
    private static findClosest(ele: any, parentNodeName: string): Element | undefined {
        if (ele.nodeName === 'HTML' || Util.isNull(ele.parentNode)) {
            return undefined;
        } else if (ele.parentNode.nodeName === parentNodeName) {
            return ele.parentNode;
        } else {
            return this.findClosest(ele.parentNode, parentNodeName);
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        const consoleContext: any = (window as any).getConsoleContext && (window as any).getConsoleContext();
        this.consoleDataService = consoleContext?.get && consoleContext.get({ name: 'safearea' });
        this.onHeadChange = (e: CustomEvent): void => {
            this.renderer2.setStyle(this.nativeElement, 'top', e.detail.top + 'px');
        };
        // 头部高度变化会触发此事件
        if (this.consoleDataService?.onChange) {
            this.consoleDataService.onChange(this.onHeadChange);
        }
    }

    /**
     * 弹窗显示事件
     * @param element 通过事件触发halfModal显示的元素
     */
    public show(element?: Element): void {
        if (this.headElement) {
            this.renderer.addClass(this.nativeElement, 'ti3-halfmodal-layout-container');
        }
        if (this.consoleDataService?.getSafeArea) {
            const safeArea: any = this.consoleDataService.getSafeArea();
            this.renderer2.setStyle(this.nativeElement, 'top', safeArea.top + 'px');
        }
        this.isShow = true;
        this.isWantShow = true;
        // 该组件为onpush变化检测策略。Angular默认不会为该组件以及子组件执行变化检测。但是此处设计模板变量的修改，所以手动触发变化检测。
        this.changeDetector.markForCheck();
        this.renderer2.addClass(this.nativeElement, 'ti3-halfmodal-animation');
        if (this.backdrop && !this.backdropEle) {
            this.backdropEle = this.renderer2.createElement('div');
            this.renderer2.addClass(this.backdropEle, 'ti3-halfmodal-backdrop');
            this.renderer2.appendChild(document.body, this.backdropEle);
            this.zone.runOutsideAngular(() => { // 避免不停触发变化检测
                // 防止多次打开半屏弹窗的时候，事件注册多次。
                if (!this.unListenDocumentKeydown) {
                    this.unListenDocumentKeydown = this.renderer2.listen(document, 'keydown', (event: KeyboardEvent): void => {
                        switch (event.which) {
                            case TiKeymap.KEY_TAB: // tab键用于处理在提示框内循环获取焦点
                                this.clickTab(event);
                                break;
                            default:
                                break;
                        }
                    });
                }
            });

        } else {
            // 让Angular不在执行变化检测。
            this.zone.runOutsideAngular((): void => {
                if (!this.unlistenMousedown && this.nomaskCloseable) {
                    this.unlistenMousedown = this.renderer2.listen(document, 'mousedown', ($event: MouseEvent): void => {
                        this.mousedownX = $event.clientX;
                        this.mousedownY = $event.clientY;
                    });
                }
            });
            // click事件涉及更新模板中的变量，所以不能增加runOutsideAngular。
            if (!this.unlistenClick) {
                this.unlistenClick = this.renderer2.listen(document, 'click', ($event: MouseEvent): void => {
                    if (element && element.contains($event.target as Node) || this.isWantShow) {
                        this.isWantShow = false;

                        return;
                    }
                    if (TiHalfmodalComponent.findClosest($event.target, 'TI-MESSAGE') ||
                        TiHalfmodalComponent.findClosest($event.target, 'TI-MODAL-WRAPPER') ||
                        TiHalfmodalComponent.findClosest($event.target, 'TI-DROP')) {
                        return;
                    }

                    // 判断鼠标是否在弹窗范围内, 如果不在弹窗内部，则关闭半屏弹窗。
                    if (this.nomaskCloseable && (document.documentElement.clientWidth - this.mousedownX > this.nativeElement.offsetWidth
                        || document.documentElement.clientHeight - this.mousedownY > this.nativeElement.offsetHeight)) {
                            this.wantHide();
                            // 该组件为onpush变化检测策略。Angular默认不会为该组件以及子组件执行变化检测。但是此处设计模板变量的修改，所以手动触发变化检测。
                            this.changeDetector.markForCheck();
                    }
                });
            }
            // 当用户异步调用show方法时，在打开半屏弹窗之后，需要重置isWantShow的值，防止出现点击两次才能关闭的情况。
            setTimeout((): void => {
                this.isWantShow = false;
            }, 0);
        }
    }
    private clickTab(event: KeyboardEvent): void {
        const introModal: HTMLElement = document.querySelector('.ti3-halfmodal-animation');
        const focusableElements: NodeList = introModal?.querySelectorAll(this.focusableElementsString);
        Util.focusInDialogOnTabchange(event, focusableElements);
    }
    /**
     * @ignore
     * 即将关闭，如果监听beforeHide，则由业务关闭弹窗
     */
    public wantHide(): void {
        if (this.beforeHide.observers.length > 0) {
            this.beforeHide.emit(this);
        } else {
            this.hide();
        }
    }
    /**
     * 弹窗隐藏事件
     */
    public hide(): void {
        this.hideBackdrop();
        this.isShow = false;
        // 该组件为onpush变化检测策略。Angular默认不会为该组件以及子组件执行变化检测。但是此处设计模板变量的修改，所以手动触发变化检测。
        this.changeDetector.markForCheck();
        if (this.unlistenClick) {
            this.unlistenClick();
            this.unlistenClick = undefined;
        }

        if (this.unlistenMousedown) {
            this.unlistenMousedown();
            this.unlistenMousedown = undefined;
        }
    }
    /**
     * @ignore
     */
    public hideBackdrop(): void {
        if (this.backdropEle) {
            this.renderer2.removeChild(document.body, this.backdropEle);
            this.backdropEle = undefined;
        }
    }

    ngOnDestroy(): void {
        this.hideBackdrop();
        if (this.unlistenClick) {
            this.unlistenClick();
            this.unlistenClick = undefined;
        }
        if (this.unListenDocumentKeydown) {
            this.unListenDocumentKeydown();
            this.unListenDocumentKeydown = undefined;
        }
        if (this.unlistenMousedown) {
            this.unlistenMousedown();
            this.unlistenMousedown = undefined;
        }
        if (this.consoleDataService?.offChange) {
            this.consoleDataService.offChange(this.onHeadChange);
        }
    }
}
