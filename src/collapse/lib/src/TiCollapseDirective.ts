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
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { TiBrowser } from '@opentiny/ng-utils';
/**
 * TiCollapseDirective指令主要功能为动态控制某一DOM节点的显示(展开)与隐藏(收起)
 *
 * <p><span style="color: red">使用此组件时需要开发者在项目模块(建议在根模块)
 * 中引入BrowserAnimationsModule。</span>这是因为此组件中使用了Angular动画，需要引入BrowserAnimationsModule，
 * 但是 BrowserAnimationsModule 不能在懒加载模块被重复引入，所以需要开发者来引入BrowserAnimationsModule，保证其引入一次。</p>
 *
 */
@Directive({
  selector: '[tiCollapse]'
})
export class TiCollapseDirective implements OnInit, OnChanges, OnDestroy {
  private static ANIMATE_IN: string = '600ms cubic-bezier(0.755, 0.05, 0.855, 0.06)'; // easeInQuint
  private static ANIMATE_OUT: string = '600ms cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint
  /**
   * 控制折叠面板的收起/展开
   */
  @Input('tiCollapse') isCollapse: boolean = true; // 是否收起
  /**
   * 折叠面板在收起/展开结束后触发的回调，参数为面板是否收起
   */
  @Output() readonly toggleDone: EventEmitter<boolean> = new EventEmitter();
  private element: HTMLElement;
  private expandPlayer: AnimationPlayer;
  private collapsePlayer: AnimationPlayer;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private builder: AnimationBuilder) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (!TiBrowser.isIE() || TiBrowser.version() > 9) {
      // 创建展开时动效的实例
      this.expandPlayer = this.builder
        .build([
          style({ 'max-height': '0px', overflow: 'hidden' }),
          animate(TiCollapseDirective.ANIMATE_IN, style({ 'max-height': '2999px', overflow: 'visible' }))
        ])
        .create(this.element);

      // 创建收起时动效的实例
      this.collapsePlayer = this.builder
        .build([
          style({ 'max-height': '2999px', overflow: 'visible' }),
          animate(TiCollapseDirective.ANIMATE_OUT, style({ 'max-height': '0px', overflow: 'hidden' }))
        ])
        .create(this.element);

      // 初始没有动画效果
      if (this.isCollapse) {
        this.collapsePlayer.finish();
      } else {
        this.expandPlayer.finish();
      }

      // 收起动画结束后的回调
      this.collapsePlayer.onDone(() => {
        // 设置元素display:none必须在收起动画结束后，否则没有动画效果
        this.collapse();
        this.toggleDone.emit(this.isCollapse);
      });

      // 展开动画结束后的回调
      this.expandPlayer.onDone(() => {
        this.toggleDone.emit(this.isCollapse);
      });
    }

    if (this.isCollapse) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isCollapseObj: SimpleChange = changes['isCollapse'];

    if (!isCollapseObj || isCollapseObj.firstChange) {
      return;
    }

    if (TiBrowser.isIE() && TiBrowser.version() === 9) {
      if (isCollapseObj.currentValue) {
        this.collapse();
      } else {
        this.expand();
      }
      this.toggleDone.emit(isCollapseObj.currentValue);

      return;
    }

    if (isCollapseObj.currentValue) {
      // 执行收起动画前一定要重置展开动画，否则会影响收起动画
      this.expandPlayer.reset();
      // 执行收起动画
      this.collapsePlayer.play();
    } else {
      // 执行展开动画前一定要重置收起动画，否则会影响展开动画
      this.collapsePlayer.reset();
      // 设置元素display:block
      this.expand();
      // 执行展开动画
      this.expandPlayer.play();
    }
  }

  ngOnDestroy(): void {
    if (this.expandPlayer) {
      this.expandPlayer.destroy();
    }
    if (this.collapsePlayer) {
      this.collapsePlayer.destroy();
    }
  }

  private expand(): void {
    this.renderer.setStyle(this.element, 'display', 'block');
  }

  private collapse(): void {
    this.renderer.setStyle(this.element, 'display', 'none');
  }
}
