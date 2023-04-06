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
  EventEmitter,
  Input,
  Output,
  ElementRef,
  Renderer2,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ContentChild,
  ContentChildren,
  QueryList
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TiBaseComponent } from '@opentiny/ng-base';
import { Util } from '@opentiny/ng-utils';
import { TiAlertMessageComponent } from './TiAlertMessageComponent';
import { animate, style, transition, trigger } from '@angular/animations';
import packageInfo from '../package.json';

/**
 * Alert组件用于消息提示，提供了四种类型
 *
 * <p><span style="color: red">10.1.13版本之后，使用此组件时需要开发者在项目模块(建议在根模块)
 * 中引入BrowserAnimationsModule。</span>这是因为此组件中使用了Angular动画，需要引入BrowserAnimationsModule，
 * 但是 BrowserAnimationsModule 不能在懒加载模块被重复引入，所以需要开发者来引入BrowserAnimationsModule，保证其引入一次。</p>
 *
 */
@Component({
  selector: 'ti-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.less'],
  animations: [
    trigger('alertAnimate', [
      transition(':leave', [
        style({ opacity: 1, transform: 'scaleY(1)', transformOrigin: '0% 0%' }),
        animate(
          '0.3s cubic-bezier(0.42, 0, 1, 1)',
          style({
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: '0% 0%'
          })
        )
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiAlertComponent extends TiBaseComponent {
  /**
   * 是否显示左侧提示类型图标
   */
  @Input() typeIcon: boolean = true;
  /**
   * 是否显示关闭按钮
   */
  @Input() closeIcon: boolean = true;
  /**
   * 自动消失时间
   */
  @Input() dismissOnTimeout: number;
  /**
   * 是否触发下拉类组件消失的事件，适用于 alert 的呈现状态影响页面下拉类组件位置的场景
   */
  @Input() triggerScroll: boolean = false;
  /**
   * 弹框类型
   */
  @Input() type: 'success' | 'error' | 'warn' | 'prompt' | 'simple' = 'success';
  /**
   * 样式大小
   */
  @Input() size: 'normal' | 'small' = 'normal';
  private isOpen: boolean = true;
  /**
   * 是否为深色背景提示框
   */
  @Input() darkTheme: boolean = false;
  /**
   * @ignore
   * 是否设置阴影，组件规范定义无阴影（页面级及卡片内）
   */
  @Input() boxShadow: boolean = false;
  /**
   * 是否弹出
   *
   */
  @Input()
  // 由于内部/外部设置open都会执行同样的逻辑，因此使用set/get
  /**
   * @ignore
   */
  get open(): boolean {
    return this.isOpen;
  }
  /**
   * @ignore
   */
  set open(value: boolean) {
    if (value === this.open) {
      return;
    }
    if (value) {
      // 值为true时，才会延迟关闭
      this.dismissOnTime();
    } else {
      // 值为false时，关闭时清除定时器
      this.clearTimeout();
    }
    // open动态修改均涉及tiScroll事件
    this.triggerScrollEvent();
    this.isOpen = value;
  }
  /**
   *
   *
   * 是否自动轮播
   */
  @Input() autoplay: boolean = true;
  /**
   *
   * 自动轮播的速度
   */
  @Input() autoplaySpeed: number = 3000;
  // 动画间隔，单位ms
  private transitionSpeed: number = 600;
  /**
   * 点击关闭按钮或延时消失时触发的回调，一般用于 open 状态变化场景。
   */
  @Output() readonly openChange: EventEmitter<boolean> = new EventEmitter();
  private timeoutId: any; // 内部变量，存储定时器ID
  private timer: any;
  /**
   * @ignore
   */
  @ContentChildren(TiAlertMessageComponent)
  alertMessageComs: QueryList<TiAlertMessageComponent>;
  /**
   * @ignore
   * 激活项下标
   */
  public activeIndex: number = 0;
  protected versionInfo: string = super.getVersion(packageInfo);
  /**
   * @ignore
   */
  @ViewChild('label', { static: false }) labelEle: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('message', { static: false }) messageEle: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('container', { static: false }) containerEle: ElementRef;
  private totalPage: number; // 总轮播数
  private totleHeight: number; // 所有轮播提示的总高
  private firstEle: Element; // 第一个ti-alert-message
  private messageNav: Element;
  private messageHeightArr: Array<number> = []; // 每个message的高
  // 提示类型图标宽度16 + 右侧margin 8
  private static readonly TYPEICON_WIDTH: number = 16 + 8;
  // 关闭图标大小12 + 左侧margin16
  private static readonly CLOSEICON_WIDTH: number = 16 + 12;
  constructor(
    protected hostRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document
  ) {
    super(hostRef, renderer);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // Div层图标和关闭按钮必须呈现
    if (this.darkTheme) {
      this.closeIcon = true;
      this.typeIcon = true;
      this.dismissOnTimeout = this.type === 'success' || this.type === 'prompt' ? 5 * 1000 : 10 * 1000;
    }

    // 初始open值为true时，设置延时关闭
    if (this.open) {
      this.dismissOnTime();
    }
  }
  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.totalPage = this.alertMessageComs.length;
    if (this.totalPage > 0) {
      this.messageNav = this.messageEle?.nativeElement;
      let iconWidth: number = 0;
      // 有提示图标,simple类型没有图标
      if (this.typeIcon && this.type === 'prompt') {
        iconWidth += TiAlertComponent.TYPEICON_WIDTH;
      }

      // 有关闭图标
      if (this.closeIcon) {
        iconWidth += TiAlertComponent.CLOSEICON_WIDTH;
      }

      // 12px为翻页按钮左侧padding + 翻页按钮总宽(2 * ${this.totalPage} - 1) * 8px
      const width: string = `calc(100% - (${iconWidth}px + 12px + (2 * ${this.totalPage} - 1) * 8px))`;
      this.renderer.setStyle(this.labelEle.nativeElement, 'width', width);
      this.renderer.setStyle(this.messageNav, 'transition', `top ${this.transitionSpeed}ms`);
      this.alertMessageComs.forEach((element: TiAlertMessageComponent) => {
        this.messageHeightArr.push(element.nativeElement.offsetHeight);
      });
      this.totleHeight = this.messageHeightArr.reduce((totle: number, value: number) => totle + value);
      this.setLabelHeight(this.activeIndex);
      if (this.autoplay && !this.timer) {
        this.firstEle = this.alertMessageComs.first.nativeElement;
        this.startAutoplay();
        this.renderer.listen(this.containerEle.nativeElement, 'mouseenter', () => {
          this.stopAutoplay();
        });

        this.renderer.listen(this.containerEle.nativeElement, 'mouseleave', () => {
          this.startAutoplay();
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      if (this.open) {
        this.close();
      }
    }
    this.stopAutoplay();
  }

  /**
   * @ignore
   * alert呈现后，处理多长时间后消失
   */
  dismissOnTime(): void {
    // 未配置消失时间或当前已处于隐藏状态，则不做处理
    if (isNaN(this.dismissOnTimeout)) {
      return;
    }
    this.timeoutId = setTimeout(() => {
      this.close();
      // OnPush模式下，异步需要手动刷新。
      this.changeDetectorRef.markForCheck();
    }, this.dismissOnTimeout);
  }
  /**
   * @ignore
   * 关闭alert方法，供内部关闭调用
   */
  close(): void {
    this.open = false;
    this.openChange.emit(this.open); // 及时通知open状态，确保open状态双向绑定功能正常
  }

  /**
   * @ignore
   * alert出现或者消失时，可能会触发页面滚动，此时需要触发tiScroll事件通知相关组件
   */
  triggerScrollEvent(): void {
    if (!this.triggerScroll) {
      return;
    }
    // 这里为什么需要setTimeout?能否去除？
    // setTimeout(() => {
    Util.trigger(this.document, 'tiScroll');
    // }, 0);
  }

  private clearTimeout(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }
  }
  /**
   * @ignore
   *
   */
  onPageClick(index: number): void {
    if (index === this.activeIndex) {
      return;
    }

    this.activeIndex = index;
    this.setLabelHeight(this.activeIndex);
  }
  // 根据当前激活项计算当前高度，赋值给文本呈现区域
  private setLabelHeight(index: number): void {
    const height: number = this.messageHeightArr[index]; // 当前激活页高度
    this.renderer.setStyle(this.messageNav, 'height', height + 'px'); // 设置高度

    const heightArr: Array<number> = this.messageHeightArr.concat();
    const top: string = index === 0 ? '0' : -heightArr.splice(0, index).reduce((totle: number, val: number) => totle + val) + 'px';
    this.renderer.setStyle(this.messageNav, 'top', top);
  }

  private startAutoplay(): void {
    this.timer = setInterval((): void => {
      this.activeMessage(this.activeIndex + 1);
      this.changeDetectorRef.markForCheck();
    }, this.autoplaySpeed);
  }
  private activeMessage(index: number): void {
    this.renderer.setStyle(this.messageNav, 'transition', `top ${this.transitionSpeed}ms`);
    // 最后一页到第一页
    if (index === this.totalPage) {
      this.activeIndex = 0; // 设置当前页为第一页
      this.renderer.setStyle(this.firstEle, 'transform', `translateY(${this.totleHeight}px)`); // 调整第一页的位置
      this.renderer.setStyle(this.messageNav, 'top', `${-this.totleHeight}px`);
      this.renderer.setStyle(this.messageNav, 'height', `${this.messageHeightArr[0]}px`);

      setTimeout((): void => {
        this.renderer.removeStyle(this.firstEle, 'transform');
        this.renderer.removeStyle(this.messageNav, 'transition');
        this.setLabelHeight(this.activeIndex);
      }, this.transitionSpeed);
    } else {
      this.activeIndex = index;
      this.setLabelHeight(this.activeIndex);
    }
  }

  private stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
