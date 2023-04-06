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
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiDropComponent } from '@opentiny/ng-drop';
import { TiListComponent, TiListScrollLoad } from '@opentiny/ng-list';
import { TiKeymap } from '@opentiny/ng-utils';
import { TiPositionType } from '@opentiny/ng-utils';
import { TiLocale } from '@opentiny/ng-locale';
import packageInfo from '../package.json';

/**
 * @ignore
 * 下拉面板带有数组列表组件，用于aucomplete等。它有子类TiDropsearchComponent
 */
@Component({
  selector: 'ti-droplist',
  templateUrl: './droplist.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiDroplistComponent)]
})
export class TiDroplistComponent extends TiFormComponent {
  /**
   * 带搜索框情况下需要去除的高度
   */
  protected static readonly SEARCHBOX_EXCLUDE_HEIGHT: number = 28; // 下拉框中的搜索框的高度
  /**
   * 默认高度8条 DEFAULT_LIST_MAX_HEIGHT
   */
  protected defaultListMaxHeight: number = TiListComponent.OPTION_DEFAULT_HEIGHT * 8 + TiListComponent.CONTAINER_VERTICAL_PADDING;
  /**
   * 面板中，除去list外，其它元素的占位高度
   */
  protected heightExcludeList: number = 2;
  protected versionInfo: string = super.getVersion(packageInfo);
  /**
   * drop面板最大高度
   */
  private dropMaxHeight: number;
  /**
   * drop面板自定义底部高度
   */
  private footerHeight: number = 0;
  /**
   * droplist依附的元素，需要使用该元素进行droplist的定位处理
   */
  @Input() dominatorElem: HTMLElement;
  /**
   * 是否多选
   */
  @Input() multiple: boolean = false;
  /**
   * 下拉面板的最大显示宽度，该变量与下拉类组件保持一致
   *
   * 1."justified"(默认): 下拉框的宽度与Select组件的宽度保持一致；
   *
   * 2."auto": 下拉框的宽度根据下拉选项的内容自动撑开；
   *
   * 3.表示宽度的字符串: 设置固定的下拉框宽度(不小于Select组件的宽度)。例如："200px"
   */
  @Input() panelWidth: 'justified' | 'auto' | string = 'justified';
  /**
   * 下拉面板的最大显示高度，溢出时则出滚动条,该变量名与下拉类组件保持一致
   */
  @Input() panelMaxHeight: string;
  @Input() options: Array<any>;
  @Input() labelKey: string = 'label';
  @Input() noDataText: string = TiLocale.getLocaleWords().tiList.noDataText;
  @Input() tipPosition: TiPositionType = 'right';
  @Input() dominatorSpace: string = TiDropComponent.DOMINATOR_SPACE + 'px';
  @Input() panelAlign: 'left' | 'right' = 'left';
  /**
   * 内部接口，用作suggestion时type传入suggestion，默认值default
   */
  @Input() type: 'default' | 'suggestion' = 'default';
  /**
   * 大小样式，default/small. 默认值default
   */
  @Input() size: 'default' | 'small' = 'default';
  /**
   * 选中选项后面板是否保持显示， 默认值false
   */
  @Input() isShowAfterSelect: boolean = false;

  /**
   * 是否开启虚拟滚动， 默认值false
   */
  @Input() virtual: boolean = false;
  /**
   * @ignore
   * TODO: 暂不对外开放该接口，后续根据使用场景进行优化
   * 当开启虚拟滚动时，可配置单条选项的高度(单位是px)， 默认值30
   */
  @Input() itemSize: number = TiListComponent.OPTION_DEFAULT_HEIGHT;

  @Input() tipMaxWidth: string;
  /**
   * @ignore
   *
   *
   * idKey指定的属性的值相等时即认为 option 选项是选中的。选中项 ngModel 中的数据(modelOption对象)跟 options 数据集中的选项(option对象)之间对应相等关系的依据属性。当
   *  modelOption中的 idKey 设置的属性的值 与 option 中的 idKey 设置的属性的值相等时，则认为 modelOption 和 option 是对应的相等关系，即认为 option 选项是选中的。
   *
   * 默认当 modelOption === option 或者 modelOption 中的 labelKey 设置的属性的值 与 option 中的 labelKey 设置的属性的值相等时，则认为 option 选项是选中的。
   *
   * 该接口暂不对外开放，后续如果业务场景labelKey对应的值确实有重复时，再对外开放该接口。
   */
  @Input() idKey: string;
  /**
   * @ignore
   * 用于定位的参照元素，如果该接口有值，表示drop不添加在body上，而是跟随宿主元素
   */
  @Input() referElem: Element;

