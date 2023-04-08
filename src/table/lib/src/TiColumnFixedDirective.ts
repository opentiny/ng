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
import { AfterViewChecked, Directive, ElementRef, NgZone, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiTableComponent } from './TiTableComponent';
import { TiBrowser } from '@opentiny/ng-utils';
import { Subscription } from 'rxjs';
/**
 * tiColumnFixed 表格列固定(IE和Edge浏览器不支持)
 *
 * 适用场景：对于列数很多的表格，可以固定前后列，横向滚动查看其它数据。
 *
 * 规范：左侧支持最多3列固定(3列不包含单选/复选框所在列)，右侧支持最多1列固定。横向滚动条贯穿左右，与表格最左和最右对齐。
 * 表格下展场景不需要支持列固定。
 *
 */
@Directive({
  selector: 'th[tiColumnFixed], td[tiColumnFixed]',
  host: {
    '[class.ti3-table-column-fixed-right]': "!notSupportBrowser && type === 'right'",
    '[class.ti3-table-column-fixed-left]': "!notSupportBrowser && type === 'left'"
  }
})
export class TiColumnFixedDirective implements OnInit, AfterViewChecked, OnDestroy {
  /**
   * 固定的左右位置，左侧可连续多列固定，且必须从第一列开始固定，右侧只能固定一列，且必须是最后一列
   */
  @Input('tiColumnFixed') type: 'right' | 'left';
  private tagName: 'TH' | 'TD';
  private tdLeft: number;
  private element: any;
  private columnFixedLeftLast: boolean = false;
  private floatingFixedColumn: boolean = false;
  private firstAfterViewChecked: boolean = true;
  private containerScrollXChangeSubscription: Subscription;
  private thResizeSubscription: Subscription;
  private updateFixedThLeftSubscription: Subscription;
  private updateFixedTdLeftSubscription: Subscription;
  /**
   * @ignore
   */
  public notSupportBrowser: boolean;
  constructor(
    private renderer: Renderer2,
    elementRef: ElementRef,
    private tiRenderer: TiRenderer,
    private tableCom: TiTableComponent,
    private zone: NgZone
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    // IE 不支持粘性定位position: sticky，使用其他定位方式有闪动，目前无法解决； EDGE 固定列边框不显示， 表头固定时拖动横向滚动条表头横向平移不及时
    this.notSupportBrowser = TiBrowser.isIE() || TiBrowser.isEdge();
    if (this.notSupportBrowser || !this.type) {
      return;
    }

    if (!this.tableCom.fixedColumnInfo.container) {
      const container: any = this.tiRenderer.findChildrenByClassName(this.tableCom.hostEle, 'ti3-table-container')[0];
      if (!container) {
        return;
      }
      this.tableCom.fixedColumnInfo.container = container;
    }

    this.tableCom.fixedColumnInfo.hasFixedColumn = true;

    this.tagName = this.element.tagName;

    if (this.type === 'right' && this.tagName === 'TH') {
      // 表头固定需要此参数
      this.tableCom.fixedColumnInfo.thFixedRight = this.element;
    }

    this.addBehavior();
  }

  ngAfterViewChecked(): void {
    if (this.notSupportBrowser || !this.type || !this.firstAfterViewChecked) {
      return;
    }

    this.firstAfterViewChecked = false;
    this.init();
  }

  ngOnDestroy(): void {
    if (this.containerScrollXChangeSubscription) {
      this.containerScrollXChangeSubscription.unsubscribe();
    }
    if (this.thResizeSubscription) {
      this.thResizeSubscription.unsubscribe();
    }
    if (this.updateFixedThLeftSubscription) {
      this.updateFixedThLeftSubscription.unsubscribe();
    }
    if (this.updateFixedTdLeftSubscription) {
      this.updateFixedTdLeftSubscription.unsubscribe();
    }
  }

  private init(): void {
    if (this.type === 'left') {
      if (this.tagName === 'TH') {
        this.processTh();
      } else {
        this.processTd();
      }
    }

    if (this.tagName === 'TH') {
      this.zone.runOutsideAngular(() => {
        // 表头初始时容器的滚动状态还未初始完成
        setTimeout(() => {
          const scrollLeft: number = this.tableCom.fixedColumnInfo.container.scrollLeft;
          const isRightColumnFloat: boolean =
            scrollLeft + this.tableCom.fixedColumnInfo.container.clientWidth < this.tableCom.fixedColumnInfo.container.scrollWidth;
          this.tableCom.containerScrollXChangeSubject.next({
            scrollLeft,
            isRightColumnFloat
          });
        }, 0);
      });
    } else {
      const scrollLeft: number = this.tableCom.fixedColumnInfo.container.scrollLeft;
      const isRightColumnFloat: boolean =
        scrollLeft + this.tableCom.fixedColumnInfo.container.clientWidth < this.tableCom.fixedColumnInfo.container.scrollWidth;
      this.tableCom.containerScrollXChangeSubject.next({
        scrollLeft,
        isRightColumnFloat
      });
    }
  }

