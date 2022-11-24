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
import {
  Directive,
  DoCheck,
  ElementRef,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  Inject,
  Input
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { TiTableColumns, TiTableComponent } from './TiTableComponent';
import { TiRenderer } from '../../services/renderer/TiRenderer';
import { Util } from '../../utils/Util';

import { TiTableFixedHeadService } from './TiTableFixedHeadService';

/**
 * @ignore
 */
export interface ResizableOpts {
    table: any;
    ths: Array<any>;
    wrap: any; // 包裹表格的父容器，拖动表格超过父容器时出滚动条
    mouseXPosition: number; // 光标位置，列拖动时使用
    target: any; // 拖动的当前列
    storedSizes: Array<number>; // 用来实时保存各列宽度
    storedSortEleSizes: Array<number>; // 用来保存各列sort元素的宽度,
    storeTableWidthChange: number;
    secondTable?: any;
    secondThs?: Array<any>;
    xScrollState?: boolean;
    yScrollState?: boolean;
    isYOverflowedWithX?: boolean; // 表头锁定时,列拖动过程中横向滚动条的出现导致纵向滚动条出现的标志位
}
/**
 * TiColsResizable 表格列拖动指令
 *
 * 支持拖动表格列来调整各列宽度。
 *
 * 在ti-table标签上加了tiColsResizable属性，则表格自动具有列拖动功能；
 * 同时还需要对table元素包裹父容器div，并对父容器设置 ti3-resize-wrapper样式类。
 */
@Directive ({
    selector: 'ti-table[tiColsResizable]'
})
export class TiColsResizableDirective implements OnInit, DoCheck, OnDestroy {
    /**
     * @ignore
     */
    public static readonly UNSELECTABLE_CLASS: string =  'ti3-unselectable';
    /**
     * @ignore
     * 移到表头能够显示拖动线的感应范围
     */
    public static readonly COL_BORDER_RANGE: number = 10;
    /**
     * @ignore
     */
    public readonly notResizableAttr: string = 'not-resizable';
    /**
     * 是否开启列拖动功能
     */
    @Input('tiColsResizable') isColsResizable: boolean | '';
    /**
     * @ignore
     */
    public resizableOpts: ResizableOpts = {
        table: null,
        ths: null,
        wrap: null,
        mouseXPosition: 0,
        target: null,
        storedSizes: [],
        storedSortEleSizes: [],
        storeTableWidthChange: 0,
        isYOverflowedWithX: false
    }; // 初始化列拖动属性的配置项
    private hostEle: Element;
    private documentMouseMoveListener: () => void;
    private documentMouseUpListener: () => void;
    private windowResizeListener: () => void;
    private isDragStart: boolean = false;
    private columsDiffer: IterableDiffer<Object>;
    private subscription: Subscription;
    private isColumnsInit: boolean = true;
    /**
     * @ignore
     */
    public isfirstYScrollStateChange: boolean = true;
    /**
     * @ignore
     */
    public tableCom: TiTableComponent;
    constructor(tableCom: TiTableComponent, private renderer: Renderer2,
                private elementRef: ElementRef, private zone: NgZone, private tiRenderer: TiRenderer,
                private iterableDiffers: IterableDiffers,
                private fixedHeadService: TiTableFixedHeadService,
                @Inject(DOCUMENT) private document) {
        this.hostEle = this.elementRef.nativeElement;
        this.tableCom = tableCom;
    }

    private static getThs(table: Element): Array<Element> {
        return Array.from(table.children[0].children[0].children);
    }

    private static getWidth(element: any): number {
        return parseFloat(element.getBoundingClientRect().width
            .toFixed(1));
    }

    private static trackByFn(index: number, item: {show?: boolean}): boolean {
        return item.show;
    }

    ngOnInit(): void {
        if (this.isColsResizable === false) {
            return;
        }
        this.subscription = this.tableCom.viewInitSubject.subscribe(() => {
            this.processColsResizable();
            this.isColumnsInit = false; // 主要处理 columns 初始为空，异步的场景
            // 表格记忆
            // 版本更新后用户第一次访问，localStorageState['colsWidth']不存在
            // 修复SSR错误：ERROR TypeError: Cannot read property 'colsWidth' of undefined
            if (this.tableCom.storageId && this.tableCom.storageConfig && this.tableCom.storageConfig.colsWidth
                && this.tableCom.localStorageState && this.tableCom.localStorageState['colsWidth']) {
                this.initStorageColsWidth();
            }
        });

        this.columsDiffer = this.iterableDiffers.find(this.tableCom.columns)
            .create<{show?: boolean}>(TiColsResizableDirective.trackByFn);
    }

    ngDoCheck(): void {
        if (this.isColsResizable === false) {
            return;
        }
        const columsDiffer: IterableChanges<TiTableColumns> = this.columsDiffer.diff(this.tableCom.columns);
        if (columsDiffer) {
            if (this.isColumnsInit) {
                this.isColumnsInit = false;

                return;
            }
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.setDefaultWidth();
             }, 0);
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.documentMouseMoveListener) {
            this.documentMouseMoveListener();
        }
        if (this.documentMouseUpListener) {
            this.documentMouseUpListener();
        }
        if (this.windowResizeListener) {
            this.windowResizeListener();
        }
    }

    private processColsResizable(): void {
        this.setTableWidthChange();
        const table: any = this.resizableOpts.table = this.getTable();
        const thead: any = table.children[0];
        if (this.tableCom.isFixedHead) {
            this.resizableOpts.secondTable = this.getSecondTable();
            this.resizableOpts.xScrollState = this.overflowedX();
            this.resizableOpts.yScrollState = this.overflowedY();
            this.resizableOpts.ths = TiColsResizableDirective.getThs(table);
            this.resizableOpts.secondThs = TiColsResizableDirective.getThs(this.resizableOpts.secondTable);
            this.tableCom.processYScrollStateChangeWithColsResizable = (): void => {
                this.fixedHeadService.processYScrollStateChange(this);
            };
        }
        this.zone.runOutsideAngular(() => { // 避免不停触发变化检测
            this.renderer.listen(thead, 'mousemove', (event: MouseEvent) => {
                const currentTh: any = event.target;

                if (currentTh['nodeName'] !== 'TH') {
                    return;
                }

                // 获取当前th距页面文档的left值
                const left: number = currentTh['getBoundingClientRect']().left + this.document.documentElement.scrollLeft;
                const thWidth: number = currentTh['getBoundingClientRect']().width;
                // 判断光标是否落在th的右边缘
                const isOnColBorder: boolean = Math.abs(event.pageX - Math.round(left + thWidth)) <=
                    TiColsResizableDirective.COL_BORDER_RANGE;

                if (isOnColBorder) {
                    if (event.target['hasAttribute'](this.notResizableAttr) ||
                        this.isLastColumn(currentTh)) {
                        return;
                    }
                    this.createDividingLine(currentTh);
                } else {
                    this.removeDividingLine();
                }
            });
            this.renderer.listen(thead, 'mouseleave', () => {
                this.removeDividingLine();
            });
            this.renderer.listen(thead, 'mousedown', (event: MouseEvent) => {
                const currentTh: any = event.target;
                if (this.tiRenderer.hasClass(currentTh, 'col-resize-active')) {
                    this.isDragStart = true;
                    // 鼠标点击的当前列
                    this.resizableOpts.target = currentTh;
                    // 更新光标位置
                    this.resizableOpts.mouseXPosition = event.pageX;
                    // 在拖动前获取当前表格最新的列信息、宽度，很关键，使得设置宽度与样式实际宽度一直
                    this.updateTableInfo();
                    // 给页面设置不可选样式，避免拖动时页面或表格内部出现被选中的蓝色区域
                    this.toggleTextSelection(true);
                }

                if (this.tableCom.isFixedHead) {
                    this.resizableOpts.xScrollState = this.overflowedX();
                    this.resizableOpts.yScrollState = this.overflowedY();
                }
            });

            const tableContainer: any = this.tiRenderer.findChildrenByClassName(this.hostEle, 'ti3-resize-wrapper')[0];
            if (!this.tiRenderer.hasClass(tableContainer, 'ti3-table-container')) {
                this.renderer.listen(tableContainer, 'scroll', () => {
                    Util.trigger(this.document, 'tiScroll');
                });
            }

            this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event: MouseEvent) => {
                // 列拖动的动作应该是先mousedown，然后mousemove，因此先判断是否已经触发了mousedown
                if (!this.isDragStart || this.resizableOpts.mouseXPosition === 0 || !this.resizableOpts.target) {
                    return;
                }

                this.mouseMove(event);
            });
            this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', (event: MouseEvent) => {
                if (!this.isDragStart) {
                    return;
                }

                this.toggleTextSelection(false); // 恢复页面可选样式
                this.stopResize(); // 保存最新宽度到浏览器中
                this.isDragStart = false;
            });

            // 修复SSR报错：ERROR ReferenceError: window is not defined
            if (typeof window === 'undefined') {
                return;
            }
            this.windowResizeListener = this.renderer.listen(window, 'resize', () => {
                this.setTableWidthChange();
            });
        });
    }

    private mouseMove(event: MouseEvent): void {
        const options: ResizableOpts = this.resizableOpts;
        const lastColIndex: number = options.ths.length - 1;
        const curColIndex: number = parseInt(options.target.getAttribute('ti-visible-index'), 10);
        const colWidth: number = options.storedSizes[curColIndex];
        const leftEdge: number = parseFloat((event.pageX - options.mouseXPosition).toFixed(1));
        const minWidth: number = this.getColMinWidth(options.target);

        // 当拖拽方向为列宽度减小的方向且列宽已达到文本区最小宽度时阻止拖动
        if ((leftEdge >= 0) || (colWidth + leftEdge > Math.ceil(minWidth))) {
            // 更新拖动列宽度
            options.storedSizes[curColIndex] += leftEdge;
            this.setWidth(options.target, options.storedSizes[curColIndex]);

            // 对最后一列的列宽的整体处理方案：
            // 如果更新拖动列宽度后的表格的总宽度小于表格初始宽度，则将宽度差补偿到最后一列;
            // 如果更新拖动列宽度后的表格的总宽度大于表格初始宽度，且之前最后一列列宽有补偿时，
            // 将最后一列的补偿先抵消掉，然后有超出时再出滚动条

            // s: storeTableWidthChange(此次拖动前各列拖动值的累计和)
            // b: 此次拖动前给末列的补偿值
            // l: leftEdge(此次拖动的距离)
            //   s      l        s + l       b       此次拖动后对末列宽的设置
            //  -5     -1       -6 < 0      +5          +1(-leftEdge)
            //  -5     +3       -2 < 0      +5          -3(-leftEdge)
            //  +5     -8       -3 < 0       0          +3(-(storeColsWidthChange+leftEdge))
            //  -5     +8        3 > 0      +5          -5(+storeColsWidthChange)
            //  +5     +3        8 > 0       0          +0(不做处理)
            //  +5     -3        2 > 0       0          +0(不做处理)
            if (leftEdge + options.storeTableWidthChange < 0) {
                if (options.storeTableWidthChange < 0) {
                    options.storedSizes[lastColIndex] -= leftEdge;
                } else {
                    options.storedSizes[lastColIndex] -= (leftEdge + options.storeTableWidthChange);
                }
            } else {
                if (options.storeTableWidthChange < 0) {
                    options.storedSizes[lastColIndex] += options.storeTableWidthChange;
                }
            }

            this.setWidth(options.ths[lastColIndex], options.storedSizes[lastColIndex]);

            // 更新各列拖动相对值的累计和
            options.storeTableWidthChange += leftEdge;

            // 表头锁定
            if (this.tableCom.isFixedHead) {

                // 更新第二个表格（bodyTable）中的当前列和最后一列的宽度
                this.setWidth(options.secondThs[curColIndex], options.storedSizes[curColIndex]);
                this.setWidth(options.secondThs[options.secondThs.length - 1], options.storedSizes[lastColIndex]);

                this.fixedHeadService.handleYNotOverflowedWithX(this.resizableOpts, this.tableCom.tbodyContainer);

                // 当横向滚动条出现导致纵向滚动条出现时对账本做处理
                this.fixedHeadService.handleYOverflowedWithX(this.resizableOpts, this.tableCom.tbodyContainer);

                // 纵向滚动条状态变化时对固定的表头右边填充块的处理
                this.fixedHeadService.processOverflowY(this.tableCom.theadContainer, this.tableCom.tbodyContainer, this.tableCom);
            }

            if (this.tableCom.fixedColumnInfo.hasFixedColumn) {
                this.tableCom.thResizeSubject.next({
                    th: options.target,
                    leftEdge,
                    resizableOpts: this.resizableOpts
                });
                const container: any = this.tableCom.fixedColumnInfo.container;
                if (container) {
                    const scrollLeft: number = container.scrollLeft;
                    const isRightColumnFloat: boolean = scrollLeft + container.clientWidth < container.scrollWidth;
                    this.tableCom.containerScrollXChangeSubject.next({
                        scrollLeft,
                        isRightColumnFloat
                    });
                }
            }
        }

        // 更新光标位置
        options.mouseXPosition = event.pageX;
    }

    private getColMinWidth(thElement: any): number {
        // 此处的值是文本区所占最小宽度；当容器宽度小于此值时，文本会完全显示，但超出部分会直接被截断。
        // Chrome 和 IE下省略号'...'所占宽度大概为10px;
        // Firefox 下出现省略号'...'所占宽度大概为49px(中文字符)；
        // 此处为保证三个浏览器都表现正常，并根据规范4.0取值50(49 + 1, 1为矫正偏差值)。
        let minWidth: number = 50;

        minWidth += parseFloat(window.getComputedStyle(thElement).paddingLeft) +
            parseFloat(window.getComputedStyle(thElement).paddingRight);
        const sortEle: any = this.tiRenderer.findChildrenByClassName(thElement, 'ti3-sort-container')[0];
        const iconsEle: any = this.tiRenderer.findChildrenByClassName(thElement, 'ti3-cell-icons-container')[0];
        const headFilterEle: any = this.tiRenderer.findChildrenByClassName(thElement, 'ti3-head-filter-container')[0];

        if (sortEle) {
            const sortWidth: number = parseFloat(sortEle.getBoundingClientRect().width
                .toFixed(1));
            minWidth += sortWidth;
        }

        if (iconsEle) {
            const filterWidth: number = parseFloat(iconsEle.getBoundingClientRect().width
                .toFixed(1));
            minWidth += filterWidth;
        }

        if (headFilterEle) {
            const headFilterWidth: number = parseFloat(headFilterEle.getBoundingClientRect().width
                .toFixed(1));
            minWidth += headFilterWidth;
        }

        return minWidth;
    }

    private setTableWidthChange(): void {
        const tableContainer: any = this.tiRenderer.findChildrenByClassName(this.hostEle, 'ti3-resize-wrapper')[0];
        // 表格容器自身宽度（不包括Y方向滚动条的宽度）
        const clientWidth: number = tableContainer ? tableContainer['clientWidth'] : 0;
        // 表格容器实际内容区域宽度
        const scrollWidth: number = tableContainer ? tableContainer['scrollWidth'] : 0;

        // resizableOpts.storeColsWidthChange为各列拖动相对值的累计和
        // 将表格内容溢出部分的宽度赋给各列拖动相对值的累计和
        this.resizableOpts.storeTableWidthChange = scrollWidth - clientWidth;
    }

    private stopResize(): void {
        this.updateStoredSizes();
        this.resizableOpts.mouseXPosition = 0;
        this.resizableOpts.target = null;
        if (this.tableCom.isFixedHead) {
            this.resizableOpts.xScrollState = this.overflowedX();
            this.resizableOpts.yScrollState = this.overflowedY();
        }
    }

    private getTable(): any {
        // 用户给table元素加父容器，通过父容器设置overflow属性
        const tableContainerClassName: string = this.tableCom.isFixedHead ? 'ti3-table-fixed-head' : 'ti3-resize-wrapper';
        const tableContainer: any = this.tiRenderer.findChildrenByClassName(this.hostEle, tableContainerClassName)[0];
        const table: any = tableContainer.children[0].nodeName === 'TABLE' ? tableContainer.children[0] : null;

        return table;
    }

    /**
     * @ignore
     */
    public isLastColumn(th: any): boolean {
        const parentElement: any = th.parentElement;
        if (!parentElement) {
            return true;
        }
        const ths: any = th.parentElement.children;
        const index: number = Array.from(ths)
            .indexOf(th);

        return index === ths.length - 1;
    }

    // 当光标移到感应区时，出现拖动分割线
    private createDividingLine(th: any): void {
        this.renderer.addClass(th, 'col-resize-active');

        const index: number = Array.from(th.parentElement.children)
            .indexOf(th);
        const bodyTable: any = this.tableCom.isFixedHead ? this.resizableOpts.secondTable : this.resizableOpts.table;
        // 防止不存在tbody的场景报错
        if(!bodyTable.children[1]){
            return;
        }
        const trs: Array<any> = Array.from(bodyTable.children[1].children)
            .filter((tr: any) => {
                return this.needDividingLine(tr);
        });
        trs.forEach((tr: any) => {
            // 分组场景index 大于tr.children.length
            if (!tr.children[index]) {
                return;
            }
            this.renderer.addClass(tr.children[index], 'col-resize-active');
        });
    }

    // 当光标离开感应区时，拖动分割线消失
    private removeDividingLine(): void {
        const bodyTable: any = this.tableCom.isFixedHead ? this.resizableOpts.secondTable : this.resizableOpts.table;
        const ths: Array<any> = Array.from(this.resizableOpts.table.children[0].children[0].children);

        ths.forEach((th: Element) => {
            this.renderer.removeClass(th, 'col-resize-active');
        });

        // 防止不存在tbody的场景报错
        if(!bodyTable.children[1]) {
            return;
        }
        const trs: Array<any> = Array.from(bodyTable.children[1].children);
        trs.forEach((tr: Element) => {
            if (!this.needDividingLine(tr)) {
                return;
            }
            Array.from(tr.children)
                .forEach((td: any) => {
                    this.renderer.removeClass(td, 'col-resize-active');
            });
        });
    }

    private updateTableInfo(): void {
        this.resizableOpts.ths = TiColsResizableDirective.getThs(this.resizableOpts.table);
        this.updateStoredSizes(); // 保存最新宽度
        this.setComputedWidth(); // 设置最新宽度
    }

    private initStorageColsWidth():void {

        this.resizableOpts.ths = TiColsResizableDirective.getThs(this.resizableOpts.table);
        this.resizableOpts.storedSizes = this.tableCom.localStorageState['colsWidth'];
        this.setComputedWidth();
        // 各列宽度设置后，可能出现滚动条，所以要计算一次 storeTableWidthChange的值
        this.setTableWidthChange();
    }

    /**
     * @ignore
     * 将当前表格各列的宽度更新到到resizableOpts.storedSizes中
     */
    public updateStoredSizes = (): void => {
        this.resizableOpts.storedSizes = [];
        this.resizableOpts.ths.forEach((th: any, index: number) => {
            this.tiRenderer.setAttributes(th, {'ti-visible-index': index});
            this.resizableOpts.storedSizes[index] = TiColsResizableDirective.getWidth(th);
        });
        // 更新表格记忆
        if(this.tableCom.storageId&&this.tableCom.storageConfig.colsWidth){
            this.tableCom.localStorageState['colsWidth']= this.resizableOpts.storedSizes;
        }
    }

    private setComputedWidth(): void {
        if (this.resizableOpts.table && this.resizableOpts.ths && this.resizableOpts.ths.length) {
            this.resizableOpts.ths.forEach((th: any, index: number) => {
                this.setWidth(th, this.resizableOpts.storedSizes[index]);
                // 表头锁定
                if (this.tableCom.isFixedHead) {
                    this.resizableOpts.secondThs = TiColsResizableDirective.getThs(this.resizableOpts.secondTable);
                    this.setWidth(this.resizableOpts.secondThs[index], this.resizableOpts.storedSizes[index]);
                }
            });
        }
    }

    /**
     * @ignore
     */
    public setWidth = (element: any, width: number): void => {
        this.renderer.setStyle(element, 'width', width + 'px');
    }

    // 将表格宽度设置为默认宽度
    private setDefaultWidth(): void {
        const ths: Array<any> = this.resizableOpts.ths = TiColsResizableDirective.getThs(this.resizableOpts.table);
        // 列隐藏或显示后，将各列宽设置为初始用户设置的列宽
        ths.forEach((th: any) => {
            const width: string = th.getAttribute('width') ? th.getAttribute('width') : '';
            // 注意：设置列宽的方式有多种，此处统一默认以width属性设置的宽为准
            this.renderer.setStyle(th, 'width', width);
        });

        // 表头锁定
        if (this.tableCom.isFixedHead) {
            const secondTable: any = this.getSecondTable();
            const secondThs: Array<any> = TiColsResizableDirective.getThs(secondTable);
            this.resizableOpts.secondThs = secondThs;
            this.resizableOpts.xScrollState = this.overflowedX();
            this.resizableOpts.yScrollState = this.overflowedY();

            secondThs.forEach((th: any) => {
                const width: string = th.getAttribute('width') ? th.getAttribute('width') : '';
                // 注意：设置列宽的方式有多种，此处统一默认以width属性设置的宽为准
                this.renderer.setStyle(th, 'width', width);
            });
            this.fixedHeadService.processYScrollStateChange(this);
        }
        this.setTableWidthChange();
    }

    // 当列拖动进行时去掉文字可选样式(user-select: none)
    private toggleTextSelection(toggle: boolean): void {
        const body: any = this.document.body;
        if (toggle) {
            this.renderer.addClass(body, 'ti3-unselectable');
            this.renderer.setAttribute(body, 'unselectable', 'on');
        } else {
            this.renderer.removeClass(body, 'ti3-unselectable');
            body.removeAttribute('unselectable');
        }
    }

    private needDividingLine(tr: any): boolean {
        return this.tableCom.needTr(tr);
    }

    // 供表头锁定使用
    private getSecondTable(): Element {
        const secondTableContainer: any = this.tiRenderer.findChildrenByClassName(this.hostEle, 'ti3-resize-wrapper')[0];

        return secondTableContainer ? secondTableContainer.children[0] : null;
    }

    private overflowedX(isNum?: boolean): any {
        return this.fixedHeadService.overflowedResult(this.tableCom.tbodyContainer, 'X', isNum);
    }

    private overflowedY(isNum?: boolean): any {
        return this.fixedHeadService.overflowedResult(this.tableCom.tbodyContainer, 'Y', isNum);
    }
}
