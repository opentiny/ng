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
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    Optional,
    Output,
    Renderer2,
    SimpleChange,
    SimpleChanges,
    ViewEncapsulation,
    Inject,
    ChangeDetectionStrategy,
    IterableDiffer,
    IterableDiffers
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router, UrlTree } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { Util } from '../../utils/Util';
import { TiBaseComponent } from '../base/TiBaseModule';
import { TiLeftmenuLevel1Component } from './TiLeftmenuLevel1Component';
import { TiRenderer } from '../../services/renderer/TiRenderer';

/**
 * 左侧菜单各项数据接口
 *
 * 是TiLeftmenuLevel1 和 TiLeftmenuLevel2 组件的 item 接口的数据类型
 */
export interface TiLeftmenuItem {
    /**
     * 设置当前菜单项对应的路由，与 Router.navigate方法的第一个参数一样
     */
    router?: Array<any>;
    /**
     * 设置当前菜单项对应路由的配置信息，与 Router.navigate方法的第二个参数一样
     */
    routerExtras?: NavigationExtras;
    /**
     * 设置一个router路由列表，当该列表中的路由被激活时，其对应的菜单项被激活处于高亮状态。
     * 其使用场景为多个路由对应同一个左侧菜单项。
     *
     * routerList 数组中每一个元素与 Router.navigate方法的第一个参数一样
     */
    routerList?: Array<Array<any>>; // 数组中元素也为数组
    /**
     * 链接地址，点击后路由激活项不变，在新页面打开配置地址。
     *
     */
    href?: string;
    /**
     * 设置分界线（只支持一级菜单），在设置该属性菜单项的底部生成一条区块分界线。
     *
     */
    showDividingLine?: boolean;
    /**
     * 允许有多余的属性字段
     */
    [propName: string]: any;
}
/**
 * TiLeftmenu组件提供了一种方便灵活实现页面布局左侧菜单的方式，支持两级菜单。
 *
 * 其内部包含5个组件:
 *
 * TiLeftmenu : 左侧菜单最外层的指令；
 *
 * TiLeftmenuGroup: 菜单分组指令；
 *
 * TileftmenuGroupItem：分组文本内容指令；
 *
 * TiLeftmenuHead : 菜单头部内容指令；
 *
 * TiLeftmenuLevel1 ：一级菜单指令；
 *
 * TiLeftmenuItem ：一级菜单文本内容指令；
 *
 * TiLeftmenuLevel2 ：二级菜单指令。
 *
 */
@Component({
    selector: 'ti-leftmenu',
    templateUrl: './leftmenu.html',
    styleUrls: ['./leftmenu.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-leftmenu-container]': 'true',
        '[class.ti3-leftmenu-hide]': 'collapsed'
    },
    encapsulation: ViewEncapsulation.None
})
export class TiLeftmenuComponent extends TiBaseComponent {
    /**
     * 设置激活菜单项，值必须是 TiLeftmenuItem 类型，且需要是 TiLeftmenuLevel1 或 TiLeftmenuLevel2 的成员之一。
     * 注意：该属性必须双向绑定
     */
    @Input() active: TiLeftmenuItem;
    /**
     * 激活菜单项改变时向外通知
     * @ignore
     */

    @Output() readonly activeChange: EventEmitter<TiLeftmenuItem> = new EventEmitter();
    /**
     * 当重复点击当前激活菜单项时，通过此属性控制路由刷新。
     * 注意：该属性必须双向绑定
     */
    @Input() reloadState: boolean = true;
    /**
     * 右侧内容区是否需要刷新的状态值改变时向外通知
     * @ignore
     */
    @Output() readonly reloadStateChange: EventEmitter<boolean> = new EventEmitter();
    // routable接口在3.0.3版本起对外隐藏，10.0.1重新开放
    /**
     * 是否使用路由来控制菜单对应内容显示/隐藏，默认使用路由。
     */
    @Input() routable: boolean = true;
    /**
     * 是否开启左侧菜单面板可折叠功能，默认开启
     */
    @Input() toggleable: boolean = true;
    /**
     * 左侧菜单面板是否为收起状态，用于设置面板收起/展开状态，默认展开
     */
    @Input() collapsed: boolean = false;
    /**
     * 左侧菜单面板收起/展开状态改变时向外通知
     */
    @Output() readonly collapsedChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * @ignore
     * tiLeftmenu中包含的 TiLeftmenuLevel1Component 实例集合
     */
    public level1Items: Array<TiLeftmenuLevel1Component> = [];
    private navigationSubscription: Subscription;
    /**
     * @ignore
     */
    public readonly resolvedPromise: Promise<any> = Promise.resolve(null);
    /**
     * 标志量，是否为url改变(需要去改变active)
     */
    private isUrlChange: boolean = false;
    /**
     * @ignore
     */
    private panelContainer: any;