  private addBehavior(): void {
    // 处理左右固定的最后一列是否有阴影(看起来有浮动效果)
    this.containerScrollXChangeSubscription = this.tableCom.containerScrollXChangeSubject.subscribe((scrollInfo: any) => {
      if (this.type === 'right' && scrollInfo.isRightColumnFloat !== this.floatingFixedColumn) {
        this.processLastFixedColumn(this.element, scrollInfo.isRightColumnFloat);
      }
      if (this.type === 'left' && this.columnFixedLeftLast && scrollInfo.scrollLeft > 0 !== this.floatingFixedColumn) {
        this.processLastFixedColumn(this.element, scrollInfo.scrollLeft > 0);
      }
    });

    // 处理左侧固定的列的left值(左侧可多列固定)
    if (this.type === 'left' && this.tagName === 'TH') {
      this.thResizeSubscription = this.tableCom.thResizeSubject.subscribe((thResizeInfo: any) => {
        const th: any = thResizeInfo.th;
        if (th !== this.element) {
          return;
        }

        const nextSibling: any = th.nextElementSibling;
        if (nextSibling && this.tiRenderer.hasClass(nextSibling, 'ti3-table-column-fixed-left')) {
          const siblings: any = th.parentElement.children;
          const index: number = Array.from(siblings).indexOf(th);
          const changeColumnsIndex: Array<number> = [];
          for (let i: number = index + 1; i < siblings.length; i++) {
            if (!siblings[i] || !this.tiRenderer.hasClass(siblings[i], 'ti3-table-column-fixed-left')) {
              break;
            }
            changeColumnsIndex.push(i);
            this.tableCom.fixedColumnInfo.fixedColumnLeftValues[i] += thResizeInfo.leftEdge;
            this.renderer.setStyle(siblings[i], 'left', `${this.tableCom.fixedColumnInfo.fixedColumnLeftValues[i]}px`);
          }
          const bodyTable: any = this.tableCom.isFixedHead ? thResizeInfo.resizableOpts.secondTable : thResizeInfo.resizableOpts.table;
          const trs: Array<any> = Array.from(bodyTable.children[1].children).filter((tr: any) => {
            return this.needFixedColumnTr(tr);
          });
          trs.forEach((tr: any) => {
            changeColumnsIndex.forEach((columnIndex: number) => {
              this.renderer.setStyle(
                tr.children[columnIndex],
                'left',
                `${this.tableCom.fixedColumnInfo.fixedColumnLeftValues[columnIndex]}px`
              );
            });
          });
        }
      });

      this.updateFixedThLeftSubscription = this.tableCom.updateFixedThLeftSubject.subscribe(() => {
        this.processTh();
      });
    }

    if (this.type === 'left' && this.tagName === 'TD') {
      this.updateFixedTdLeftSubscription = this.tableCom.updateFixedTdLeftSubject.subscribe(() => {
        this.processTd();
      });
    }
  }

  private processTd(): void {
    const siblings: any = this.element.parentElement.children;
    const index: number = Array.from(siblings).indexOf(this.element);
    // 进行判空处理，因为有可能是td元素先出现。
    // TODO: 考虑下processTd和processTd是否可以使用相同的处理方式。
    if (
      this.tableCom.fixedColumnInfo.fixedColumnLeftValues &&
      this.tableCom.fixedColumnInfo.fixedColumnLeftValues.length &&
      this.tableCom.fixedColumnInfo.fixedColumnLeftValues[index] !== this.tdLeft
    ) {
      this.tdLeft = this.tableCom.fixedColumnInfo.fixedColumnLeftValues[index];
      this.renderer.setStyle(this.element, 'left', `${this.tdLeft}px`);
    }

    if (index === this.tableCom.fixedColumnInfo.columnFixedLeftLastIndex) {
      this.columnFixedLeftLast = true;
    }
  }

  private processTh(): void {
    const siblings: any = this.element.parentElement.children;
    let left: number = 0;
    this.tableCom.fixedColumnInfo.fixedColumnLeftValues = [];

    for (let i: number = 0; i < siblings.length; i++) {
      const current: any = siblings[i];
      if (this.tableCom.fixedColumnInfo.fixedColumnLeftValues[i] !== left) {
        this.tableCom.fixedColumnInfo.fixedColumnLeftValues[i] = left;
        this.renderer.setStyle(current, 'left', `${left}px`);
      }
      // offsetWidth 包括边框
      left += current.offsetWidth;
      const nextSibling: any = siblings[i + 1];
      if (nextSibling && !this.tiRenderer.hasClass(nextSibling, 'ti3-table-column-fixed-left')) {
        this.tableCom.fixedColumnInfo.columnFixedLeftLastIndex = i;
        if (current === this.element) {
          this.columnFixedLeftLast = true;
        }
        break;
      } else {
        if (current === this.element) {
          this.columnFixedLeftLast = false;
        }
      }
    }
  }

  private processLastFixedColumn(ele: any, add: boolean): void {
    if (add) {
      this.floatingFixedColumn = true;
      this.renderer.addClass(ele, 'ti3-table-floating-fixed-column');
    } else {
      this.floatingFixedColumn = false;
      this.renderer.removeClass(ele, 'ti3-table-floating-fixed-column');
    }
  }

  private needFixedColumnTr(tr: any): boolean {
    return this.tableCom.needTr(tr);
  }
}
