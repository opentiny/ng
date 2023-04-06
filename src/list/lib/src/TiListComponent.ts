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
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiBrowser, TiKeymap, TiPositionType } from '@opentiny/ng-utils';
import { TiLocale } from '@opentiny/ng-locale'; // 获取词条
import packageInfo from '../package.json';

/**
 * scrollToBottom 事件回调参数
 *
 */
export interface TiListScrollLoad {
  /**
   * 是否正在加载数据
   */
  loading?: boolean;
  /**
   * scroll 事件的 event 参数
   */
  event?: Event;
}

/**
 * @ignore
 *  列表组件，使用者有menu、droplist
 */
@Component({
  selector: 'ti-list',
  templateUrl: './list.html',
  styleUrls: ['./list.less', './list-multi.less'],
  providers: [TiFormComponent.getValueAccessor(TiListComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-virtual-scroll-list]': 'virtual'
  }
})
export class TiListComponent extends TiFormComponent {
  public static readonly OPTION_DEFAULT_HEIGHT: number = 30; // 每项的默认高度， 单位是px
  public static readonly CONTAINER_VERTICAL_PADDING: number = 8; // list容器(出滚动条的容器)的上下padding总和值(上下各4px)
  protected static readonly SCROLL_TOP_TIME: number = 200; // 设置选中项滚动到TOP所需时间。Chorme下简单测试。TODO：其他浏览器、复杂数据

  // 列表数据配置
  @Input() multiple: boolean = false; // 是否多选
  @Input() options: Array<any>; // 下拉选项的全部数据
  @Input() labelKey: string = 'label'; // 要显示的字段
  @Input() tipPosition: TiPositionType = 'right';
  @Input() noDataText: string; // 无数据时的显示文本
  @Input() hideEmptyOption: boolean = false; // 过滤空字符串选项
  @Input() selectAll: boolean = false; // 多选模式下是否有全选功能
  /**
   * 用于配置是否显示children字段数据，大部分场景需要显示children，cascader不需要
   */
  @Input() showChildren: boolean = true;
  /**
   * @ignore
   * 适配内部time类组件，点选滚动效果,暂不开放。
   */
  @Input() scrollTop: number = 0;
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
   * 选中事件，向外通知option数据
   */
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly hover: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 下拉列表滚动到底部的回调
   *
   *
   */
  @Output() readonly scrollToBottom: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 鼠标移入选项的回调，与hover不同，hover是hoverOption改变的回调
   */
  @Output() readonly optionMouseenter: EventEmitter<any> = new EventEmitter<any>();
  // item模板
  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;
  @ViewChild('ulRef', { static: false }) ulRef: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  virtualScrollViewport: CdkVirtualScrollViewport;

  /**
   *  需要阻止失焦标记: 点击面板时，会触发失焦，需要阻止失焦。
   *  IE兼容性问题: 点击滚动条，触发失焦，面板会收起
   *  修复方案：点击list面板区域（包含滚动条）后，给失焦元素强制获取焦点。修改Form基类不触发组件整体失焦。
   */
  private stopBlur: boolean = false;
  private unlistenIEScrollbarBugFns: Array<() => void> = [];
  public selectAllState: boolean;
  public selectAllText: string = TiLocale.getLocaleWords().tiList.selectAll;
  public optionSelectAll: string = 'all';
  private scrollEventSub: Subscription;
  public scrollLoadInfo: TiListScrollLoad = { loading: false };
  protected versionInfo: string = super.getVersion(packageInfo);

  private _hoverOption: any;
  public get hoverOption(): any {
    return this._hoverOption;
  }
  public set hoverOption(hoverOption: any) {
    if (this._hoverOption !== hoverOption) {
      this._hoverOption = hoverOption;
      // onpush策略 异步获取数据更改hoverOption，需要手动更新视图
      this.changeDetectorRef.markForCheck();
      this.hover.emit(hoverOption);
    }
  }
  protected optionScrollTopLastTime: number = 0;
  // 判断是否禁用的函数: 函数类型是(any) => boolean，赋值是(item: any) => {}
  @Input() isDisabledFn: (item: any) => boolean = (item: any) => {
    return item && item.disabled === true;
  }; // 这个分号是书写正确的
  constructor(protected hostRef: ElementRef, protected renderer: Renderer2, protected cd: ChangeDetectorRef, protected zone: NgZone) {
    super(hostRef, renderer, cd);
  }