    private onHeadChange: (e: CustomEvent) => void; // console头部高度变化时触发

    private consoleDataService: any;
    /**
     * 滚动条的宽度, 在 TiLeftmenuFoot中也有使用
     * @ignore
     */
    public scrollWidth: number;
    private itemsDiffer: IterableDiffer<TiLeftmenuLevel1Component>;
    private headElement: HTMLElement;
    private placeholderEle: HTMLElement; // 占位元素
    constructor(elementRef: ElementRef, public renderer2: Renderer2,
        @Optional() private router: Router,
        @Optional() private activeRoute: ActivatedRoute,
        private iterableDiffers: IterableDiffers,
        private tiRenderer: TiRenderer, private zone: NgZone, @Inject(DOCUMENT) private document) {
        super(elementRef, renderer2);
    }

    // 判断item的router是否是父路由下默认激活的子路由（即子路由与父路由路径一致）
    private static isDefaultActiveChildRoute(item: TiLeftmenuItem): boolean {
        // 默认激活的子路由的router可设为[]或['']
        return !item.router || item.router.length === 0 || item.router[0] === '';
    }

    ngOnInit(): void {
        super.ngOnInit();
        // 初始时右侧内容区默认显示，需使外部用户的reloadState值为true。
        // 双向绑定数据时，对初始传入的值立即修改并传出时会报错，
        // 此处参考ngModel源码setValue的处理，使用promise延后执行时序
        this.resolvedPromise.then(() => {
            this.reloadStateChange.emit(true);
        });
        this.scrollWidth = this.getScrollbarSize('Y');
        this.itemsDiffer = this.iterableDiffers.find(this.level1Items || []).create();

        // console头部高度变化需同步改变leftMenu的定位
        const consoleContext = (<any>window).getConsoleContext && (<any>window).getConsoleContext();
        this.consoleDataService = consoleContext?.get && consoleContext.get({ name: 'safearea' });
        this.onHeadChange = (e: CustomEvent) => {
            this.renderer2.setStyle(this.nativeElement, 'top', e.detail.top + 'px');
            this.renderer2.setStyle(this.nativeElement, 'left', e.detail.left + 'px');
            // COC场景下console左侧无sidebar,但是CUI工具会添加left:48px important,
            // 通过renderer2.setStyle方式添加的important不生效(原因不清楚)，所以通过添加class增加样式权重
            this.changeLeftMenuLeftPosition(e.detail.left);
        }
        // console初始化首次进来不会触发consoleDataService.onChange,需要根据getSafeArea()设置一次。
        if (this.consoleDataService?.getSafeArea) {
            const safeArea = this.consoleDataService.getSafeArea();
            this.renderer2.setStyle(this.nativeElement, 'top', safeArea.top + 'px');
            this.renderer2.setStyle(this.nativeElement, 'left', safeArea.left + 'px');
            // COC场景下console左侧无sidebar,但是CUI工具会添加left:48px important,
            // 通过renderer2.setStyle方式添加的important不生效(原因不清楚)，所以通过添加class增加样式权重
            this.changeLeftMenuLeftPosition(safeArea.left);
        }
        // 头部高度变化会触发此事件
        if (this.consoleDataService?.onChange) {
            this.consoleDataService.onChange(this.onHeadChange);
        }
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (!this.routable) {
            return;
        }

        this.changeLeftmenuState();
        // 从非leftMenu处跳转改变状态时，leftmenu能同步修改激活状态
        this.navigationSubscription = this.router.events.subscribe((evt: any) => {
            if (evt instanceof NavigationEnd) {
                const newActiveItem: TiLeftmenuItem = this.getActiveItemByUrl(this.level1Items);
                if (newActiveItem && newActiveItem !== this.active) {
                    this.active = newActiveItem;
                    this.activeChange.emit(this.active);
                    this.isUrlChange = true;
                }
            }
        });
        this.headElement = this.nativeElement.querySelector('.ti3-leftmenu-head');
        if (!this.headElement) {
            return; // 如果头部元素ti3-leftmenu-head不存在，return停止以下克隆头部元素的操作
        }
        this.panelContainer = this.nativeElement.querySelector('.ti3-leftmenu-panel-container');

        let headElementRect: any;
        const headParentnode: HTMLElement = this.renderer2.parentNode(this.headElement);

        let headEleWidth: number;
        let headEleHeight: number;
        this.zone.runOutsideAngular((): void => { // 避免不停触发变化检测
            this.renderer2.listen(this.panelContainer, 'scroll', (): void => {
                const scrollTop: number = this.panelContainer.scrollTop;
                if (!headElementRect) {
                    headElementRect = this.headElement.getBoundingClientRect();
                    headEleWidth = headElementRect.width;
                    headEleHeight = headElementRect.height;
                }
                if (scrollTop > 0) {
                    if (!this.placeholderEle) {
                        this.placeholderEle = this.renderer2.createElement('div');
                        this.renderer2.setStyle(this.placeholderEle, 'height', `${headEleHeight}px`);

                        this.renderer2.setStyle(this.headElement, 'width', `${headEleWidth}px`);
                        this.renderer2.insertBefore(headParentnode, this.placeholderEle, this.headElement);

                        this.renderer2.addClass(this.headElement, 'ti3-leftmenu-head-clone');
                        this.nativeElement.appendChild(this.headElement);
                    }
                } else if (this.placeholderEle) {
                    this.renderer2.removeClass(this.headElement, 'ti3-leftmenu-head-clone');
                    this.renderer2.insertBefore(headParentnode, this.headElement, this.placeholderEle);
                    this.renderer2.setStyle(this.headElement, 'width', '100%');

                    this.placeholderEle.parentNode.removeChild(this.placeholderEle);
                    this.placeholderEle = undefined;
                }
            });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const activeObj: SimpleChange = changes['active'];
        if (activeObj && !activeObj.firstChange) {
            for (const level1Item of this.level1Items) {
                level1Item.setShowChildren();
                level1Item.setActiveState();
            }

            if (this.routable && !this.isUrlChange) {
                this.link();
            }

            this.isUrlChange = false;
        }
        // 监听到collapsed接口的值发生改变
        const collapsedObj: SimpleChange = changes['collapsed'];
        if (collapsedObj && !collapsedObj.firstChange) {
            this.collapsedHead();
        }
    }

    ngAfterViewChecked(): void {
        if (this.level1Items.length > 0 && this.routable) {
            const differ: any = this.itemsDiffer.diff(this.level1Items);
            if (differ) {
                this.changeLeftmenuState();
            }
        }
    }

    ngOnDestroy(): void {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
        if (this.consoleDataService?.offChange) {
            this.consoleDataService.offChange(this.onHeadChange);
        }
    }

    private changeLeftMenuLeftPosition(val: number) {
        if (val === 0) {
            this.renderer2.addClass(this.nativeElement, 'ti3-leftmenu-panel-no-sidebar')
        } else {
            this.renderer2.removeClass(this.nativeElement, 'ti3-leftmenu-panel-no-sidebar')
        }
    }

    private changeLeftmenuState(): void {
        // 直接输入url(刷新页面)改变状态时，leftmenu能同步修改激活状态
        const urlActiveItem: TiLeftmenuItem = this.getActiveItemByUrl(this.level1Items);
        if (urlActiveItem) {
            // 双向绑定数据时，对初始传入的值立即修改并传出时会报错，
            // 此处参考ngModel源码setValue的处理，使用promise延后执行时序
            this.resolvedPromise.then(() => {
                if (urlActiveItem !== this.active) {
                    this.isUrlChange = true;
                    this.active = urlActiveItem;
                    this.activeChange.emit(this.active);
                }
            });
        } else {
            this.link();
        }
    }
    /**
     * @ignore
     * 模板中使用
     */
    public toggleClickFn(): void {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }

    // 头部元素显示和隐藏的方法
    private collapsedHead(): void {
        if (this.placeholderEle) {
            if (this.collapsed) {
                this.renderer2.setStyle(this.headElement, 'display', 'none');
            } else {
                this.renderer2.removeStyle(this.headElement, 'display');
            }
        }
     // leftmenu展开/收起状态完成后，再触发事件
        setTimeout(() => {
            Util.trigger(document, 'tiReLayoutX');
        }, 0);
    }

    private getActiveItemByUrl(arr: Array<any>): TiLeftmenuItem {
        let resultItem: TiLeftmenuItem;
        for (const component of arr) {
            if (this.isActived(component.item)) {
                resultItem = component.item;
                if (TiLeftmenuComponent.isDefaultActiveChildRoute(component.item)) {
                    continue;
                } else {
                    return resultItem;
                }
            }

            if (component.children && component.children.length > 0) {
                const result: TiLeftmenuItem = this.getActiveItemByUrl(component.children);
                if (result) {
                    return result;
                }
            }
        }

        return resultItem;
    }

    private isActived(item: TiLeftmenuItem): boolean {
        const relativeRoute: NavigationExtras = this.getRelativeRoute(item.routerExtras);
        if (this.isMatchCurrentUrl(item.router, relativeRoute)) {
            return true;
        }

        if (Util.isArray(item.routerList) && item.routerList.length > 0) {
            for (const router of item.routerList) {
                if (this.isMatchCurrentUrl(router, relativeRoute)) {
                    return true;
                }
            }
        }

        return false;
    }

    private isMatchCurrentUrl(router: Array<any>, relativeRoute: NavigationExtras): boolean {
        if (!Util.isArray(router)) {
            return false;
        }

        const itemUrlTree: UrlTree = this.router.createUrlTree(router, relativeRoute);

        return this.router.isActive(itemUrlTree, false);
    }

    private link(): void {
        if (this.active) {
            this.navigate(this.active);
        }
    }
    /**
     * @ignore
     */
    public navigate(item: TiLeftmenuItem): void {
        if (TiLeftmenuComponent.isDefaultActiveChildRoute(item)) {
            //  routeConfig 可能为null
            if (!this.activeRoute.routeConfig) {
                return;
            }
            const path: string = this.activeRoute.routeConfig.path;
            const url: string = this.router.routerState.snapshot.url;
            const rootUrl: string = url.split(path)[0];
            // 绝对路径跳转
            this.router.navigate([rootUrl + path], item.routerExtras);
        } else {
            this.router.navigate(item.router, this.getNavigationExtras(item.routerExtras));
        }
    }

    /**
     * @ignore
     * 点击当前选中项时，触发内容区重载
     * @param item 当前点击项
     */
    public triggerReload(item: TiLeftmenuItem): void {
        // 使reloadState由false变为true,配合内容区的ngIf做到内容区的重载
        this.reloadStateChange.emit(false);
        setTimeout(() => {
            this.reloadStateChange.emit(true);
            // 如果当前路由就是item.router对应路由，则此导航不作用(路由相同)；
            // 如果当前路由是item.routerList中的路由，则需要跳转到item.router对应路由
            this.navigate(item);
        }, 0);
    }

    private getNavigationExtras(routerExtras: Object): Object {
        return { relativeTo: this.activeRoute, ...routerExtras };
    }

    private getRelativeRoute(routerExtras: Object): NavigationExtras {
        if (!routerExtras || !routerExtras['relativeTo']) {
            return { relativeTo: this.activeRoute };
        }

        return { relativeTo: routerExtras['relativeTo'] };
    }
    /**
 * 得到浏览器滚动条的宽度和高度
 * 代表滚动条的方向，取值为X or Y
 */
    private getScrollbarSize(direction: string): number {
        const outerDiv: any = this.renderer.createElement('div');
        const innerDiv: any = this.renderer.createElement('div');

        this.renderer.setStyle(innerDiv, 'width', '100%');
        this.renderer.setStyle(innerDiv, 'height', '100%');

        this.renderer.appendChild(outerDiv, innerDiv);
        this.tiRenderer.setStyles(outerDiv, {
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
            width: '100px',
            height: '100px',
            overflow: 'hidden'
        });

        this.renderer.appendChild(this.document.body, outerDiv);

        const field: string = direction === 'X' ? 'height' : 'width';
        const noScrollSize: number = typeof innerDiv.getBoundingClientRect === 'function' ? innerDiv.getBoundingClientRect()[field] : 0;
        this.renderer.setStyle(outerDiv, 'overflow', 'scroll');
        const withScrollSize: number = typeof innerDiv.getBoundingClientRect === 'function' ? innerDiv.getBoundingClientRect()[field] : 0;
        this.document.body.removeChild(outerDiv);

        return parseFloat((noScrollSize - withScrollSize).toFixed(1));

    }
}
