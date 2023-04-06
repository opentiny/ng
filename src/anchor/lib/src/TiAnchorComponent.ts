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
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';

export interface TiAnchorItem {
  /**
   * 必选，锚点 id
   */
  id: string;
  /**
   * 锚点文本
   */
  title?: string;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
/**
 * 锚点组件
 *
 */
@Component({
  selector: 'ti-anchor',
  templateUrl: './anchor.html',
  styleUrls: ['./anchor.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.tp-anchor-container]': 'true'
  }
})
export class TiAnchorComponent extends TiBaseComponent {
  /**
   * 必选，锚点数据集
   */
  @Input() items: Array<TiAnchorItem>;
  /**
   * 当前锚点 id
   */
  @Input() anchorId: string;
  /**
   * 点击锚点时，锚点对应 Dom 元素距离滚动容器顶部的偏移量像素
   */
  @Input() offsetTop: number = 50;
  /**
   * 点击锚点时，容器滚动速度即滚动到当前位置所需要的毫秒数
   */
  @Input() speed: number = 300;
  /**
   * 滚动容器，默认为整个文档
   */
  @Input() scrollTarget: HTMLElement;
  /**
   * 选中锚点时触发的回调，参数：当前锚点数据
   */
  @Output() readonly select: EventEmitter<TiAnchorItem> = new EventEmitter<TiAnchorItem>();
  /**
   * 当前锚点 id 改变时触发的回调，参数：当前锚点 id
   */
  @Output() readonly anchorIdChange: EventEmitter<string> = new EventEmitter<string>();
  /**
   * 锚点内容区域的模板
   */
  @ContentChild('item', { static: true }) itemTemplete: TemplateRef<any>;
  private unlistenScroll: () => void;
  /**
   * 是否组件内部触发scroll事件
   */
  private isInnerScrolling: boolean;
  /**
   * @ignore
   * 保存组件内部更改后的锚点id
   */
  public currentId: string;
  private hasGoanchor: boolean = false;
  private hasAnimation: boolean = false; // 初始化及数据更新时，无需平滑滚动
  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(element, renderer2);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const anchorIdObj: SimpleChange = changes['anchorId'];
    const itemsObj: SimpleChange = changes['items'];
    if (anchorIdObj && anchorIdObj.currentValue && !anchorIdObj.isFirstChange() && this.anchorId !== this.currentId) {
      this.hasGoanchor = false;
      this.hasAnimation = true;
    }
    if (itemsObj && itemsObj.currentValue && !itemsObj.isFirstChange()) {
      this.hasGoanchor = false;
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    // 监听滚轮事件
    this.zone.runOutsideAngular(() => {
      const scrollTarget: any = this.scrollTarget || window;

      this.unlistenScroll = this.renderer2.listen(scrollTarget, 'scroll', () => {
        this.onWindowScroll();
      });
    });
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    // 数据更新anchorId有值时，需要滚动容器到指定位置，只触发一次
    if (!this.hasGoanchor) {
      this.hasGoanchor = true;
      this.goToAnchor(this.anchorId || (this.items && this.items[0] && this.items[0].id));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.unlistenScroll) {
      this.unlistenScroll();
    }
  }

  // 容器滚动时，相应锚点高亮
  private onWindowScroll(): void {
    if (this.isInnerScrolling) {
      return;
    }
    const scrollTop: number =
      this.scrollTarget?.scrollTop || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    const itemLength: number = this.items && this.items.length;
    // 容器滚动时，锚点对应Dom元素距浏览器窗口顶部高度小于等于所配置的顶部偏移量，则应是当前锚点
    for (let i: number = itemLength - 1; i >= 0; i--) {
      const anchorEle: HTMLElement = document.getElementById(this.items[i].id);
      const scrollTargetTop: number = this.scrollTarget?.offsetTop ? this.scrollTarget.offsetTop : 0;
      const targetTop: number = anchorEle?.offsetTop - scrollTargetTop;
      // 判断有无当前激活锚点，使用户点击时，只当前锚点高亮；而滚动时，相对应锚点都高亮
      if (anchorEle && !isNaN(targetTop)) {
        const clientY: number = targetTop - scrollTop - this.offsetTop;
        const id: string = this.anchorId;
        if (clientY <= this.offsetTop) {
          this.zone.run(() => {
            this.anchorId = this.currentId = this.items[i].id;
            // 锚点改变时，仅向外通知一次
            if (this.anchorId !== id) {
              this.select.emit(this.items[i]);
              this.anchorIdChange.emit(this.items[i].id);
            }
            // onpush模式下 需要手动刷新视图
            this.changeDetectorRef.markForCheck();
          });
          break;
        }
      }
    }
  }