  // 在Selected使用List时，Selected的聚焦元素是Dominator和Searchbox，它们接收按键，并调用list来处理。
  // 在表格列设置时，List自己聚焦，List处理按键。
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
    // 10.0.2删除 KEY_SPACE 空格快捷键的响应
    switch (event.keyCode) {
      case TiKeymap.KEY_ENTER: // ENTER键 相当于click
      case TiKeymap.KEY_NUMPAD_ENTER: // ENTER键(苹果数字小键盘)
        if (this.hoverOption) {
          this.selectOption(this.hoverOption);
        }
        break;
      case TiKeymap.KEY_ESCAPE: // Esc键，仅可关闭
      case TiKeymap.KEY_TAB: // Tab键，仅可关闭
        break;
      case TiKeymap.KEY_ARROW_UP: // 向上箭头，上移选项
        event.preventDefault(); // 防止上下按键默认行为：移动滚动条
        this.nextOption(true);
        break;
      case TiKeymap.KEY_ARROW_DOWN: // 向下箭头，下移选项
        event.preventDefault(); // 防止上下按键默认行为：移动滚动条
        this.nextOption(false);
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.renderer.listen(this.nativeElement, 'mousedown', (event: MouseEvent): void => {
        // Select时，点击滚动条和点击面板，不要触发默认行为：dominator blur
        // 现在，list默认不聚焦。在所有场合，点击面板或者滚动条，都不触发默认焦点事件。
        event.preventDefault(); // 防止dominator blur行为
        // list自身可以落焦点时，需要聚焦的默认行为。
      });

      // list内部滚动条会引起外部滚动条事件触发，引起弹框内的下拉组件无法使用鼠标拖动滚动条，因此此处阻止事件冒泡
      this.renderer.listen(this.nativeElement, 'mousewheel', (event: MouseEvent): void => {
        event.stopPropagation();
      });
      this.renderer.listen(this.nativeElement, 'DOMMouseScroll', (event: MouseEvent): void => {
        event.stopPropagation();
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (this.multiple && this.selectAll) {
      const optionsChange: SimpleChange = changes['options'];
      if (optionsChange) {
        this.setSelectedAllState();
      }
    }
    // 全选时，selectAll改变且当前值为true，更新全选框状态
    const selectAllChange: SimpleChange = changes['selectAll'];
    if (this.multiple && selectAllChange && selectAllChange.currentValue) {
      this.setSelectedAllState();
    }
    // time及datetime/datetimeRange组件使用list，点选时候需要滚动效果
    if (changes['scrollTop'] && !changes['scrollTop'].firstChange) {
      this.setScrollFn();
    }
    if (changes['options']) {
      this.setHoverOption();
    }
  }

  ngAfterViewInit(): void {
    if (this.scrollTop > 0) {
      this.setScrollFn();
    }
    if (this.scrollToBottom.observers.length > 0 && this.virtualScrollViewport) {
      this.scrollEventSub = this.virtualScrollViewport.elementScrolled().subscribe((event: Event): void => {
        if ((event.target as any).scrollTop + (event.target as any).clientHeight >= (event.target as any).scrollHeight) {
          this.scrollLoadInfo.event = event;
          this.zone.run(() => {
            this.scrollToBottom.emit(this.scrollLoadInfo);
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // 解除IE滚动条Bug的监听
    this.unlistenIESrollbarBug();
    if (this.scrollEventSub) {
      this.scrollEventSub.unsubscribe();
    }
  }

  writeValue(model: any): void {
    super.writeValue(model);
    if (this.multiple && this.selectAll) {
      this.setSelectedAllState();
    }
  }
  // time及datetime/datetimeRange组件使用list，点选时候需要滚动效果
  private setScrollFn(): void {
    if (TiBrowser.isIE()) {
      this.renderer.setProperty(this.hostRef.nativeElement, 'scrollTop', this.scrollTop);
      return;
    }
    this.hostRef.nativeElement.scrollTo(0, this.scrollTop);
  }

  // 下拉选项的鼠标按下操作
  public onMousedownItem(event: MouseEvent, own: HTMLElement): void {
    event.preventDefault();
    event.stopPropagation();
    own.classList.add('ti3-menu-panel-list-active');
  }

  // 下拉选项的鼠标按下后的抬起操作
  public onMouseupItem(event: MouseEvent, own: HTMLElement): void {
    this.removeClass(event, own);
  }

  // 下拉选项的鼠标离开时的操作
  public onMouseleaveItem(event: MouseEvent, own: HTMLElement): void {
    this.removeClass(event, own);
  }
  // 移除li元素上的ti3-menu-panel-list-active类
  public removeClass(event: MouseEvent, own: HTMLElement): void {
    event.preventDefault();
    event.stopPropagation();
    own.classList.remove('ti3-menu-panel-list-active');
  }

  // 下拉选项的单击操作（包括组名所在的<li>元素）
  public onClickItem(event: MouseEvent, option: any): void {
    // Selected时，点击选项，不要触发默认行为：dominator blur。
    event.preventDefault(); // 防止dominator blur行为
    // Group节点和禁用节点，无需响应。
    if (this.isGroup(option) || this.isDisabledFn(option)) {
      event.stopPropagation();

      return;
    }
    // 只处理左键和中键
    if (event.button !== TiKeymap.MOUSE_LEFT_BUTTON && event.button !== TiKeymap.MOUSE_MIDDLE_BUTTON) {
      // Tiny2这里逻辑错误TODO：
      return;
    }

    // 点击选中项
    this.selectOption(option);
    // 更新hover
    this.hoverOption = option;
  }

  public getVirtualScrollViewportHeight(): string {
    let height: number = TiListComponent.CONTAINER_VERTICAL_PADDING; // 这里的8是上下各4px的padding
    if (!this.options || this.options.length === 0) {
      return height + 'px';
    }
    height += this.options.length * this.itemSize;
    if (this.selectAll && this.multiple) {
      height += TiListComponent.OPTION_DEFAULT_HEIGHT; // 全选项的高度
    }

    return height + 'px';
  }

  private selectOption(option: any): void {
    // 全选
    if (this.multiple && this.selectAll && option === this.optionSelectAll) {
      this.selectAllOptions();
      this.select.emit(option);

      return;
    }

    let index: number = -1;
    if (this.multiple) {
      // 多选
      if (!this.model) {
        // 如果为空值
        this.model = [];
      }
      // 是否选中，取反
      index = this.getIndex(option, this.model);
      if (index === -1) {
        this.model.push(option); // 点击下拉项选中，选中项按用户操作顺序显示
      } else if (index !== -1) {
        this.model.splice(index, 1);
      }
      // 强行向外通知model改变。
      this.model = this.model.concat();
      // 设置全选状态
      if (this.selectAll) {
        this.setSelectedAllState();
      }
    } else {
      // 单选
      this.model = option;
    }
    this.select.emit(option);
  }

  private selectAllOptions(): void {
    if (!this.model) {
      // 如果为空值
      this.model = [];
    }
    const listOptions: Array<any> = this.getListOptions();
    let isChange: boolean = false;
    if (this.selectAllState === false || this.selectAllState === null) {
      listOptions.forEach((item: any) => {
        if (this.getIndex(item, this.model) === -1 && this.isSelectable(item)) {
          // 不在当前选中项且为可选数据项（排除禁用项和组名项）
          // 点击全选按钮时的选中值顺序与option的顺序一致
          const insertIndex: number = this.getInsertIndex(item);
          this.model.splice(insertIndex, 0, item);
          isChange = true;
        }
      });

      this.selectAllState = true;
    } else {
      listOptions.forEach((item: any) => {
        const index: number = this.getIndex(item, this.model);
        if (index !== -1 && !this.isDisabledFn(item)) {
          this.model.splice(index, 1);
          isChange = true;
        }
      });
      this.selectAllState = false;
    }
    if (isChange) {
      // model的值在以上循环中，多次变化，或者不变，根据isChange，一次性触发变化检测
      this.model = this.model.concat();
    }
  }

  public setSelectedAllState(): void {
    if (!this.model || this.model.length === 0 || !this.options || this.options.length === 0) {
      this.selectAllState = false;

      return;
    }
    const listOptions: Array<any> = this.getListOptions();
    const selectedOptions: Array<any> = listOptions.filter((item: any) => {
      return this.isSelectable(item) && this.isSelected(item);
    });
    if (selectedOptions.length === 0) {
      this.selectAllState = false;

      return;
    }
    const selectableOptions: Array<any> = listOptions.filter((item: any) => {
      return this.isSelectable(item);
    });
    this.selectAllState = selectedOptions.length === selectableOptions.length ? true : null;
  }

  // 获取新插入元素的插入次序，该次序与list集合中的元素顺序保持一致
  private getInsertIndex(option: any): number {
    const listOptions: Array<any> = this.getListOptions();
    const indexOfList: number = listOptions.indexOf(option); // 当前元素在list中的排序
    // 将该元素与已选中在list中的次序进行比较，如果该元素在某选中项次序之后，则将其插入该元素之后
    for (let i: number = this.model.length; i > 0; i--) {
      const itemIndexOfList: number = this.getIndex(this.model[i - 1], listOptions);
      if (itemIndexOfList < indexOfList) {
        return i;
      }
    }

    return 0;
  }
  public onMouseenterItem(event: MouseEvent, option: any): void {
    // 是可选项，且不是在选中项置Top时鼠标经过。
    if (this.isSelectable(option) && new Date().getTime() - this.optionScrollTopLastTime > TiListComponent.SCROLL_TOP_TIME) {
      this.hoverOption = option; // 更新hover
      this.optionMouseenter.emit(option);
    }
  }
  // 寻找下一个可选项。参数：向上/向下
  public nextOption(isUp: boolean): void {
    const listOptions: Array<any> = this.getListOptions();
    if (this.multiple && this.selectAll) {
      listOptions.unshift(this.optionSelectAll);
    }
    if (listOptions.filter((x: any) => this.isSelectable(x)).length === 0) {
      // 没有可选中的项目
      return;
    }
    let nextOption: any = this.hoverOption;
    let curIndex: number = listOptions.indexOf(nextOption);
    do {
      if (isUp) {
        if (curIndex > 0) {
          // 找到了，且不是第一个元素
          curIndex = curIndex - 1;
        } else {
          // -1没有找到, 0第一个元素
          curIndex = listOptions.length - 1; // 跳到第一个元素。
        }
      } else {
        if (curIndex < listOptions.length - 1) {
          // -1没有找到, 和不是最后一个
          curIndex = curIndex + 1;
        } else {
          // length - 1 最后一个元素
          curIndex = 0; // 跳到第一个元素。
        }
      }
      nextOption = listOptions[curIndex];
    } while (!(this.isSelectable(nextOption) || nextOption === this.hoverOption)); // 找到停止，或者寻找一圈停止
    // 没有找到结果
    if (nextOption === null || nextOption === this.hoverOption) {
      return;
    }
    // 改变hover选项。
    this.hoverOption = nextOption;
    this.cd.markForCheck();
    // 更新滚动条
    this.optionScollTop(this.hoverOption);
  }
  protected getListOptions(): Array<any> {
    let listOptions: Array<any> = []; // 装有所有选项的数组
    if (this.options) {
      this.options.forEach((x: any) => {
        listOptions.push(x);
        if (this.isGroup(x)) {
          listOptions = listOptions.concat(x.children);
        }
      });
    }

    return listOptions;
  }
  // 滚动到选中项元素，多选定位到第一个选中项元素，无选中项时定义到第一项元素；
  // 适用于每次下拉打开的场景
  public scrollToSelected(): void {
    // 获取当前选中项
    let selectedItem: any;
    if (this.multiple) {
      selectedItem = this.model && this.model.length > 0 ? this.model[0] : null;
    } else {
      selectedItem = this.model;
    }
    if (selectedItem) {
      // 有选中项时，自动定位到第一个选中元素
      this.scrollToEle(selectedItem, true);
    } else {
      // 无选中项时，定位在第一项元素
      if (this.virtual) {
        this.virtualScrollViewport.elementRef.nativeElement.scrollTop = 0;
      } else {
        this.nativeElement.scrollTop = 0;
      }
    }
    this.setHoverOption();
  }
  /**
   * 设置hoverOption
   * 用于数据更新时，非鼠标或快捷键操作时
   */
  private setHoverOption(): void {
    if (this.options?.length > 0) {
      if (this.hasSelectedinList()) {
        this.hoverOption = this.getHoverOptionInModel();
      } else {
        if (this.multiple && this.selectAll) {
          this.hoverOption = this.optionSelectAll;
        } else {
          if (this.options[0]?.children) {
            this.hoverOption = this.getGroupHoverOption();
          } else {
            this.hoverOption = this.options.find((option: any) => !this.isDisabledFn(option));
          }
        }
      }
    } else {
      this.hoverOption = undefined;
    }
  }

  /**
   * 单选有model的时候，单选的model不会是禁用项，hoverOption应当是model，
   * 多选有model的时候，hoverOption是第一个非禁用的model，如果model全部禁用，hoverOption是第一个禁用项往下的第一个可用项。
   */
  private getHoverOptionInModel(): any {
    return this.multiple
      ? this.options[
          this.getIndex(
            this.model.find((item: any) => !this.isDisabledFn(item)),
            this.options
          )
        ] ||
          this.options.find((item: any, index: number) => {
            return index > this.getIndex(this.model[0], this.options) && !this.isDisabledFn(item);
          })
      : this.options[this.getIndex(this.model, this.options)] || this.model;
  }
  /**
   * 判断当前list中是否有选中项，过滤后的数据有可能不含有选中项
   */
  private hasSelectedinList(): boolean {
    const listOption: Array<any> = this.getListOptions();
    if (this.multiple && this.model?.length > 0) {
      return !!this.model.find((item: any) => this.getIndex(item, listOption) !== -1);
    } else if (this.model) {
      return this.getIndex(this.model, listOption) !== -1;
    } else {
      return false;
    }
  }

  // 分组情况下，找到hoverOption
  private getGroupHoverOption(): any {
    let groupHoverOption: any;
    this.options.find((option: any): boolean => {
      if (option.children.length > 0) {
        groupHoverOption = option.children.find((child: any) => !this.isDisabledFn(child));
      }

      return groupHoverOption ? true : false; // 这个return只是为了结束find方法
    });

    return groupHoverOption; // 这个return是为了返回查找结果
  }
  private scrollToEle(option: any, isScrollBySelected: boolean = false): void {
    if (!option || !this.ulRef) {
      // 第一次model值改变时, ulRef不存在。
      return;
    }
    const listOptions: Array<any> = this.getListOptions();
    if (this.multiple && this.selectAll) {
      listOptions.unshift(this.optionSelectAll);
    }
    const curIndex: number = this.getIndex(option, listOptions);
    if (curIndex < 2 && isScrollBySelected) {
      if (this.virtual) {
        this.virtualScrollViewport.elementRef.nativeElement.scrollTop = 0;
      } else {
        this.nativeElement.scrollTop = 0;
      }

      return; // 前两项不需要滚动
    }
    // 下拉框有滚动条时，若上下选项足够，选中项为下拉框的第二项，这样可以展示选中项的前后选项
    const scrollTopOptionIndex: number = Math.max(curIndex - 1, 0);
    if (this.virtual) {
      this.virtualScrollViewport.elementRef.nativeElement.scrollTop = this.itemSize * scrollTopOptionIndex;
    } else {
      const ele: HTMLElement = this.ulRef.nativeElement.getElementsByTagName('LI')[scrollTopOptionIndex];
      if (ele) {
        this.nativeElement.scrollTop = ele.offsetTop;
      }
    }
  }
  private optionScollTop(option: any): void {
    this.optionScrollTopLastTime = new Date().getTime();
    this.scrollToEle(option);
  }

  // 是组数据项
  public isGroup(item: any): boolean {
    return item && Object.prototype.hasOwnProperty.call(item, 'children') && this.showChildren;
  }
  // 是可选数据项
  protected isSelectable(item: any): boolean {
    return !this.isGroup(item) && !this.isDisabledFn(item);
  }
  // 是已选中数据项
  public isSelected(item: any): boolean {
    if (!this.model) {
      return false;
    }

    if (this.multiple) {
      return this.getIndex(item, this.model) !== -1;
    }

    return this.isEqual(this.model, item);
  }

  // 选中项与options数据集中的选项的对应关系
  private isEqual(modelOption: any, option: any): boolean {
    if (this.idKey) {
      return modelOption[this.idKey] === option[this.idKey];
    }

    return (
      modelOption === option ||
      (modelOption[this.labelKey] !== undefined &&
        option[this.labelKey] !== undefined &&
        modelOption[this.labelKey] === option[this.labelKey])
    );
  }

  private getIndex(item: any, arr: Array<any>): number {
    if (!arr || !item) {
      return -1;
    }
    for (let i: number = 0; i < arr.length; i++) {
      if (this.isEqual(arr[i], item)) {
        return i;
      }
    }

    return -1;
  }
  /**
   * 修复点击IE滚动条，面板关闭。
   * 打开面板时监听，关闭和销毁面板时取消监听。
   */
  public listenIESrollbarBug(): void {
    // IE兼容性涉及知识，见本文件底部。
    // IE兼容性问题: 点击滚动条，触发失焦，面板会收起
    // 修复方案：点击list面板区域（包含滚动条）后，给失焦元素强制获取焦点。修改Form基类不触发组件整体失焦。
    if (TiBrowser.isIE()) {
      // 点击面板，阻止Blur
      this.unlistenIEScrollbarBugFns.push(
        this.renderer.listen(this.nativeElement, 'mousedown', (event: FocusEvent) => {
          this.stopBlur = true; // 标记，以供focusin消耗
          // 阻止冒泡到document，因为document会把标志位改回false。和下面修复双击滚动条Bug配合
          event.stopPropagation();
        })
      );
      // 修复bug：双击滚动条，再点击面板之外，不失焦。
      this.unlistenIEScrollbarBugFns.push(
        this.renderer.listen(document, 'mousedown', (event: FocusEvent) => {
          // 点击面板之外区域，不阻止blur
          this.stopBlur = false;
        })
      );

      // IE事件顺序：focusout->foucsin->blur->focus, 支持冒泡的focusin/focusout, 不支持冒泡的是focus/blur
      this.unlistenIEScrollbarBugFns.push(
        this.renderer.listen(document.body, 'focusin', (event: FocusEvent) => {
          if (this.stopBlur && event.relatedTarget !== document.body) {
            // 本来不需要!==document, 但连续多次点击太快，会发生：刚点击一下，上次的dominator->body focusin, 会进来

            // 清零，因为下面的聚焦事件，又会触发focusin事件，并不想处理
            this.stopBlur = false; // 一般情况这里置为false是可以的。

            // focusin事件，target是聚焦元素。relatedTarget是失焦元素。
            // 强制让失焦元素，重新获得焦点。
            if (event.relatedTarget) {
              (event.relatedTarget as HTMLElement).focus();
            }
          }
        })
      );
    }
  }
  public unlistenIESrollbarBug(): void {
    if (TiBrowser.isIE()) {
      // 解绑监听
      for (const x of this.unlistenIEScrollbarBugFns) {
        x();
      }
    }
  }
}
/*
IE兼容性问题：点击面板滚动条，触发失焦，无法阻止。
解决方案：给失焦元素强制获取焦点。修改Form基类不触发组件整体失焦。

涉及知识点：
点击div面板的滚动条，浏览器会失焦，焦点到body。event.preventDefault();，可以阻止默认失焦行为。
点击div面板的滚动条，浏览器会失焦，焦点到body。无法阻止。（问题产生）

Chrome浏览器事件顺序：
blur->focusout->focus->foucsin
IE浏览器事件顺序：
focusout->focusin->blur->focus

IE浏览器，在blur事件里，失焦元素.focus(),	会先显示失焦css，后显示聚焦css，会闪一下。
IE浏览器，在focusout事件里，失焦元素.focus(), 无效。
IE浏览器，在focusin事件里，失焦元素.focus(), 会一直显示聚焦css，不会闪。（作为解决问题的方案）

Chrome blur事件时，document.activeElement是body
IE blur事件时，document.activeElement是将要聚焦的元素。
IE 如果在focusin里，失焦元素.focus()，那么blur时document.activeElement刚好是这个失焦并强制聚焦的元素。

第一版方案：
强制聚焦，用了延时处理
整体onBlur时，IE特殊处理，不闭合面板
闭合面板时，处理标志位。
解决双击滚动条bug，利用监听面板之外点击。

第二版方案：
强制聚焦，不用延时。
修复Form基类，不再触发整体失焦/聚焦。
闭合面板时，处理标志位 （TODO: 设法去除。尽量集中对标志位的管理）
解决双击滚动条bug，利用监听面板之外点击。（TODO: 设法去除。尽量集中对标志位的管理）

第三版方案：
面板打开时监听mouse，面板闭合时不再监听

 */
