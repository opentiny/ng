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
  DoCheck,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TiBrowser, Util } from '@opentiny/ng-utils';
import { TiAutofocusComponent } from '@opentiny/ng-base';
import { NgControl } from '@angular/forms';
import { TiRenderer } from '@opentiny/ng-renderer';
import packageInfo from '../package.json';
/**
 * Textarea多行文本框组件
 *
 * 文本框组件基于原生textarea标签进行扩展，原生textarea加tiTextarea属性指令即为textarea组件。
 *
 */
@Component({
  selector: '[tiTextarea]', // 指定组件名称
  templateUrl: './textarea.html', // 指定组件模板
  styleUrls: ['./textarea.less'], // 样式路径
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(focus)': 'onFocus()'
  },
  encapsulation: ViewEncapsulation.None
})
export class TiTextareaComponent extends TiAutofocusComponent implements OnInit, AfterViewChecked, AfterViewInit, DoCheck, OnDestroy {
  /**
   * 文本框大小，该属性提供了四个属性值: vertical（仅可调整垂直方向的大小，即调整组件的高度）、
   * horizontal（仅可调节水平方向的大小，即调整组件的宽度）、
   * both（水平和垂直方向均可调节，宽高都可调节）、
   * none（不可调整组件大小）
   */
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'both';
  /**
   * @ignore
   */
  @ViewChild('resize') private resizeIconRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('maxlength') private eleCharacterRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('charactersCount') private charactersCountRef: ElementRef;
  /**
   * @ignore
   * 是否设置maxlength属性
   */
  public hasMaxlength: boolean;
  /**
   * @ignore
   * 用户设置的最大值
   */
  public maxLength: number;
  /**
   * @ignore
   * 当前输入内容的长度
   */
  public countLength: number;
  protected versionInfo: string = super.getVersion(packageInfo);
  // 用作拖动文本框大小
  private options: any = {
    $target: undefined,
    storeWidth: 0,
    storeHeight: 0,
    mouseXPosition: 0,
    mouseYPosition: 0
  };
  // 默认最大最小宽高
  private defaultStyle: any = {
    minWidth: 60,
    minHeight: 64,
    maxWidth: 1280,
    maxHeight: 9999
  };
  private element: HTMLTextAreaElement; // 宿主元素
  private attrs: NamedNodeMap; // 宿主元素的属性
  private container: HTMLDivElement; // 创建div标签
  private textAreaMinWidth: number; // 最小宽度
  private textAreaMinHeight: number; // 最小高度
  private textAreaMaxWidth: number; // 最大宽度
  private textAreaMaxHeight: number; // 最大高度
  private isVisibleInit: boolean; // 标志初始时是否可见
  private isFirstFocus: boolean = true; // 是否为第一次聚焦
  private documentMouseMoveListener: () => void;
  private documentMouseUpListener: () => void;
  private textareaResizeObserver: any;

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private tiRenderer: TiRenderer,
    private zone: NgZone,
    @Optional() private formControl: NgControl,
    @Inject(DOCUMENT) private document,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer);
    this.element = elementRef.nativeElement; // 获取宿主元素
    this.attrs = this.element.attributes; // 可以根据属性名获取各个属性
    this.container = this.renderer.createElement('div'); // 创建div标签
    this.renderer.addClass(this.container, 'ti3-textarea-container');
  }

  ngOnInit(): void {
    super.ngOnInit();
    // 初始化maxlength属性
    this.hasMaxlength = Util.isUndefined(this.attrs['maxlength']) ? false : true;
    // 原生不设置maxlength属性时该值为-1
    this.maxLength = this.hasMaxlength ? this.element.maxLength : -1;
    // 文本框的值发生变化时触发
    // 使用ngModel初始赋值时，触发valueChanges。
    // 使用formControl初始赋值时，不会触发valueChanges。
    if (this.formControl) {
      this.formControl.valueChanges.subscribe((value: any) => {
        this.setCountLength();
        // onpush策略，需要手动触发变更检测
        this.changeDetectorRef.markForCheck();
      });
    }

    // 使用formControl初始赋值时，初始化不会触发valueChanges，所以此处额外执行一次。
    // 使用ngModel初始赋值时，此处通过this.element.value拿到的值为空字符串，无法正确显示当前输入内容的长度
    this.setCountLength();
  }

  ngAfterViewInit(): void {
    // 如果祖先元素中display为none，获取到的组件的宽度为0,元素不可见
    this.isVisibleInit = this.element.offsetWidth !== 0;
    if (this.isVisibleInit) {
      this.setContainerstyle();
    }

    // maxLength接口添加样式
    this.setMaxLengthFn();

    // 处理resize功能
    this.resizeFn();
    // 上面执行完初始化dom后，调用父类的ngAfterViewInit去设置autofocus
    super.ngAfterViewInit();
    if (!this.isVisibleInit && (window as any).ResizeObserver) {
      // 利用 ResizeObserver 来监听宿主元素的尺寸发生改变的时机。IE不支持 ResizeObserver。
      this.textareaResizeObserver = new (window as any).ResizeObserver((entries: any): void => {
        // 初始祖先元素中display为none，之后第一次由none变成可见时
        if (entries[0] && entries[0].contentRect.width !== 0) {
          this.setContainerstyle();
          this.textareaResizeObserver.disconnect();
        }
      });
      this.textareaResizeObserver.observe(this.element);
    }
  }

  ngAfterViewChecked(): void {
    // 修复SSR报错：ERROR ReferenceError: getComputedStyle is not defined
    if (typeof getComputedStyle === 'undefined') {
      return;
    }
    // 处理通过设置display的方式隐藏组件：内部生成的dom也需要隐藏
    if (getComputedStyle(this.element).display === 'none') {
      this.renderer.setStyle(this.container, 'display', 'none');
    } else {
      this.renderer.setStyle(this.container, 'display', 'block');
    }
  }
  // maxlength通过接口传值需触发重新判断，因为init函数中执行较早且只执行一次。
  ngDoCheck(): void {
    this.hasMaxlength = Util.isUndefined(this.attrs['maxlength']) ? false : true;
    this.maxLength = this.hasMaxlength ? this.element.maxLength : -1;
  }

  // 销毁组件时需要将内部生成dom也移除
  ngOnDestroy(): void {
    this.renderer.removeChild(this.renderer.parentNode(this.container), this.container);
    if (this.documentMouseMoveListener) {
      this.documentMouseMoveListener();
    }
    if (this.documentMouseUpListener) {
      this.documentMouseUpListener();
    }

    if (this.textareaResizeObserver) {
      this.textareaResizeObserver.disconnect();
    }
  }

  /**
   * @ignore
   */
  public onFocus(): void {
    // IE和火狐浏览器在首次autofoucus聚焦时会将光标移到文字起始位置，用户体验不好
    // 需要手动设置光标位置到行尾
    if (this.isFirstFocus && (this.element as any).autofocus && (TiBrowser.isFirefox() || TiBrowser.isIE())) {
      this.element.setSelectionRange(this.element.value.length, this.element.value.length);
    }
    this.isFirstFocus = false;
  }

  private setContainerstyle(): void {
    // 设置container的样式
    this.setContainerSize();
    // 将宿主元素的样式类移到container上
    this.setContainerClass();
    // 初始化创建dom
    this.initFn();
  }

  private setContainerSize(): void {
    // 修正SSR错误：ERROR ReferenceError: getComputedStyle is not defined
    if (typeof getComputedStyle === 'undefined') {
      return;
    }

    // 判断用户设置的width是否为百分比
    const PERCENT_REGEXP: RegExp = /^(100|[1-9]?\d(.\d\d?\d?)?)%$|0$/;
    const width: string = this.element.style.width;
    const isPercent: boolean = PERCENT_REGEXP.test(width);

    this.tiRenderer.setStyles(this.container, {
      height: getComputedStyle(this.element).height,
      width: isPercent ? width : getComputedStyle(this.element).width,
      // 若服务在textarea上面设置margin外边距,会导致textarea所占的页面空间大于外框的宽高,所以要将textarea上设置的margin转移到外边框
      margin: this.element.style.margin
    });
    // 取掉宿主元素的margin属性:
    this.element.style.margin = '';
  }

  private setContainerClass(): void {
    // 获取未经过angular解析后的属性需要在onint中处理：若服务在textarea添加class，则把其加到父容器上
    const cNames: string = this.element.className;
    if (cNames) {
      const cNameArr: Array<string> = this.element.className.split(' '); // 存在多个class
      for (const cName of cNameArr) {
        // 跟校验有关的样式是以"ng-"开头，如果转移到外部容器上会影响校验样式
        if (!/^ng-/.test(cName)) {
          this.renderer.removeClass(this.element, cName);
          this.renderer.addClass(this.container, cName);
        }
      }
    }
  }

  // 初始化创建dom
  private initFn(): void {
    const pNode: any = this.renderer.parentNode(this.element); // 找到宿主元素父元素
    const nextNode: any = this.renderer.nextSibling(this.element); // 找到宿主元素的兄弟元素

    // 将宿主元素包裹在this.container里边：
    this.renderer.removeChild(pNode, this.element); // 从父元素中移除宿主元素
    this.renderer.appendChild(this.container, this.element); // 将宿主元素放入创建的div标签中
    this.renderer.insertBefore(pNode, this.container, nextNode);

    if (this.resize !== 'none') {
      this.moveNode(this.resizeIconRef.nativeElement);
    }

    if (this.hasMaxlength) {
      this.moveNode(this.eleCharacterRef.nativeElement);
    }
  }

  private moveNode(node: Element): void {
    this.renderer.removeChild(this.element, node);
    this.renderer.appendChild(this.container, node);
  }

  // maxLength接口
  private setMaxLengthFn(): void {
    // 添加字数限制与当前输入字数显示功能
    if (this.attrs['maxlength'] && !isNaN(this.maxLength)) {
      // 有maxlength限制时给外框div加上标志类 ti3-textarea-container-counter
      this.renderer.addClass(this.container, 'ti3-textarea-container-counter');
    } else {
      this.renderer.removeClass(this.container, 'ti3-textarea-container-counter');
    }
  }

  // resize接口
  private resizeFn(): void {
    if (this.resize === 'none') {
      return;
    }

    this.textAreaMinWidth = this.getSizeNumber('minWidth');
    this.textAreaMinHeight = this.getSizeNumber('minHeight');
    this.textAreaMaxWidth = this.getSizeNumber('maxWidth');
    this.textAreaMaxHeight = this.getSizeNumber('maxHeight');

    // 清除textarea上的样式
    this.tiRenderer.setStyles(this.element, {
      minWidth: '',
      minHeight: '',
      maxWidth: '',
      maxHeight: ''
    });

    this.zone.runOutsideAngular(() => {
      // 避免不停触发变化检测
      // resizeIconRef模板的mousedown事件
      this.renderer.listen(this.resizeIconRef.nativeElement, 'mousedown', ($event: MouseEvent) => {
        this.renderer.addClass(this.element, 'ti3-textarea-resize-border'); // 拖拽时边框颜色为聚焦时
        this.options.$target = $event.target;
        this.options.mouseXPosition = $event.pageX;
        this.options.mouseYPosition = $event.pageY;
        // 在拖动前获取当前文本框最新的高度、宽度
        this.updateTextAreaSize();
        // 给页面设置不可选样式，避免拖动时页面出现被选中的蓝色区域
        this.toggleTextSelection(true);
      });

      // resizeIconRef模板的mouseup事件
      this.renderer.listen(this.resizeIconRef.nativeElement, 'mouseup', ($event: MouseEvent) => {
        this.renderer.removeClass(this.element, 'ti3-textarea-resize-border');
      });

      this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.mouseMoveHandlerFn);
      this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.mouseUpHandlerFn);
    });
  }

  private setCountLength(): void {
    if (this.hasMaxlength) {
      this.countLength = this.element.value.length;
      // safari浏览器回车键是按两个字计算
      if (TiBrowser.isSafari()) {
        this.countLength = this.countLength + this.element.value.split('\n').length - 1;
      }
    }
  }

  // 拖动函数
  private mouseMove(event: MouseEvent): void {
    // 阻止调整文本框大小时文本框聚焦
    event.preventDefault();
    const width: number = this.options.storeWidth;
    const height: number = this.options.storeHeight;
    const horizonWidth: number = event.pageX - this.options.mouseXPosition;
    const verticalHeight: number = event.pageY - this.options.mouseYPosition;

    if (this.resize !== 'vertical' && width + horizonWidth >= this.textAreaMinWidth && width + horizonWidth < this.textAreaMaxWidth) {
      // 更新textarea宽度
      this.options.storeWidth += horizonWidth;
      // 调整width
      this.renderer.setStyle(this.container, 'width', `${this.options.storeWidth}px`);
    }

    if (
      this.resize !== 'horizontal' &&
      height + verticalHeight >= this.textAreaMinHeight &&
      height + verticalHeight < this.textAreaMaxHeight
    ) {
      // 更新textarea高度
      this.options.storeHeight += verticalHeight;
      this.renderer.setStyle(this.container, 'height', `${this.options.storeHeight}px`);
    }

    // 更新光标位置
    this.options.mouseXPosition = event.pageX;
    this.options.mouseYPosition = event.pageY;
  }

  private stopResize(): void {
    this.options.mouseXPosition = 0;
    this.options.mouseYPosition = 0;
    this.updateTextAreaSize();
    this.options.$target = null;
  }

  // 获取min-width、min-height等的样式值
  private getSizeNumber(value: string): number {
    const val: string = this.element.style[value]; // 可实现获取样式

    if (val !== 'none' && val !== '') {
      return parseFloat(val.replace(/px/, ''));
    }

    return this.defaultStyle[value];
  }

  // 在拖动前获取当前文本框最新的高度、宽度
  private updateTextAreaSize(): void {
    this.options.storeWidth = this.container.clientWidth;
    this.options.storeHeight = this.container.clientHeight;
  }

  // 给页面设置不可选样式，避免拖动时页面出现被选中的蓝色区域
  private toggleTextSelection(toggle: boolean): void {
    const body: any = this.document.getElementsByTagName('body');
    if (toggle) {
      this.renderer.addClass(body[0], 'ti3-unselectable');
      this.renderer.setAttribute(body[0], 'unselectable', 'on');
    } else {
      this.renderer.removeClass(body[0], 'ti3-unselectable');
      this.renderer.removeAttribute(body[0], 'unselectable');
    }
  }

  /**
   * @ignore
   * 绑定在document上的mouseMove事件
   */
  public mouseMoveHandlerFn = ($event: MouseEvent): void => {
    // 拖动的动作应该是先mousedown，然后mousemove，因此先判断是否已经触发了mousedown
    if ((this.options.mouseXPosition === 0 && this.options.mouseYPosition === 0) || !this.options.$target) {
      return;
    }
    this.mouseMove($event);
  };
  /**
   * @ignore
   * 绑定在document上的mouseUp事件
   */
  public mouseUpHandlerFn = (): void => {
    // 解决问题：当拖动鼠标时，鼠标不在小三角上时，鼠标放开不会移除样式
    // 为确保鼠标弹起时, textarea的边框样式恢复默认:
    if (this.isResizing()) {
      this.renderer.removeClass(this.element, 'ti3-textarea-resize-border');
    }
    try {
      this.stopResize();
      this.toggleTextSelection(false);
    } catch (e) {}
  };

  private isResizing(): boolean {
    return this.element.className.indexOf('ti3-textarea-resize-border') > -1;
  }
}
