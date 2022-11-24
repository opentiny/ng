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
import { ApplicationRef, ChangeDetectionStrategy, Component, ElementRef, EmbeddedViewRef, Input, Renderer2,
    TemplateRef, ViewChild } from '@angular/core';
import { TiBrowser, Util } from '../../utils/Util';
import { Position, TiHostLayout, TiPositionResult, TiPositionType } from '../../utils/Position';
import { TiBaseComponent } from '../base/TiBaseModule';
import { Subject } from 'rxjs';

/**
 * @ignore
 * 纯下拉面板组件，只有面板，没有内容。因为有时朝上弹，dropdown/dropup合称drop
 */
@Component({
    selector: 'ti-drop',
    templateUrl: './drop.html',
    styleUrls: ['./drop.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-dropdown-container]': 'true',
        '[class.ti3-dropdown-container-border]': 'theme ==="border"',
        '[style.height]': 'panelHeight'
    }
})
export class TiDropComponent extends TiBaseComponent {
    /**
     * 设置下拉距离dominator的距离：默认没有间距
     */
    public static readonly DOMINATOR_SPACE: number = 4;
    /**
     * 控制下拉框距离浏览器上下边沿的距离为5px，预留一个余量，防止显示不了边框
     */
    private static readonly BROWSER_SPACE: number = 5;
    /**
     * 下拉面板的最大显示宽度，该变量与下拉类组件保持一致
     *
     * 1."justified"(默认): 下拉框的宽度与Select组件的宽度保持一致；
     *
     * 2."auto": 下拉框的宽度根据下拉选项的内容自动撑开；
     *
     * 3.表示宽度的字符串: 设置固定的下拉框宽度(不小于Select组件的宽度)。例如："200px"
     */
    @Input() panelWidth: string = 'justified'; // 面板宽度
    /**
     * 面板最大高度
     */
    @Input() panelMaxHeight: string = '9999px';   // 面板最大高度
    /**
     * 面板高度
     */
    @Input() panelHeight: string;
    /**
     * 参考位置元素
     */
    @Input() dominatorElem: any; // 参考位置元素
    /**
     * 空间不足时，依然保持固定高度。 select search等是可变最大高度，日历是固定最大高度。
     * 再就是上下空间都不足时，日历从下方弹出。
     */
    @Input() fixMaxHeight: boolean = false; // 再就是上下空间都不足时，日历从下方弹出。
    /**
     * 主题样式控制
     */
    @Input() theme: 'border' | 'noborder' = 'border';
    /**
     * 距离宿主元素距离，像素值
     */
    @Input() dominatorSpace: string = TiDropComponent.DOMINATOR_SPACE + 'px';
    /**
     * 距离浏览器上或下边沿的距离，像素值
     */
    @Input() browserSpace: string = TiDropComponent.BROWSER_SPACE + 'px';
    /**
     * 在定位基础上的水平方向的偏移，向左偏移为负值，向右偏移为正值，像素值
     */
    @Input() hOffset: number = 0;
    /**
     * 准备去除
     */
    @Input() determinPositionFn: (layout: any) => string;
    /**
     * 面板对齐方式
     */
    @Input() panelAlign: 'left' | 'right' = 'left';
    /**
     * @ignore
     * 用于定位的参照元素，如果该接口有值，表示drop不添加在body上，而是跟随宿主元素
     */
    @Input() referElem: Element;
    /**
     * @ignore
     */
    @ViewChild('dropTemplateRef', { static: true }) dropTemplateRef: TemplateRef<any>;

    /**
     * @ignore
     */
    public isUp: boolean; // 面板展开的方向
    /**
     * @ignore
     */
    public dropSubject: Subject<any> = new Subject<any>();
    private posHandles: Array<() => void> = [];
    /**
     * @ignore
     * drop相对dominator的位置，暂不对外，buttonselect使用
     */
    public position: TiPositionType;
    public isZIndexModified: boolean = false;
    constructor(protected hostRef: ElementRef, protected renderer: Renderer2, private applicationRef: ApplicationRef) {
        super(hostRef, renderer);
    }

    /**
     * 外部接口: 获取当前状态, 只读不写
     */
    public get isShow(): boolean {
        return this.hostRef.nativeElement.style.display === 'block';
    }

