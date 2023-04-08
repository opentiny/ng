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
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subject, Subscription } from 'rxjs';

/**
 * 表格的表体虚拟滚动容器组件
 *
 *
 * 为了在原有表格表头锁定的基础上简化使用虚拟滚动且不增加dom层级，这里并没有让业务直接使用 @angular/cdk/scrolling 提供的 CdkVirtualScrollViewport(<cdk-virtual-scroll-viewport>) 组件，
 * 而是继承 CdkVirtualScrollViewport 来适配 TiTable。
 *
 * 相关代码参考 @angular/cdk/scrolling 提供的 CdkVirtualScrollViewport 组件。
 */
@Component({
  selector: '.ti3-table-container[itemSize]',
  templateUrl: './table-virtual-scroll-viewport.html',
  styleUrls: ['./table-virtual-scroll-viewport.less'],
  host: {
    '[class.ti3-table-virtual-scroll-viewport]': 'true',
    // _totalContentHeight 该变量虽然以下划线开头，但在 CdkVirtualScrollViewport 类中是 public 的，且在 CdkVirtualScrollViewport 组件的模板中也有使用
    '[style.height]': 'getTotalContentHeight()',
    // 初始化无数据时_totalContentHeight为空字符串，需要兼容这种情况
    '[class.ti3-table-virtual-scroll-viewport-nodata]': `getTotalContentHeight() === '0px'`
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      // 参考 CdkVirtualScrollViewport 组件的元数据配置
      provide: CdkVirtualScrollViewport,
      useExisting: TiTableVirtualScrollViewportComponent
    }
  ]
})
export class TiTableVirtualScrollViewportComponent extends CdkVirtualScrollViewport implements OnInit {
  private dataStreamSubscription: Subscription;
  /**
   *
   * 虚拟滚动容器中是否有 cdkVirtualFor 指令
   *
   * 使用表格时经常会在无数据或数据加载中时将 cdkVirtualFor 指令那块dom销毁隐藏掉(ngIf=false), 而在有数据时才会使用 cdkVirtualFor 指令渲染数据。
   *
   * hasCdkVirtualFor 为 true 时表示有 cdkVirtualFor 指令存在， 为 false 时表示此时 cdkVirtualFor 指令不存在。
   */
  private hasCdkVirtualFor: boolean = false;

  ngOnInit(): void {
    // 获取 .ti3-table-container 容器的子元素: table 元素
    const tableEle: any = this.elementRef.nativeElement.children[0];
    // 将子元素 table 作为 virtual-scroll-content-wrapper，类比 CdkVirtualScrollViewport 组件中的 .cdk-virtual-scroll-content-wrapper
    // 元素，从而做到不增加dom层级
    if (tableEle) {
      tableEle.className += 'ti3-table-virtual-scroll-content-wrapper';
      // 覆写 CdkVirtualScrollViewport 类中的 _contentWrapper 变量(该变量在CdkVirtualScrollViewport中是public)
      this._contentWrapper = new ElementRef(tableEle);
      super.ngOnInit();
    }
  }

  /**
   * @ignore
   *
   * cdkVirtualFor 指令在初始化时会调用 CdkVirtualScrollViewport 虚拟滚动容器中的 attach 方法
   *
   * 覆写 CdkVirtualScrollViewport 类中的 attach 方法。
   *
   * @param forOf cdkVirtualFor结构指令实例
   */
  public attach(forOf: CdkVirtualForOf<any>): void {
    super.attach(forOf);

    // 此时 cdkVirtualFor 指令初始化，即存在 dkVirtualFor 指令。
    this.hasCdkVirtualFor = true;

    // 这里可以获取到forOf: CdkVirtualForOf，在forOf.dataStream中可以获取数据改变(数据搜索过滤，排序，切换分页等)的时机，
    // 需要在这个时机将虚拟滚动容器滚动条置回顶部。
    this.ngZone.runOutsideAngular(() => {
      this.dataStreamSubscription = forOf.dataStream.subscribe((data: any): void => {
        this.elementRef.nativeElement.scrollTop = 0;
      });
    });

    // 使用表格时经常会是 CdkVirtualScrollViewport 虚拟滚动容器(即该组件)一直存在，而在无数据或数据加载中时将 cdkVirtualFor 指令
    // 那块dom销毁隐藏掉(ngIf=false), 有数据时才会使用 cdkVirtualFor 指令渲染数据。在 cdkVirtualFor 指令部分动态切换（生成或销毁）过程中，
    // 销毁后再生成时，需要手动触发渲染一次数据，不然出现空白数据渲染不出来。
    setTimeout(() => {
      // 需延时等 cdkVirtualFor 指令拿到数据集
      // 研究源码发现此方法可触发使 cdkVirtualFor 指令进行计算渲染数据
      (this.renderedRangeStream as Subject<any>).next(this.getRenderedRange());
    }, 0);
  }

  /**
   * @ignore
   *
   * cdkVirtualFor 指令在 OnDestroy 时会调用 CdkVirtualScrollViewport 虚拟滚动容器中的 detach 方法。
   *
   * 覆写 CdkVirtualScrollViewport 类中的 detach 方法。
   */
  public detach(): void {
    super.detach();

    // 此时 cdkVirtualFor 指令销毁，即不存在 dkVirtualFor 指令。
    this.hasCdkVirtualFor = false;

    // 取消在 attach 方法中的订阅。
    if (this.dataStreamSubscription) {
      this.dataStreamSubscription.unsubscribe();
    }
  }

  /**
   * @ignore
   *
   * 由于数据量可能有多有少，所以业务不能直接给表体容器设置高度而是要设置最大高度。
   *
   * CdkVirtualScrollViewport 组件中通过 getViewportSize 方法获取虚拟容器高度来计算实际应该渲染的数据，而这个方法底层是直接是读取滚动容器的 clientHeight,
   *  那么给容器设置最大高度时这个 clientHeight 获取的就是不准确的， 所以这里要 覆写 CdkVirtualScrollViewport 类中的 getViewportSize 方法。
   */
  public getViewportSize(): number {
    const maxHeight: number = parseInt(getComputedStyle(this.elementRef.nativeElement).maxHeight, 10);
    if (maxHeight) {
      return maxHeight;
    }
    const height: number = parseInt(getComputedStyle(this.elementRef.nativeElement).height, 10);
    if (height) {
      return height;
    }

    return 0;
  }

  /**
   * @ignore
   *
   * 元数据 host 中使用
   */
  public getTotalContentHeight(): string {
    if (!this.hasCdkVirtualFor || !this._totalContentHeight) {
      return '0px';
    }
    // _totalContentHeight 该变量虽然以下划线开头，但在 CdkVirtualScrollViewport 类中是 public 的，且在 CdkVirtualScrollViewport 组件的模板中也有使用
    const totalContentHeight: number = parseInt(this._totalContentHeight, 10);

    // 减去 1px 是因为表格最后一条行是没有border-bottom的
    return totalContentHeight > 0 ? `${totalContentHeight - 1}px` : this._totalContentHeight;
  }
}