  /**
   * @ignore
   */
  public onClick(item: TiAnchorItem): void {
    this.hasAnimation = true;
    this.goToAnchor(item.id);
  }

  /**
   * 容器滚动到目标锚点对应位置
   * @param anchorId 锚点id
   */
  private goToAnchor(anchorId: string): void {
    this.isInnerScrolling = true;
    const targetEle: HTMLElement = document.getElementById(anchorId);
    const scrollTop: number =
      this.scrollTarget?.scrollTop || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    const scrollTargetTop: number = this.scrollTarget?.offsetTop ? this.scrollTarget.offsetTop : 0;
    const scollPosition: number = targetEle?.offsetTop - scrollTargetTop - this.offsetTop;

    /**
     * 初始化及数据更新时，容器直接滚动到定位位置；
     * 点击锚点切换及用户动态改变当前锚点id时，滚动条平滑运动。
     */
    if (this.hasAnimation) {
      this.scrollAnimation(scrollTop, scollPosition, anchorId, this.speed);
    } else {
      // 修改了当前高亮锚点，使用setTimeout，app default下消除ExpressionChangedAfterItHasBeenCheckedError报错
      setTimeout(() => {
        this.scrollToView(scollPosition, anchorId);
      }, 0);
    }
  }

  // 滚动条平滑运动
  private scrollAnimation(currentY: number, targetY: number, anchorId: string, speed?: number): void {
    const direction: number = targetY - currentY > 0 ? 1 : -1;
    let distance: number = Math.abs(targetY - currentY); // 滚动条需要滚动的距离
    const stepTimes: number = speed / (1000 / 60); // 一般浏览器刷新频率是60HZ，时间间隔为1000ms/60，总帧数
    let stepDist: number = distance / stepTimes; // 每帧滚动条滚动距离

    if (targetY !== currentY) {
      stepDist *= direction;
      // 定时器，1000/60ms时间间隔 执行一次
      let positionY: number = currentY;
      let timer: any = setInterval(() => {
        positionY = positionY + stepDist;
        distance -= Math.abs(stepDist);
        if (distance <= 0) {
          clearInterval(timer);
          timer = undefined;
          this.scrollToView(targetY, anchorId);
          this.hasAnimation = false; // 更新hasAnimation
        } else {
          this.scrollTarget ? this.scrollTarget.scrollTo(0, positionY) : window.scrollTo(0, positionY);
        }
        // onpush模式下 需要手动刷新视图
        this.changeDetectorRef.markForCheck();
      }, 1000 / 60);
    }
  }

  // 容器定位到指定位置，无滚动效果
  private scrollToView(target: number, anchorId: string): void {
    this.scrollTarget ? this.scrollTarget.scrollTo(0, target) : window.scrollTo(0, target); // 横向坐标不移动
    this.getCurrentAnchor(anchorId);
    this.isInnerScrolling = false;
  }

  // 容器滚动到指定位置之后，向外通知当前锚点数据
  private getCurrentAnchor(anchorId: string): void {
    this.anchorId = this.currentId = anchorId;
    for (const item of this.items) {
      if (item.id === anchorId) {
        this.select.emit(item);
        this.anchorIdChange.emit(item.id);
      }
    }

    // 绑定在模板上的值变了，需要手动触发变更检测
    this.changeDetectorRef.markForCheck();
  }
}