    ngOnDestroy(): void {
        // 从body上摘除。
        // 如果跟随宿主，宿主销毁的时候drop也会销毁
        this.renderer.removeChild(this.renderer.parentNode(this.hostRef.nativeElement), this.hostRef.nativeElement);
        this.unlistenPosition();
    }

    /**
     * 切换面板状态：打开/关闭
     */
    public toggle(): void {
        this.isShow ? this.hide() : this.show();
    }
    /**
     * 打开面板
     */
    public show(): void {
        if (this.isShow) {
            return;
        }
        // 插入DOM树，定位在极远处
        this.appendToDOMFarAway();
        // 先显示，才能再计算
        this.setShow();
        this.setPanelWidth();
        // 设置位置：居下优先，居上其次
        this.setPosition();

        this.listenPosition();
        this.dropSubject.next(true);
    }
    /**
     * 关闭面板
     */
    public hide(): void {
        if (!this.isShow) {
            return;
        }
        this.renderer.setStyle(this.hostRef.nativeElement, 'display', 'none');
        if (this.dominatorElem) {
            this.renderer.removeAttribute(this.dominatorElem, 'dropshow');
        }
        this.unlistenPosition();
    }
    private appendToDOMFarAway(): void {
        // 如果不在body上，那么挂在body上。（逻辑应该移入Position.setPosition吧，因为那位置就是按照body定的，不在body会出错。）
        // 首次显示，需要添加到body或宿主元素上
        const parentNode: Element = this.referElem || document.body;
        if (this.renderer.parentNode(this.hostRef.nativeElement) !== parentNode) {
            if (this.referElem) {
                const position: string = window.getComputedStyle(this.referElem).position;
                if (position === 'static') {
                    this.renderer.setStyle(this.referElem, 'position', 'relative');
                }
            }
            this.renderer.appendChild(parentNode, this.hostRef.nativeElement);
            const embeddedViewRef: EmbeddedViewRef<any> = this.dropTemplateRef.createEmbeddedView(null);
            this.applicationRef.attachView(embeddedViewRef); // 不做此处处理，ng-template中的标签不会解析
            Array.from(embeddedViewRef.rootNodes)
                .forEach((item: any) => {
                    this.renderer.appendChild(this.hostRef.nativeElement, item);
                });
        }
        // 设置在极远处（逻辑应该移入Position.setPosition吧）
        this.renderer.setStyle(this.hostRef.nativeElement, 'left', '-9999px');
        this.renderer.setStyle(this.hostRef.nativeElement, 'top', '-9999px');
        // 更新max-height为默认值panelMaxHeight，因为上次显示可能更改了max-height
        this.renderer.setStyle(this.hostRef.nativeElement, 'max-height', this.panelMaxHeight);
        // 设置width,当出现滚动条时,更新width为默认的panelWidth，避免滚动条宽度的影响
        if (this.panelWidth === 'auto') {
            this.renderer.setStyle(this.hostRef.nativeElement, 'width', this.panelWidth);
        }
    }
    private setShow(): void {
        // 显示才能计算宽度
        this.renderer.setStyle(this.hostRef.nativeElement, 'display', 'block');
        if (this.dominatorElem) {
            this.renderer.setAttribute(this.dominatorElem, 'dropshow', '');
        }
    }
    /**
     * 监听位置变化, 并隐藏面板。打开面板时监听，关闭和销毁时取消监听。
     * TODO: 尝试hide改为rePosition
     */
    private listenPosition(): void {
        this.posHandles = Position.addPosChangeEvts(() => {
            this.hide();
        }, this.renderer);
    }
    private unlistenPosition(): void {
        Position.removePosChangeEvts(this.posHandles);
    }
    /**
     * 确定元素的显示样式，包括位置、最大高度、向上或向下
     * @returns 定位结果对象
     */
    public setPosition(): TiHostLayout {
        const dominatorSpace: number = parseInt(this.dominatorSpace, 10);
        const browserSpace: number = parseInt(this.browserSpace, 10);
        const determinPositionFn: (layout: any) => string = Util.isFunction(this.determinPositionFn) ? this.determinPositionFn :
            this.defaultDeterminPositionFn;

        // 设置位置
        const result: TiPositionResult = Position.setPosition({
            targetEle: this.hostRef.nativeElement,
            hostEle: this.dominatorElem,
            // position: undefined, // 可选参数
            referElem: this.referElem,
            hostSpace: dominatorSpace,
            browserSpace,
            fixMaxHeight: this.fixMaxHeight,
            hOffset: this.hOffset,
            determinPositionFn
        });
        this.position = result.position;
        if (typeof getComputedStyle !== 'undefined' && result.hostLayout.fixedAncestor && !this.isZIndexModified) {
            this.isZIndexModified = true;
            const fixedAncestorZindex: number = parseInt(getComputedStyle(result.hostLayout.fixedAncestor).zIndex, 10);
            if (typeof fixedAncestorZindex === 'number' &&
            fixedAncestorZindex > parseInt(getComputedStyle(this.nativeElement).zIndex, 10)) {
                this.renderer.setStyle(this.nativeElement, 'z-index', fixedAncestorZindex);
            }
        }

        return result.hostLayout;
    }

