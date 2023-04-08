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
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Optional,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { TiKeymap, Util } from '@opentiny/ng-utils';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
/**
 * @ignore
 */
export const animateStyle: string = '0.3s cubic-bezier(0.40, 0.00, 0.20, 1.00)';
/**
 * @ignore
 */
@Component({
  selector: 'ti-modal-wrapper',
  templateUrl: './TiModalComponent.html',
  styleUrls: ['./modal.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    // 由于动画创建需要在元数据中解析，因此动画定义必须在此处定义
    trigger('modalAnimate', [
      state(
        'show',
        style({
          opacity: 1
        })
      ),
      state(
        'hide, void',
        style({
          opacity: 0
        })
      ),
      transition('show => hide', animate(animateStyle)),
      transition('hide => show', animate(animateStyle))
    ]),
    trigger('modalPosAnimate', [
      state(
        'show',
        style({
          transform: 'translate(0, 0px)'
        })
      ),
      state(
        'hide, void',
        style({
          transform: 'translate(0, -6px)'
        })
      ),
      transition('show => hide', animate(animateStyle)),
      transition('hide => show', animate(animateStyle))
    ])
  ]
})
export class TiModalComponent extends TiBaseComponent implements AfterContentInit {
  /**
   * 规范刷新，弹出框整体的最大高度为660px（按照最小分辨率1280*768计算）
   */
  private static readonly MODAL_MAX_HEIGHT: number = 660;
  // 可通过tab聚焦的元素选择器列表
  private static readonly tababbleSelector: string = `a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']),
       button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']),
       textarea:not([disabled]):not([tabindex=\'-1\']),
       iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]`;

  @ViewChild('modalContent', { static: true }) private contentRef: ElementRef;
  @ViewChild('modalEle', { static: true }) protected modalEleRef: ElementRef;

  protected _showState: string; // 组件显示状态，用于控制动画的状态切换
  set showState(value: string) {
    if (this._showState !== value) {
      this._showState = value;
      // onpush模式下，点击ok/cancel按钮关闭面板。改变模板变量showState，却没有触发更新。强制更新。
      this.changeDetectorRef.markForCheck();
    }
  }
  get showState(): string {
    return this._showState;
  }
  public animation: boolean; // 是否有动画
  public draggable: boolean; // 是否可拖拽
  public closeOnEsc: boolean; // 是否可通过ESC键关闭弹框
  public modalInstance: any; // 组件实例，可使用该实例调用方法控制组件行为
  public index: number = 0; // 多个弹出框情况下，zindex层级设置辅助
  public closeIcon: boolean; // 是否有头部关闭按钮
  public modalClass: string; // 弹框样式设置
  public headerAlign: 'center' | 'left' | 'right'; // 头部对齐方式
  public dragOptions: any; // 拖拽配置
  protected versionInfo: string = super.getVersion(packageInfo);
  private focusableElements: Array<any> = []; // 弹框中可聚焦元素列表
  private modalSubscribe: Subscription;
  constructor(
    ele: ElementRef,
    private tiRenderer: TiRenderer,
    protected renderer: Renderer2,
    @Optional() private router: Router,
    protected changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document
  ) {
    super(ele, renderer);
  }

  private static preventEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // 路由切换，关闭弹出框: 前进/后退/更改url等跳转，通过routerLink/navigate路由跳转监听不到
  @HostListener('window:hashchange', ['$event']) onhashchange(event: HashChangeEvent): void {
    if (event.newURL !== event.oldURL) {
      this.modalInstance._remove();
    }
  }

