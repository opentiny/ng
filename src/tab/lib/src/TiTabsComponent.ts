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
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TiTabComponent } from './TiTabComponent';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiDroplistComponent } from '@opentiny/ng-droplist';
import { TiPositionType, Util } from '@opentiny/ng-utils';
import packageInfo from '../package.json';
/**
 * TiTabs组件属于布局组件，通过该组件产品可以实现不同视图的切换功能。
 *
 * 其内部包含2个组件 TiTab 和 TiTabHeader
 *
 */
@Component({
  selector: 'ti-tabs',
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-tabs-container]': 'true' // 给host添加类ti-tabs-container替代之前的组件模板内部的最外层div
  }
})
export class TiTabsComponent extends TiBaseComponent implements AfterViewInit, AfterViewChecked, OnInit, OnDestroy {
  /**
   * 下拉面板的宽度。
   *
   * 1."justified": 下拉面板宽度与页签项宽度保持一致；
   *
   * 2."auto": 下拉面板宽度根据下拉项的内容自动撑开；
   *
   * 3.固定的下拉面板宽度: 不小于页签项的宽度，例如："200px"；
   *
   */
  @Input() panelWidth: string = '100px';
  /**
   * 下拉面板对齐方式
   *
   */
  @Input() panelAlign: 'left' | 'right' = 'right';
  /**
   * 下拉面板最大高度
   *
   */
  @Input() panelMaxHeight: string;
  /**
   * 下拉项超长文本提示方向
   *
   * @ignore
   */
  @Input() tipPosition: TiPositionType = 'left';
  /**
   * @ignore
   */
  @ViewChild('slider', { static: true }) slider: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('tabContentContainer', { static: true })
  tabContentContainer: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('more', { static: true }) moreRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('moreIcon', { static: true }) moreIconRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('tabsList', { static: true }) tabsListRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('tabsHeader', { static: true }) tabsHeaderRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('tabsContainer', { static: true }) tabsContainerRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('droplist', { static: true }) dropListComp: TiDroplistComponent;
  /**
   * @ignore
   */
  public labelKey: string = 'header';
  /**
   * @ignore
   * 下拉项
   */
  public options: Array<any> = [];
  /**
   * 被点击tab项
   */
  public clickTab: TiTabComponent;
  /**
   * @ignore
   */
  public onlistenClick: () => void;
  /**
   * @ignore
   */
  public windowResizeListener: () => void;
  /**
   * @ignore
   * TiTabs中包裹的所有的 TiTabComponent 集合
   */
  public tabs: Array<TiTabComponent> = [];
  /**
   * @ignore
   */
  public selectedTab: TiTabComponent; // 当前选中的tab
  private isNotVisibleInit: boolean = false; // 标志初始时是否可见
  /**
   * @ignore
   * TiTabComponent.ts中使用
   */
  public destroyed: boolean = false;
  /**
   * @ignore
   * 是否显示滑动条slider（一级页签显示，二级/暗色页签不显示）
   * TiTabHeaderComponent.ts中使用
   */
  public hasSlider: boolean = false;
  /**
   * @ignore
   * 是否溢出
   * TiTabHeaderComponent.ts中使用
   */
  public overflow: boolean = false;
  /**
   * @ignore
   * TiTabHeaderComponent.ts中使用
   */
  public headerWidthChange: boolean = false;
  protected versionInfo: string = super.getVersion(packageInfo);
  private resolvedPromise: Promise<any> = Promise.resolve(null);
  private tabsResizeObserver: any;
  /**
   * @ignore
   * 下拉选中项变更时触发
   */
  public onDroplistChange($event: any): void {
    this.tabs.forEach((item: any) => {
      if (item.id === this.selectedTab.id) {
        if (item.beforeActiveChange.observers.length === 0) {
          this.changeActive(item);
        } else {
          this.clickTab = item;
          item.beforeActiveChange.emit(this);
        }
      }
    });
  }
  /**
   * @ignore
   * 点击下拉按钮打开下拉面板
   */
  public showMorePanel(event: MouseEvent): void {
    if (this.dropListComp.isShow) {
      this.dropListComp.hide();

      return;
    }
    this.dropListComp.show();
    event.stopPropagation();
  }
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    public tiRenderer: TiRenderer,
    private zone: NgZone,
    @Inject(DOCUMENT) private document,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer2);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // 初始化是否显示滑动条slider（一级页签显示，二级/暗色页签不显示）
    this.hasSlider = !this.nativeElement.hasAttribute('level2') && !this.nativeElement.hasAttribute('dark');
  }

  ngAfterViewInit(): void {
    super.ngAfterContentInit();
    if (this.hasSlider) {
      // 如果祖先元素中display为none，获取到的组件的宽度为0,元素不可见
      this.isNotVisibleInit = this.nativeElement.clientWidth === 0;
    }
    this.zone.runOutsideAngular(() => {
      // 点击documnet优惠信息窗口关闭
      this.onlistenClick = this.renderer2.listen(this.document, 'click', () => this.dropListComp.hide());
      if (typeof window === 'undefined') {
        return;
      }
      this.windowResizeListener = this.renderer2.listen(window, 'resize', () => {
        this.setMoreStyle();
        this.setTabStyle(true);
      });

      if (this.isNotVisibleInit && (window as any).ResizeObserver) {
        // 利用 ResizeObserver 来监听tabs的尺寸发生改变的时机。IE不支持 ResizeObserver。
        this.tabsResizeObserver = new (window as any).ResizeObserver((entries: any): void => {
          // 初始祖先元素中display为none，之后第一次由none变成可见时
          if (entries[0] && entries[0].contentRect.width !== 0) {
            this.setTabStyle(false);
            this.tabsResizeObserver.disconnect();
          }
        });
        this.tabsResizeObserver.observe(this.nativeElement);
      }
    });
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    // 此处执行晚于TiTabHeaderComponent的ngAfterViewChecked
    if (this.headerWidthChange) {
      this.setTabStyle(false);
      this.headerWidthChange = false;
      this.setMoreStyle();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.windowResizeListener) {
      this.windowResizeListener();
    }
    if (this.onlistenClick) {
      this.onlistenClick();
    }
    if (this.tabsResizeObserver) {
      this.tabsResizeObserver.disconnect();
    }
  }
  /**
   * @ignore
   */
  public setMoreStyle(): void {
    if (this.isOverflow()) {
      this.renderer2.setStyle(this.moreRef.nativeElement, 'display', 'block');
    } else {
      this.renderer2.setStyle(this.moreRef.nativeElement, 'display', 'none');
    }
  }

  /**
   * @ignore
   * TiTabComponent.ts 中调用
   */
  public addTab(tab: TiTabComponent): void {
    if (tab.active) {
      this.tabs.forEach((item: TiTabComponent) => {
        if (item.active) {
          this.setActiveValue(item, false);
        }
      });
    }
    this.tabs.push(tab);
    const tabElements: Array<any> = Array.from(this.tabContentContainer.nativeElement.children);
    this.tabs.sort((a: TiTabComponent, b: TiTabComponent): number => {
      return tabElements.indexOf(a.nativeElement) - tabElements.indexOf(b.nativeElement);
    });
    if (!tab.active && this.selectedTab && tabElements.indexOf(tab.nativeElement) < tabElements.indexOf(this.selectedTab.nativeElement)) {
      setTimeout(() => {
        this.setTabStyle(true);
      }, 0);
    }
    this.options = this.tabs;
    setTimeout(() => {
      this.setMoreStyle();
    }, 0);
    // tabs动态增删，onpush模式视图未更新
    this.changeDetectorRef.markForCheck();
  }
  /**
   * @ignore
   * TiTabComponent.ts 中调用
   */
  public removeTab(tab: TiTabComponent): void {
    const index: number = this.tabs.indexOf(tab);
    const length: number = this.tabs.length;
    this.tabs.splice(index, 1);

    setTimeout(() => {
      this.setMoreStyle();
    }, 0);

    // 删除当前激活状态的tab
    if (tab.active && length > 1) {
      const newActiveIndex: number = this.getNewActiveIndex(index, length);
      if (newActiveIndex !== -1) {
        this.changeActive(this.tabs[newActiveIndex]);
      }

      return;
    }

    // 删除的是非激活状态的tab,那么就在删除后的tabs数组中查找剩下的哪一个tab是激活状态，再设置激活状态；
    if (!tab.active) {
      setTimeout(() => {
        this.setTabStyle(true);
      }, 0);
    }
  }
  /**
   * @ignore
   * TiTabComponent.ts 中调用
   */
  public activeTab(selectedTab: TiTabComponent, enableAnimate: boolean): void {
    this.deActiveOthers(selectedTab);

    selectedTab.loaded = true;

    this.selectedTab = selectedTab;
    // onpush模式下，懒加载页签内容不刷新
    this.selectedTab.changeDetectorRef.markForCheck();
    // 只有不是灰化状态时，才触发切换动效
    if (!selectedTab.disabled) {
      // 添加定时器，处理ngFor未渲染完毕，获取到得silder的位置不准确
      setTimeout(() => {
        // 初始化激活时没有动效
        this.setTabStyle(enableAnimate);
      }, 0);
    }
  }

  private deActiveOthers(selectTab: TiTabComponent): void {
    this.tabs.forEach((tab: TiTabComponent) => {
      if (tab.active && tab !== selectTab) {
        // 处理有路由存在情况下，点击浏览器后退按钮，上一次选中项处于聚焦状态，导致两个页签高亮 #2136
        if (tab.headNode && tab.headNode.parentNode) {
          tab.headNode.parentNode.blur();
        }

        this.setActiveValue(tab, false);
      }
    });
    // 通过其他方式（非直接点击页签）修改tab.active，页面激活效果未更新（onPush问题）
    this.changeDetectorRef.markForCheck();
  }

  /**
   * @ignore
   */
  public click(tab: TiTabComponent): void {
    if (tab.disabled || tab.active) {
      return;
    }
    if (tab.beforeActiveChange.observers.length === 0) {
      this.changeActive(tab);
    } else {
      this.clickTab = tab;
      tab.beforeActiveChange.emit(this);
    }
  }
  /**
   * 页签激活状态变更后执行
   */
  public changeActive(tab: TiTabComponent): void {
    this.setActiveValue(tab, true);
    this.activeTab(tab, true);
  }

  // 删除当前激活状态的tab后，需要激活下一个active tab
  private getNewActiveIndex(index: number, length: number): number {
    // 如果删除的当前激活状态的tab是最后一个，
    // 那么下一个激活的tab就是从右到左第一个不是禁用的tab
    if (index === length - 1) {
      for (let i: number = index - 1; i >= 0; i--) {
        if (!this.tabs[i].disabled) {
          return i;
        }
      }
      // 如果删除的当前激活状态的tab不是最后一个，
      // 那么下一个激活的tab就是从左到右第一个不是禁用的tab
    } else {
      for (let i: number = index; i < this.tabs.length; i++) {
        if (!this.tabs[i].disabled) {
          return i;
        }
      }
    }

    return -1;
  }

  /**
   * @ignore
   * 设置页签样式
   */
  public setTabStyle(enableAnimate: boolean): void {
    const targetTab: any = this.selectedTab && this.selectedTab.headNode.parentNode.parentNode;
    // 容错处理：没有获取到DOM时直接return；
    if (Util.isUndefined(targetTab) || !targetTab.classList.contains('ti3-tab-li')) {
      return;
    }
    // 获取该页签的偏移量
    const tagetLeft: number = targetTab.offsetLeft;
    // 需要显示滑动条时设置滑动条的样式及动效
    if (this.hasSlider) {
      // 修复SSR错误：ERROR TypeError: targetTab.getBoundingClientRect is not a function
      const targetWidth: number =
        typeof targetTab.getBoundingClientRect === 'function' ? parseFloat(targetTab.getBoundingClientRect().width.toFixed(2)) : 0;
      const transitionSet: string = enableAnimate ? 'left 0.1s ease-in-out' : 'none';
      this.tiRenderer.setStyles(this.slider.nativeElement, {
        transition: transitionSet,
        width: `${targetWidth}px`,
        left: `${tagetLeft}px`
      });
    }
    this.setTabScroll(targetTab, tagetLeft);
  }
  // 设置页签超长滑动动效
  private setTabScroll(target: any, distance: number): void {
    const moreWidth: number = this.moreRef && this.moreRef.nativeElement.offsetWidth;
    const tabsHeaderWidth: number = this.tabsHeaderRef && this.tabsHeaderRef.nativeElement.offsetWidth;
    const listWidth: number = this.tabsListRef && this.tabsListRef.nativeElement.offsetWidth;
    // 修复SSR错误：ERROR TypeError: this.tabsContainerRef.nativeElement.getBoundingClientRect is not a function
    if (typeof this.tabsContainerRef.nativeElement.getBoundingClientRect !== 'function') {
      return;
    }
    const tabsContainerClientRect: any = this.tabsContainerRef && this.tabsContainerRef.nativeElement.getBoundingClientRect();
    const targetClientRect: any = target.getBoundingClientRect();
    // 1、条件1和2：激活项能在当前屏范围内完全显示时
    // 2、尾部页签紧贴右侧时（页签动态删减，导致尾部页签没有紧贴右侧 #15412）
    // 同时满足，tabs无需滑动
    if (
      targetClientRect.x >= tabsContainerClientRect.x &&
      targetClientRect.x <= tabsContainerClientRect.x + tabsContainerClientRect.width - moreWidth - targetClientRect.width &&
      tabsHeaderWidth <= listWidth + moreWidth
    ) {
      return;
    }

    let marginLeftDistance: number = distance;
    const maxDistance: number = this.tabsListRef.nativeElement.scrollWidth - tabsContainerClientRect.width + moreWidth;
    if (maxDistance > 0) {
      if (distance >= maxDistance) {
        marginLeftDistance = maxDistance;
      }
    } else {
      marginLeftDistance = 0;
    }
    this.renderer2.setStyle(this.tabsHeaderRef.nativeElement, 'transition', 'margin-left 0.1s ease-in-out');
    this.renderer2.setStyle(this.tabsHeaderRef.nativeElement, 'margin-left', -marginLeftDistance + 'px');
  }

  private setActiveValue(tab: TiTabComponent, value: boolean): void {
    // 双向数据绑定时，初始传入的值不合法立即修改并传出时会报错。
    // 此处参考ngModel源码setValue的处理，使用promise延后执行时序
    this.resolvedPromise.then(() => {
      tab.active = value;
      tab.activeChange.emit(value);
      // tab快捷键操作时，active状态未及时更新
      this.changeDetectorRef.markForCheck();
    });
  }

  /**
   * @ignore
   */
  public trackByFn(index: number, item: any): Node {
    return item.headNode;
  }

  // 空间不足时，出现下拉面板
  private isOverflow(): boolean {
    const headerWidth: number = this.tabsContainerRef.nativeElement.offsetWidth;
    const listWidth: number = this.tabsListRef.nativeElement.scrollWidth;
    const moreWidth: number = this.moreRef.nativeElement.offsetWidth;

    this.overflow = headerWidth - moreWidth < listWidth;

    return this.overflow;
  }
}
