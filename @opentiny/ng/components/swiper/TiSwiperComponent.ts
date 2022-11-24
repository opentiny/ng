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
 import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, NgZone,
  Output, QueryList, Renderer2, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseComponent';

import { TiSwipercardComponent } from './TiSwipercardComponent';

/**
* swiper组件每个展示块为一个card，点击左右按钮可以实现card切换功能
*
*/
@Component({
  selector: 'ti-swiper',
  templateUrl: './swiper.html',
  styleUrls: ['./swiper.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      '[class.ti3-swiper-multiple]': 'showCardNum > 1'
  }
})

export class TiSwiperComponent extends TiBaseComponent {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2, private zone: NgZone, private cdRef: ChangeDetectorRef) {
      super(elementRef, renderer2);
  }
  /**
   * 指定当前显示项
   */
  @Input() activeIndex: number = 0;
  /**
   * 是否自动轮播，自动轮播时，鼠标移入元素，轮播暂停；移出元素，轮播继续。
   */
  @Input() autoplay: boolean = false;
  /**
   * 自动轮播时的播放速度，单位为毫秒
   */
  @Input() autoplaySpeed: number = 3000;
  /**
   * 每屏展示的项目数量
   */
  @Input() showCardNum: number = 1;
  /**
   * 多图轮播卡片间距，8-12px，默认为8px
   */
  @Input() cardGap: string = '8px';
  /**
   * 指示器位置，三个属性值，“below”容器外部，‘bottom’容器内部底部，‘none’不显示
   */
  @Input() indicatorPosition: 'bottom' | 'below' | 'none' = 'below';
  /**
   * 是否无限循环
   */
  @Input() loop: boolean = true;
  /**
   * 切换触发的事件
   */
  @Output() readonly activeIndexChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @ignore
   */
  @ViewChild('cards', { static: true }) cards: ElementRef;
  /**
   * @ignore
   */
  @ContentChildren(TiSwipercardComponent) swipercardComs: QueryList<TiSwipercardComponent>;
  /**
   * @ignore
   */
  @ViewChild('wrapper', { static: true }) wrapperEle: ElementRef;
  /**
   * @ignore
   * 卡片总页数
   */
  public totalPage: number = 0;
  /**
   * @ignore
   * 当前页， 按照索引值从0开始
   */
  public currentPage: number = 0;
  /**
   * @ignore
   * 面板指示点的集合
   */
  public swiperBullets: Array<any> = [];
  // 卡片切换动画间隔，单位ms
  private transitionSpeed: number = 600;
  // 定时器任务
  private autoplayId: any;
  // 卡片总数量
  private cardNum: number = 0;
  private pageWidth: number;
  private swiperCardWidth: number;
  private cardSpace: number;
  private totalWidth: number;
  private unlistenResize: () => void;

  ngOnInit(): void {
      super.ngOnInit();
      // 一屏显示卡片的数目会随窗口大小而变化，所以监听窗口大小变化重新计算分页，
      this.zone.runOutsideAngular(() => {
          this.unlistenResize = this.renderer2.listen(window, 'resize', () => {
              this.setCardsWidth();
              this.setLeftPosition(this.currentPage);
          });
      });
  }

  ngAfterContentChecked(): void {
      super.ngAfterContentChecked();
      // 当卡片数量变化时，计算总数量
      if (this.cards.nativeElement.children.length !== this.cardNum) {
          this.setCardNum();
          this.setCardsWidth();
          this.cdRef.markForCheck();
      }
  }

  ngAfterViewInit(): void {
      this.setCardsWidth();
      this.setLeftPosition(this.currentPage);
      this.renderer.setStyle(this.cards.nativeElement, 'transition', `left ${this.transitionSpeed}ms`);

      // 只有一页时，不自动轮播
      if (this.autoplay && this.autoplaySpeed && this.totalPage > 1) {
          this.startAutoplay();

          this.renderer2.listen(this.wrapperEle.nativeElement, 'mouseenter', () => {
              this.stopAutoplay();
          });

          this.renderer2.listen(this.wrapperEle.nativeElement, 'mouseleave', () => {
              this.startAutoplay();
          });
      }
  }
  ngAfterViewChecked(): void {
      // 外层容器宽度有变化时，重新计算宽度及位置
      if (this.wrapperEle && this.wrapperEle.nativeElement.getBoundingClientRect().width !== this.pageWidth) {
          this.setCardsWidth();
          this.setLeftPosition(this.currentPage);
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
      super.ngOnChanges(changes);
      const indexObj: SimpleChange = changes['activeIndex'];
      if (indexObj && !indexObj.firstChange) {
          this.calculateCurrentPage(indexObj.currentValue);
          this.setLeftPosition(this.currentPage);
      }
  }

  ngOnDestroy(): void {
      this.stopAutoplay();

      if (this.unlistenResize) {
          this.unlistenResize();
      }
  }

  /**
   * @ignore
   * 点击左侧按钮触发事件
   */
  public onClickPrev(): void {
      this.activeCard(this.currentPage - 1);
  }

  /**
   * @ignore
   * 点击右侧按钮触发事件
   */
  public onClickNext(): void {
      this.activeCard(this.currentPage + 1);
  }

  /**
   * @ignore
   * 点击指示器触发事件
   */
  public onClickDot(index: number): void {
      this.activeCard(index);
  }
  /**
   * @ignore
   * 点击左右侧按钮、面板指示板触发事件
   */
  private activeCard(index: number): void {
      if (this.totalPage === 1) {
          return;
      }

      this.renderer.setStyle(this.cards.nativeElement, 'transition', `left ${this.transitionSpeed}ms`);
      if (index === this.totalPage && this.loop) {
          this.currentPage = 0;
          const first: Element = this.swipercardComs.first.nativeElement;
          this.setPosition(first, true);
          this.setLeftPosition(this.totalPage);
          this.adjustPosition(first);
      } else if (index === -1 && this.loop) {
          this.currentPage = this.totalPage - 1;
          const last: Element = this.swipercardComs.last.nativeElement;
          this.setPosition(last, false);
          this.setLeftPosition(-1);
          this.adjustPosition(last);
      } else {
          this.currentPage = index;
          if (index <= -1) {
              this.currentPage = 0;
          }
          if (index >= this.totalPage) {
              this.currentPage = this.totalPage - 1;
          }
          this.setLeftPosition(this.currentPage);
          this.activeIndexChange.emit(this.currentPage);
      }
  }

  // 计算卡片总数及总页数
  private setCardNum(): void {
      this.cardNum = this.cards && this.cards.nativeElement.children && this.cards.nativeElement.children.length;
      this.calculatpaging();
      this.swiperBullets.length = this.totalPage;
  }

  // 计算卡片容器总宽度
  private setCardsWidth(): void {
      this.calculatecardWidth();
      this.renderer.setStyle(this.cards.nativeElement, 'width', `${this.totalWidth}px`);
  }

  // 当点击左右按钮时，设置激活卡片相对位置
  private setLeftPosition(index: number): void {
      if (this.totalPage === 1) {
          return;
      }

      // 最后一页未占完
      if (index === this.totalPage - 1 && this.cardNum % this.showCardNum !== 0) {
          // 最后一页呈现需要偏移的卡片数
          const swiperCardNum: number = this.cardNum - this.showCardNum;
          this.renderer.setStyle(this.cards.nativeElement, 'left', `${- (swiperCardNum) * this.swiperCardWidth - swiperCardNum * this.cardSpace}px`);

          return;
      }

      // 无限循环
      if (index === this.totalPage && this.loop) {
          this.renderer.setStyle(this.cards.nativeElement, 'left', `${-(this.totalWidth)}px`);

          return;
      }
      if (index === -1 && this.loop) {
          this.renderer.setStyle(this.cards.nativeElement, 'left', `${this.swiperCardWidth * this.showCardNum + (this.showCardNum - 1) * this.cardSpace}px`);

          return;
      }

      // left偏移量
      const leftVal: number = - index * this.showCardNum * (this.swiperCardWidth + this.cardSpace);
      this.renderer.setStyle(this.cards.nativeElement, 'left', `${leftVal}px`);
  }

  // 调整第一页或者最后一页的位置，为动画做准备
  private setPosition(targetEle: Element, lastToFirst: boolean): void {
      this.renderer.setStyle(targetEle, 'transform', `translateX(${lastToFirst ? this.totalWidth : this.totalWidth * -1}px)`);
  }

  private adjustPosition(targetEle?: Element): void {
      setTimeout((): void => {
          this.renderer.removeStyle(targetEle, 'transform');
          this.renderer.removeStyle(this.cards.nativeElement, 'transition');
          this.setLeftPosition(this.currentPage);
          this.activeIndexChange.emit(this.currentPage);
      }, this.transitionSpeed);
  }

  // 计算每页显示卡片数，总页数及当前页
  private calculatpaging(): void {
      this.calculateTotalPage();
      this.calculateCurrentPage(this.activeIndex);
  }

  /**
   * 计算卡片宽度
   */
  private calculatecardWidth(): void {
      // 初始化时，多图且左右翻页按钮还没有显示，容器元素的可用宽度需要减去左右按钮的宽度之和32+32=64
      if (this.totalPage === 0  && this.showCardNum > 1) {
          this.pageWidth = this.wrapperEle.nativeElement.getBoundingClientRect().width - 64;
      } else {
          this.pageWidth = this.wrapperEle.nativeElement.getBoundingClientRect().width;
      }

      // 每页卡片总间距
      this.cardSpace = this.showCardNum > 1 ? parseInt(this.cardGap, 10) : 0;
      const cardsSpace: number = (this.showCardNum - 1) * parseInt(this.cardGap, 10);
      this.swiperCardWidth = (this.pageWidth - cardsSpace) / this.showCardNum;
      this.totalWidth = this.swiperCardWidth * this.cardNum + cardsSpace * this.totalPage;

      this.swipercardComs.toArray()
          .forEach((item: TiSwiperComponent, index: number): void => {
          // 设置卡片宽度
          this.renderer2.setStyle(item.nativeElement, 'width', this.swiperCardWidth + 'px');
          // 设置卡片间距，最后一个卡片不设置
          if (index !== this.cardNum - 1) {
              this.renderer2.setStyle(item.nativeElement, 'margin-right', this.cardSpace + 'px');
          }
      });
  }

  /**
   * 计算总页数
   */
  private calculateTotalPage(): void {
      this.totalPage = Math.ceil(this.cardNum / this.showCardNum);
      if (this.currentPage > this.totalPage) {
          this.activeCard(this.totalPage);
      }
  }

  /**
   *  计算当前页
   */
  private calculateCurrentPage(index: number): void {
      // 当前索引值不正确，不处理
      if (index < 0 || index > (this.cardNum - 1)) {
          return;
      }

      if (this.showCardNum === 1) {
          this.currentPage = index;

          return;
      }

      // 当前一页卡片的最大最小索引
      const maxIndex: number = (this.currentPage + 1) * this.showCardNum - 1;
      const minIndex: number = this.currentPage > 0 ? (this.currentPage * this.showCardNum - 1) : 0;
      // 当前索卡片是否在当前页面
      if (index < minIndex || index > maxIndex) {
          this.currentPage = Math.floor((index + 1) / this.showCardNum);
      }
  }

  /**
   * 暂停自动播放，清除定时任务
   */
  private stopAutoplay(): void {
      if (this.autoplayId) {
          clearInterval(this.autoplayId);
          this.autoplayId = undefined;
      }
  }
  /**
   * 开始自动播放，设置定时任务
   */
  private startAutoplay(): void {
      if (!this.autoplayId) {
          this.autoplayId = setInterval((): void => {
              this.onClickNext();
              this.cdRef.markForCheck();
          }, this.autoplaySpeed);
      }
  }
}