  // 缩放时重置弹框位置
  @HostListener('window:resize') onResize(): void {
    this.tiRenderer.setStyles(this.contentRef.nativeElement, {
      left: 0,
      top: 0
    });
  }
  // 键盘事件处理
  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
    switch (event.which) {
      case TiKeymap.KEY_ESCAPE: // close on ESC
        if (this.closeOnEsc) {
          this.dismissModal();
        }
        break;
      case TiKeymap.KEY_TAB: // tab键用于处理在弹框内循环获取焦点
        this.onTabChange(event);
        break;
      default:
        break;
    }
  }
  // 弹出框外围出现的滚动条滚动会导致下拉等定位在body上的组件相对于宿主元素定位偏移，
  // 因此触发tiScroll事件做处理，事件包括：
  // 整个页面滚动条滚轮滚动事件, mousewheel处理Chrome和IE下事件，DOMMouseScroll处理firefox下事件
  // 整个页面滚动条鼠标滚动事件
  @HostListener('document:mousewheel')
  @HostListener('document:DOMMouseScroll')
  @HostListener('window:scroll')
  onTiScroll(): void {
    Util.trigger(document, 'tiScroll');
  }

  ngAfterContentInit(): void {
    this.dragOptions = {
      // 由于此处需要获取ngContent中的内容,因此在该时机中进行处理
      // 这时弹出框内容DOM还未解析，所以需要使用标签选择器('ti-modal-header')来获取元素
      handle: this.nativeElement.querySelector('ti-modal-header'),
      drag: (opts: {
        position: {
          left: number;
          top: number;
        };
        helper: Element;
      }): { left: number; top: number } => {
        Util.trigger(document, 'tiScroll');
        // 当前浏览器可视区域的宽高
        const curBrowseWidth: number = document.documentElement.clientWidth;
        const curBrowseheight: number = document.documentElement.clientHeight;
        // 元素原始位置（由于元素本身left和top实时变化，因此取其父元素位置）
        const eleRect: ClientRect | DOMRect = opts.helper.parentElement.getBoundingClientRect();
        // 元素距页面可视区域的可用位置范围
        const minLeft: number = -eleRect.left + document.body.scrollLeft;
        const maxLeft: number = Math.max(curBrowseWidth + minLeft - eleRect.width, minLeft);
        const minTop: number = -eleRect.top + document.body.scrollTop;
        const maxTop: number = Math.max(curBrowseheight + minTop - eleRect.height, minTop);
        const position: { left: number; top: number } = opts.position;
        // 元素left位置根据可用left范围计算
        if (position.left < minLeft) {
          position.left = minLeft;
        } else if (position.left > maxLeft) {
          position.left = maxLeft;
        }
        // 元素top位置根据可用top范围计算
        if (position.top < minTop) {
          position.top = minTop;
        } else if (position.top > maxTop) {
          position.top = maxTop;
        }

        return position;
      }
    };
    // 监听路由变化，关闭弹出框：hashchange监听不到通过routerLink/navigate路由跳转的场景
    this.modalSubscribe = this.router?.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
      this.modalInstance._remove();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.modalSubscribe && this.modalSubscribe.unsubscribe();
  }

  public dismissModal(): void {
    this.modalInstance.dismiss();
  }

  public onAnimationDone($event: any): void {
    // 弹框toState有三种状态:'show'/'hide'/null
    // 弹框显示动画结束后,重新将焦点聚焦在弹框元素/弹框中
    if ($event.toState === 'show') {
      this.reStyleModal();
      this.focusInModal();

      return;
    }
    // 弹框隐藏动画结束后,销毁弹框DOM
    if ($event.toState === 'hide') {
      this.modalInstance._remove();
    }
  }

  // 弹框打开时，设置弹框元素样式
  private reStyleModal(): void {
    const parentEle: Element = this.nativeElement.querySelector('.ti3-modal-header');
    if (this.draggable !== false) {
      this.renderer.setStyle(parentEle, 'cursor', 'move');
    }
    if (this.headerAlign === 'center' || this.headerAlign === 'right') {
      this.renderer.setStyle(parentEle, 'text-align', this.headerAlign);
    }

    this.renderer.addClass(this.document.body, 'ti3-modal-open');
    this.setMaxHeight();
  }
  /**
   * 设置弹框高度：
   * 根据UCD3.0规范，modal最大高度不能超过弹框宽度,所以需要获取到modal的宽度值，用其减去modal的header和footer的高度
   * 后设为body的最大高度，当高度超出时，ti-modal-body垂直方向上出现滚动条
   * 10.1.1变更说明：
   * 根据规范变更，弹框高度可以超过弹框宽度，同时弹出框的最大高度是660px。
   */
  private setMaxHeight(): void {
    // 修复SSR问题：ERROR TypeError: modalHeaderEle.getBoundingClientRect is not a function
    const modalHeaderEle: Element = this.nativeElement.querySelector('.ti3-modal-header');
    const modalHeaderHeight: number =
      modalHeaderEle && typeof modalHeaderEle.getBoundingClientRect === 'function' ? modalHeaderEle.getBoundingClientRect().height : 0;
    const modalFooterEle: Element = this.nativeElement.querySelector('.ti3-modal-footer');
    const modalFooterHeight: number =
      modalFooterEle && typeof modalFooterEle.getBoundingClientRect === 'function' ? modalFooterEle.getBoundingClientRect().height : 0;
    const modalBodyMaxHeight: number = TiModalComponent.MODAL_MAX_HEIGHT - modalHeaderHeight - modalFooterHeight;
    this.renderer.setStyle(this.nativeElement.querySelector('.ti3-modal-body'), 'maxHeight', modalBodyMaxHeight + 'px');
  }
  private focusInModal(): void {
    /**
     * 首先判断新打开的modal是否已存在获取焦点的元素
     * 如果存在，则需要对modal元素再次设置焦点
     * 否则，对modal容器设置焦点
     */
    const activeElement: any = this.document.activeElement;
    const isfocusedInModal: boolean = activeElement && this.nativeElement.contains(activeElement);
    if (isfocusedInModal) {
      /**
       * 对已经设置焦点的元素，再次设置焦点，是为了解决以下两个问题：
       * 1>首次加载时，已经获取焦点的元素，其输入tip提示位置偏移
       * 2>首次加载时，IE浏览器中，已经获取焦点的元素input，光标位置出现偏移
       */
      if (activeElement) {
        activeElement.blur();
        // tiautofocusinmodal属性需要在change校验中使用(ChangeCheck.ts)
        this.renderer.setAttribute(activeElement, 'tiautofocusinmodal', '');
        activeElement.focus();
        this.renderer.removeAttribute(activeElement, 'tiautofocusinmodal');
      }
    } else {
      // 弹出框内未找到已聚焦元素情况下，优先处理 input 和 textarea 原生标签autofocus聚焦
      // (input,textarea.button原生标签的autofocus弹出框打开时无效(chrome是从第二次打开无效)，因此要做此处理)
      let focusEle: any = this.nativeElement.querySelector(`input[autofocus]:not([disabled]):not([tabindex=\'-1\']),
                textarea[autofocus]:not([disabled]):not([tabindex=\'-1\']), button[autofocus]:not([disabled]):not([tabindex=\'-1\'])`);
      // 如果通过上述处理，聚焦元素仍未获取到的情况下，则可聚焦元素为当前弹框
      focusEle = focusEle || this.modalEleRef.nativeElement;
      focusEle.focus();
    }
  }
  // 用于处理tab键行为，确保tab时只可在弹框内循环获取焦点
  private onTabChange(event: KeyboardEvent): void {
    const focusableElementList: Array<Element> = this.getFocusableElesInModal(); // 获取当前弹出框DOM中可以获取焦点的元素列表
    const focusableListLength: number = focusableElementList.length;
    if (focusableListLength === 0) {
      return;
    }
    const target: EventTarget = event.target; // 事件对象元素
    const firstFocusableEle: any = focusableElementList[0]; // 第一个可获取焦点的元素
    const lastFocusableEle: any = focusableElementList[focusableListLength - 1]; // 最后一个可获取焦点的元素
    // 按下tab+shift键时，如果当前已获取焦点元素是弹出框中的第一个可获取焦点元素或弹框本身，则聚焦最后一个元素
    if (event.shiftKey) {
      if (target === firstFocusableEle || target === this.modalEleRef.nativeElement) {
        lastFocusableEle.focus();
        TiModalComponent.preventEvent(event); // 阻止默认事件及继续冒泡，确保此处手动focus生效
      }

      return;
    }
    // 按下tab键时，如当前已获取焦点元素是弹框中最后一个可获取焦点元素，则聚焦第一个元素
    if (target === lastFocusableEle) {
      firstFocusableEle.focus();
      TiModalComponent.preventEvent(event);
    }
  }
  private getFocusableElesInModal(): Array<Element> {
    if (this.focusableElements.length !== 0) {
      return this.focusableElements;
    }
    const contentEle: Element = this.contentRef.nativeElement;
    if (contentEle) {
      const elements: NodeListOf<Element> = contentEle.querySelectorAll(TiModalComponent.tababbleSelector);
      [].forEach.call(elements, (element: any) => {
        // 找出页面真实显示的元素，只有显示的元素才可tab聚焦
        if (getComputedStyle(element).display !== 'none' && element.offsetWidth > 0 && element.offsetHeight > 0) {
          this.focusableElements.push(element);
        }
      });
    }

    return this.focusableElements;
  }
}