  /**
   * 选中事件，向外通知option数据
   */
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 下拉列表滚动到底部的回调
   *
   *
   */
  @Output() readonly scrollToBottom: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TiDropComponent, { static: true }) dropCom: TiDropComponent;
  @ViewChild(TiListComponent, { static: false }) listCom: TiListComponent;
  @ViewChild('footer', { static: false }) footerElemRef: ElementRef;
  /**
   * 自定义list中的item的模板
   */
  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;
  /**
   * 储存donimator bottom旧值
   */
  private dominatorLastBottom: number = undefined;
  /**
   * 储存donimator left旧值
   */
  private dominatorLastLeft: number = undefined;
  /**
   * @ignore
   * list 是否已初始化。在打开面板前 listInited 一直为false，第一次打开面板后 listInited 就一直为true
   */
  public listInited: boolean = false;
  /**
   * 虚拟滚动容器的高度
   */
  private virtualScrollViewportMaxHeight: number;
  /**
   * 承接 CdkVirtualScrollViewport 实例上的 checkViewportSize 方法供组件在下拉框高度发生变化时调用
   */
  private checkVirtualScrollViewportSize: () => void;
  private unlistenKeydownFn: () => void;
  constructor(
    protected hostRef: ElementRef,
    protected render: Renderer2,
    public changeDetectorRef: ChangeDetectorRef,
    protected zone: NgZone
  ) {
    super(hostRef, render, changeDetectorRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.listenKeydown(this.dominatorElem);
  }
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // dominatorElem 改变后重新添加监听
    if (changes['dominatorElem'] && !changes['dominatorElem'].firstChange) {
      this.unlistenKendown();
      this.listenKeydown(this.dominatorElem);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // 解除按键监听
    this.unlistenKendown();
  }
  /**
   * 当做生命周期用吧，监听模型值变化。包括writeValue和this.model=赋值 这两个时刻。
   * @param model ngModel值
   */
  protected ngOnModelChange(model: any): void {
    super.ngOnModelChange(model);
    if (!this.multiple || !this.dominatorElem) {
      // 多选才会有dominator行高切换
      return;
    }
    if (this.dominatorLastBottom === undefined && this.dominatorElem) {
      // 第一次只记录位置，不走进重定位逻辑
      // 修复SSR错误：ERROR TypeError: this.dominatorElem.getBoundingClientRect is not a function
      if (typeof this.dominatorElem.getBoundingClientRect === 'function') {
        this.dominatorLastBottom = this.dominatorElem.getBoundingClientRect().bottom;
        this.dominatorLastLeft = this.dominatorElem.getBoundingClientRect().left;
      }

      return;
    }

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        // TODO：这里setTimeout能否去除？
        if (!this.dominatorElem) {
          return;
        }
        // ngModel更新（点击checkbox，或者点击叉叉号）后，dominator有可能一行/两行变换，所以更新下拉面板位置。
        // 甚至donimator本身位置也会变动。（比如测试用例中元素变动，引起donimator本身变动 ???）
        if (
          this.dominatorLastBottom !== this.dominatorElem.getBoundingClientRect().bottom ||
          this.dominatorLastLeft !== this.dominatorElem.getBoundingClientRect().left
        ) {
          if (this.dropCom.isShow) {
            // 仅当高度变化时，重定位。
            this.rePosition();
          }
          this.dominatorLastBottom = this.dominatorElem.getBoundingClientRect().bottom;
          this.dominatorLastLeft = this.dominatorElem.getBoundingClientRect().left;
        }
      }, 0);
    });
  }

  /**
   *  监听keydown
   * @param focusElem 焦点元素
   */
  protected listenKeydown(focusElem: HTMLElement): void {
    if (!focusElem) {
      return;
    }
    this.unlistenKeydownFn = this.renderer.listen(focusElem, 'keydown', (event: KeyboardEvent) => {
      if (!this.isShow) {
        return;
      }
      // 10.0.2删除 KEY_SPACE 空格快捷键的响应
      switch (event.keyCode) {
        case TiKeymap.KEY_ESCAPE: // Esc键，仅可关闭
        case TiKeymap.KEY_TAB: // Tab键，仅可关闭
          event.preventDefault(); // 阻止触发blurFn
          this.hide();
          break;
        case TiKeymap.KEY_ARROW_UP: // 向上箭头，上移选项
        case TiKeymap.KEY_ARROW_DOWN: // 向下箭头，下移选项
        case TiKeymap.KEY_ENTER: // ENTER键 相当于click
        case TiKeymap.KEY_NUMPAD_ENTER: // ENTER键(苹果数字小键盘)
          this.listCom.onKeydown(event);
          break;
        default:
          break;
      }
      // 如果droplist响应了按键，那么就不再冒泡。
      event.stopPropagation();
    });
  }
  protected unlistenKendown(): void {
    if (this.unlistenKeydownFn) {
      this.unlistenKeydownFn();
    }
  }
  /**
   * 外部接口: 获取当前状态, 只读不写
   */
  public get isShow(): boolean {
    return this.dropCom.isShow;
  }

  /**
   * 打开面板
   */
  public show(): void {
    if (!this.isShow) {
      let inited: boolean = false;
      if (!this.listInited) {
        // 初始化 TiListComponent, ngIf 绑定 listInited 值
        this.listInited = true;
        this.changeDetectorRef.detectChanges();
        this.processCdkVirtualScroll();
        inited = true;
      }
      // 每次打开面板前需要重置list的高度确保drop高度不受其影响
      this.initListMaxHeight();
      // 打开面板
      this.dropCom.show();
      // 根据drop的最大高度设置list的最大高度
      this.restyleListMaxHeight();

      if (!this.listCom) {
        return;
      }
      if (inited && this.model) {
        // 首次打开面板时，在此处model值还没传递到listcom组件中去，如果直接调用 listCom.scrollToSelected 方法时，该方法中获取的 model(listComponent中) 值不准确，
        // 为了保证 listCom.scrollToSelected 方法中 model 值准确，从而滚动条定位准确，这里需要延时处理下
        setTimeout(() => {
          this.listCom.scrollToSelected();
        }, 0);
      } else {
        this.listCom.scrollToSelected();
      }
      // IE滚动条Bug的监听
      this.listCom.listenIESrollbarBug();
    }
  }
  /**
   * 关闭面板的处理
   */
  public hide(): void {
    // this.listCom.hide(); // 隐藏时list也需要做处理：清除当前hover项状态
    if (this.isShow) {
      this.dropCom.hide(); // 关闭面板
      // 解除IE滚动条Bug的监听
      if (this.listCom) {
        this.listCom.unlistenIESrollbarBug();
      }
    }
  }
  /**
   * @ignore
   */
  public onScrollToBottom(scrollLoad: TiListScrollLoad): void {
    this.scrollToBottom.emit(scrollLoad);
  }
  /**
   * 重新设置元素位置
   */
  public rePosition(optionsChange?: boolean): void {
    if (!this.dropCom || !this.dropCom.isShow) {
      return;
    }
    if (optionsChange) {
      this.dropCom.resetPosition();
    } else {
      this.dropCom.setPosition();
    }

    this.restyleListMaxHeight();
  }
  /**
   * 根据drop的压缩情况，设置list的max-height
   */
  public restyleListMaxHeight(): void {
    if (!this.listCom) {
      return;
    }
    // 计算自定义底部的高度
    if (this.footerElemRef && this.footerElemRef.nativeElement) {
      const rect: any = this.footerElemRef.nativeElement.getBoundingClientRect();
      if (rect.height) {
        this.footerHeight = rect.height;
      }
    }
    // 如果drop被压缩，则根据drop最大高度设置当前list最大高度。
    const dropCurMaxHeight: number = parseInt(this.dropCom.nativeElement.style.maxHeight, 10);
    let dropMaxHeightAdapted: number = this.dropMaxHeight + this.footerHeight;
    if (!isNaN(dropCurMaxHeight) && dropCurMaxHeight < dropMaxHeightAdapted) {
      dropMaxHeightAdapted = dropCurMaxHeight;
      const computedListMaxHeight: number = dropMaxHeightAdapted - this.heightExcludeList - this.footerHeight;
      // 设置list max-height
      this.renderer.setStyle(this.listCom.nativeElement, 'max-height', computedListMaxHeight + 'px');
    }
    // 面板高度发生变化时需要虚拟滚动相关重新计算实际需要渲染的option选项
    if (this.virtual) {
      const listMaxHeight: number = parseInt(this.listCom.nativeElement.style.maxHeight, 10);
      if (listMaxHeight !== this.virtualScrollViewportMaxHeight && this.checkVirtualScrollViewportSize) {
        this.virtualScrollViewportMaxHeight = listMaxHeight;
        this.checkVirtualScrollViewportSize.apply(this.listCom.virtualScrollViewport);
      }
    }
  }
  // 初始化list最大高度
  private initListMaxHeight(): void {
    // 此处做容错处理，如果list面板不存在，不用进行设置
    if (!this.listCom) {
      return;
    }
    this.dropMaxHeight = this.panelMaxHeight ? parseInt(this.panelMaxHeight, 10) : this.defaultListMaxHeight + this.heightExcludeList;
    this.renderer.setStyle(this.listCom.nativeElement, 'max-height', this.dropMaxHeight - this.heightExcludeList + 'px');
  }
  // 鼠标或enter点击选项后，组件隐藏
  public onSelect(option: any): void {
    this.select.emit(option);
    // nextlevel只用在省市区regionselect组件场景，选中省、市级别面板不关闭
    if (!this.isShowAfterSelect && !this.multiple && !option.nextLevel) {
      this.hide();
    }
  }

  private processCdkVirtualScroll(): void {
    if (!this.virtual || !this.listCom?.virtualScrollViewport) {
      return;
    }

    // 因为接下来组件会覆写 CdkVirtualScrollViewport 实例上的 checkViewportSize 方法，所以这里先承接 CdkVirtualScrollViewport 实例上
    // 的 checkViewportSize 方法供组件在下拉框高度发生变化时调用来重新计算实际需要渲染的option选项。
    if (!this.checkVirtualScrollViewportSize) {
      this.checkVirtualScrollViewportSize = this.listCom.virtualScrollViewport.checkViewportSize;
    }

    // 在 @angular/CDK 提供的虚拟滚动处理中，当 window 的 resize 和 orientationchange 事件触发时会调用 CdkVirtualScrollViewport 实例上的 checkViewportSize 方法，
    // 而这时组件的下拉框display为none，那么计算虚拟滚动容器的高度是不准确的(计算出来的实际需要渲染的option选项也就是不准确的，影响下一次打开面板时面板中呈现的数据)，
    // 由于组件下拉框display为none时其实是不可见的，不需要做任何处理，所以这里直接覆写置空 CdkVirtualScrollViewport 实例上的 checkViewportSize 方法。
    if (this.listCom.virtualScrollViewport.checkViewportSize !== this.nullFn) {
      this.listCom.virtualScrollViewport.checkViewportSize = this.nullFn;
    }

    // 在 @angular/CDK 提供的虚拟滚动处理中，在 虚拟滚动容器初始化 / options改变 / window的resize和orientationchange事件 这三种场景下会计算实际需要渲染的option选项，
    // 在这个计算过程中会调用其 CdkVirtualScrollViewport 实例上的 getViewportSize 方法来获取滚动容器的高度。
    // 由于下拉框中的options改变时，下拉框可能并没有打开(display为none),这时获取到的滚动容器的高度的高度是不准确的。
    // 因为上述原因，这里直接接管覆写了 CdkVirtualScrollViewport 实例上的 getViewportSize 方法。
    if (this.listCom.virtualScrollViewport.getViewportSize !== this.getCdkViewportSize) {
      this.listCom.virtualScrollViewport.getViewportSize = this.getCdkViewportSize;
    }
  }

  private nullFn: () => void = (): void => {};
  // 虚拟滚动容器初始化，options改变， list的最大高度改变(打开面板或重定位) 时都会调用到该方法
  private getCdkViewportSize: () => number = (): number => {
    if (!this.listCom) {
      return;
    }
    const contentHeight: number = this.listCom.options?.length > 0 ? this.itemSize * this.listCom.options.length : 0;
    if (isNaN(this.virtualScrollViewportMaxHeight)) {
      return contentHeight;
    }
    const contentMaxHeight: number =
      this.multiple && this.listCom?.selectAll && this.listCom.options?.length > 0
        ? this.virtualScrollViewportMaxHeight - TiListComponent.OPTION_DEFAULT_HEIGHT
        : this.virtualScrollViewportMaxHeight;

    return contentHeight < contentMaxHeight ? contentHeight : contentMaxHeight;
  };
}
