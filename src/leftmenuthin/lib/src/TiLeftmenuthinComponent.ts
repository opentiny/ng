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
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
  ElementRef,
  Renderer2,
  Optional
} from '@angular/core';
import { Util } from '@opentiny/ng-utils';
import { TiBaseComponent } from '@opentiny/ng-base';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';

export interface TiLeftmenuthinItem {
  /**
   * 设置当前菜单项对应的路由，与 Router.navigate方法的第一个参数一致
   */
  router: Array<any>;
  // routerExtras?: { relativeTo?: string, queryParams?: Object, fragment?: string };
  /**
   * 设置当前菜单项对应路由的配置信息，与 Router.navigate方法的第二个参数一致
   */
  routerExtras?: NavigationExtras;
  /**
   * 设置一个router路由列表，当该列表中的路由被激活时，其对应的菜单项被激活处于高亮状态。
   * 其使用场景为多个路由对应同一个左侧菜单项。
   *
   * routerList 数组中每一个元素与 Router.navigate方法的第一个参数一致
   */
  routerList?: Array<Array<any>>;
  /**
   * 选项label
   */
  label: string;
  /**
   * 选项图标名称
   */
  iconName?: string;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
/**
 * 组件功能与leftmenu组件相似，可以配置图标。
 *
 */
@Component({
  selector: 'ti-leftmenuthin',
  templateUrl: './leftmenuthin.html',
  styleUrls: ['./leftmenuthin.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiLeftmenuthinComponent extends TiBaseComponent {
  /**
   * 设置激活菜单项。
   *
   * 此接口是双向绑定的，设置时中括号“[]”和圆括号“()”要同时使用
   */
  @Input() active: TiLeftmenuthinItem;
  /**
   * 激活菜单项改变时向外通知
   */
  @Output() readonly activeChange: EventEmitter<TiLeftmenuthinItem> = new EventEmitter();
  /**
   * 点击菜单项触发此事件
   */
  @Output() readonly select: EventEmitter<TiLeftmenuthinItem> = new EventEmitter();
  /**
   * 当重复点击当前激活菜单项时，是否刷新右侧内容区；
   *
   * 该接口是双向绑定的，当重复点击当前激活菜单项时，reloadState的值会经历 true(上次的值) -> false -> true
   * 的变化过程，开发者给该接口与其右侧区域容器上ngIf接口绑定的是同一个变量，所以ngIf的值也会经历同样的变化，
   * 从而做到右侧内容区的刷新。
   */
  @Input() reloadState: boolean = true;
  /**
   * 菜单数据列表
   */
  @Input() items: Array<TiLeftmenuthinItem>;
  /**
   * 右侧内容区是否需要刷新的状态值改变时向外通知
   */
  @Output() readonly reloadStateChange: EventEmitter<boolean> = new EventEmitter();
  /**
   * @ignore
   */
  public readonly resolvedPromise: Promise<any> = Promise.resolve(null);
  /**
   * 标志量，是否为url改变(需要去改变active)
   */
  private isUrlChange: boolean = false;
  private navigationSubscription: Subscription;
  constructor(
    @Optional() private router: Router,
    @Optional() private activeRoute: ActivatedRoute,
    protected hostRef: ElementRef,
    protected renderer: Renderer2
  ) {
    super(hostRef, renderer);
  }
  ngOnInit(): void {
    super.ngOnInit();
    // 初始时右侧内容区默认显示，需使外部用户的reloadState值为true。
    // 双向绑定数据时，对初始传入的值立即修改并传出时会报错，
    // 此处参考ngModel源码setValue的处理，使用promise延后执行时序
    this.resolvedPromise.then(() => {
      this.reloadStateChange.emit(true);
    });
  }
  ngAfterViewInit(): void {
    // 直接输入url(刷新页面)改变状态时，leftmenu能同步修改激活状态
    const urlActiveItem: TiLeftmenuthinItem = this.getActiveItemByUrl(this.items);
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
    // 从非leftMenu处跳转改变状态时，leftmenu能同步修改激活状态
    this.navigationSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        const newActiveItem: TiLeftmenuthinItem = this.getActiveItemByUrl(this.items);
        if (newActiveItem && newActiveItem !== this.active) {
          this.active = newActiveItem;
          this.activeChange.emit(this.active);
          this.isUrlChange = true;
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const activeObj: SimpleChange = changes['active'];
    if (activeObj && !activeObj.firstChange) {
      if (!this.isUrlChange) {
        this.link();
        this.isUrlChange = false;
      } else {
        this.navigate(activeObj.currentValue);
      }
    }
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  /**
   * @ignore
   * 模板中使用
   */
  public selectFn(item: any): void {
    const oldactive: TiLeftmenuthinItem = this.active;
    const newactive: TiLeftmenuthinItem = item;
    // 点击当前已经激活的item时，刷新对应路由
    if (newactive === oldactive) {
      this.triggerReload(item);
    } else if (newactive !== oldactive) {
      this.active = newactive;
      this.navigate(item);
      this.activeChange.emit(this.active);
    }
    this.select.emit(item);
  }
  /**
   * @ignore
   * 点击当前选中项时，触发内容区重载
   * @param item 当前点击项
   */
  public triggerReload(item: TiLeftmenuthinItem): void {
    // 使reloadState由false变为true,配合内容区的ngIf做到内容区的重载
    this.reloadStateChange.emit(false);
    setTimeout(() => {
      this.reloadStateChange.emit(true);
      this.navigate(item);
    }, 0);
  }
  private navigate(item: TiLeftmenuthinItem): void {
    this.router.navigate(item.router, this.getNavigationExtras(item.routerExtras));
  }
  private getNavigationExtras(routerExtras: Object): Object {
    return { relativeTo: this.activeRoute, ...routerExtras };
  }
  private getActiveItemByUrl(arr: Array<any>): TiLeftmenuthinItem {
    let resultItem: TiLeftmenuthinItem;
    for (const item of arr) {
      if (this.isActived(item)) {
        resultItem = item;

        return resultItem;
      }
    }

    return resultItem;
  }
  private isActived(item: TiLeftmenuthinItem): boolean {
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
  private getRelativeRoute(routerExtras: Object): NavigationExtras {
    if (!routerExtras || !routerExtras['relativeTo']) {
      return { relativeTo: this.activeRoute };
    }

    return { relativeTo: routerExtras['relativeTo'] };
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
}