    public resetPosition(): void {
        // 记录上一次dominator left值
        const hostLayout: TiHostLayout = this.setPosition();
        const dominatorLastLeft: number = hostLayout && hostLayout.left;
        // 记录当前dominator left值
        const dominatorCurLeft: number = Position.getHostEleLayout(this.dominatorElem).left;

        // dominator发生水平位移且面板处于打开状态时，需重新定位
        // 主要场景：下拉面板数据量变动引起body出现竖向滚动条，dominator发生水平方向偏移;
        if (dominatorLastLeft !== dominatorCurLeft) {
            if (this.isShow) {
                this.setPosition();
            }
        }
    }

    private setPanelWidth(): void {
        const panelWidthNum: number = parseInt(this.panelWidth, 10);
        const scrollWidth: number = this.hostRef.nativeElement.offsetWidth - this.hostRef.nativeElement.clientWidth;
        const dominatorElemWidth: number = this.dominatorElem.offsetWidth;
        let width: string;
        if (!isNaN(panelWidthNum)) {
            width = panelWidthNum + 'px';
        } else if (this.panelWidth === 'auto') {
            width = 'auto';
            // Fix bug: 非IE下滚动条会覆盖部分内容
            if (!TiBrowser.isIE()) {
                // 需要重置宽度设置，根据下拉面板的真实宽度确定是否需要增加滚动条宽度
                width = null;
                // 有滚动条出现且文本较长时，需要再增加滚动条的宽度，否则内容显示不全
                if (scrollWidth) {
                    width = this.hostRef.nativeElement.offsetWidth + scrollWidth + 'px';
                }
            }
            const minWidth: string = dominatorElemWidth + 'px';
            this.renderer.setStyle(this.hostRef.nativeElement, 'min-width', minWidth);
        } else {
            // 默认宽度设置，包含justified
            width = dominatorElemWidth + 'px';
        }
        // 设置
        this.renderer.setStyle(this.hostRef.nativeElement, 'width', width);
    }

    // 决定上下位置的函数
    private defaultDeterminPositionFn: (layout: any) => string = (layout: any) => {
        const dominatorSpace: number = parseInt(this.dominatorSpace, 10);
        const browserSpace: number = parseInt(this.browserSpace, 10);
        const needHeight: number = layout.targetLayout.height + dominatorSpace + browserSpace;
        if (layout.avilableLayout.bottom >= needHeight) { // 下方空间足够，向下展开
            return this.panelAlign === 'left' ? 'bottom-left' : 'bottom-right';
        } else if (layout.avilableLayout.top >= needHeight) { // 上方空间足够，向上展开
            return this.panelAlign === 'left' ? 'top-left' : 'top-right';
        } else if (layout.avilableLayout.bottom >= layout.avilableLayout.top) { // 下方空间较大，则向下展开
            // 因为日历组件存在问题，最大高度不压缩，极端情况时会显示在top为负显示不全。所以日历组件尽量向下弹出。
            return this.panelAlign === 'left' ? 'bottom-left' : 'bottom-right';
        }

        return this.panelAlign === 'left' ? 'top-left' : 'top-right'; // 向上展开
    }

}

// offsetWidth属性可以返回对象的padding+border+width属性值之和, 是整数。与jQuery的outerWidth()完全相同，outerWidth(true)带有外边距。
// Element.clientWidth 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距。
