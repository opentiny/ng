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
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiMenuComponent, TiMenuItem } from '@opentiny/ng-menu';
import { TiLocale } from '@opentiny/ng-locale';
import { TiPopconfirmConfig } from '@opentiny/ng-popconfirm';
import packageInfo from '../package.json';

export interface TiActionmenuItem extends TiMenuItem {
  /**
   * 配置呈现在更多按钮外部菜单项的气泡确认框
   */
  popConfig?: TiPopconfirmConfig;
}

// 空间设置规则：
// 可显示项目数（children项目必须出现在“更多”），最大显示数目，空间宽度。
// 更多”里面至少两个选项
// 如果只有一个带children项目那么直接用menu。

/**
 * ActionMenu菜单按钮组件
 *
 * ActionMenu组件主要是一组操作按钮。当按钮数量太多导致预留空间大小无法显示所有按钮时，自动将超出部分的按钮放置在一个menu组件下拉中。
 *
 * 使用该组件，用户只需关注操作项配置，无需关注操作项显示不足的情况。
 *
 * 注意：ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.（本组件在调试环境报此错误，不必理会。生产环境不报错，功能也不受影响。）
 *
 */
@Component({
  selector: 'ti-actionmenu',
  templateUrl: './actionmenu.html',
  styleUrls: ['./actionmenu.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.max-width]': 'maxWidth'
  }
})
export class TiActionmenuComponent extends TiFormComponent {
  // 本应继承自BaseComp，但是想要A标签焦点功能
  /* Menu参数透传start */
  /**
   * 必选，菜单按钮数据集
   */
  @Input() items: Array<TiActionmenuItem>;
  /**
   * 下拉面板最大宽度，超过时内容换行显示
   */
  @Input() panelMaxWidth: string = '130px';
  /**
   * 下拉面板最大高度，超过时面板出现竖向滚动条
   */
  @Input() panelMaxHeight: string = '9999px';
  /**
   * 菜单按钮要展示的键值
   */
  @Input() labelKey: string = 'label';
  /**
   * 选中菜单项时触发的回调，参数：当前选中项数据
   */
  @Output() readonly select: EventEmitter<TiActionmenuItem> = new EventEmitter<TiActionmenuItem>();
  /* Menu参数透传end */

  /**
   * 最大宽度
   */
  @Input() maxWidth: string = '250px';
  /**
   * 各菜单项间距
   */
  @Input() space: string = '10px';
  // 分割线为divider，分割字符叫做separator（比如分割ip里的点）
  /**
   * @ignore
   *
   * 各item之间是否展示分割线
   *
   */
  @Input() showDivider: boolean = true;
  /**
   * 菜单项最大显示个数, 包含下拉菜单
   */
  @Input() maxShowNum: number = 3;
  /**
   * 下拉菜单的显示文本，默认值为‘更多’
   */
  @Input() moreText: string;
  /**
   * 仅显示下拉菜单时的显示文本，默认值为‘操作’
   */
  @Input() menuText: string;
  /**
   * 绑定数据，一般用于绑定表格本行数据场景
   */
  @Input() data: any;
  /**
   * data 接口 数据转化为 items 接口数据，一般用于转化表格本行数据场景
   */
  @Input() dataToItemsFn: (data: any) => Array<TiActionmenuItem>;
  /**
   * tip 最大宽度
   */
  @Input() tipMaxWidth: string;
  /**
   * 点击下拉菜单更多触发的回调，参数：下拉菜单是否展开
   */
  @Output() readonly moreClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @ignore
   * 用户写的自定义模板
   */
  @ContentChild(TemplateRef, { static: true }) firstTemplate: TemplateRef<any>;
  /**
   * 下拉选项区域的模板
   */
  @ContentChild('item', { static: true }) itemTemplate: TemplateRef<any>;
  /**
   * tip 提示区域的模板
   */
  @ContentChild('tip', { static: true }) tipTemplate: TemplateRef<any>;

  /**
   * @ignore
   */
  @ViewChild(TiMenuComponent, { static: true }) menuCom: TiMenuComponent;
  /**
   * @ignore
   * 下拉菜单绑定的选项数据
   */
  public panelItems: Array<TiActionmenuItem> = [];
  /**
   * @ignore
   * 各item之间间隔的一半距离
   */
  public halfSpace: string = '';
  protected versionInfo: string = super.getVersion(packageInfo);

  private itemsDiffer: IterableDiffer<TiActionmenuItem>;
  private dataDiffer: KeyValueDiffer<any, any>;
  private needInitItems: boolean = false;

  private itemElems: HTMLCollection;
  private dividingElems: HTMLCollection;
  private menuElem: HTMLElement;
  private moreTextElem: HTMLElement;
  private menuTextElem: HTMLElement;

  private static lastItemElems: Array<Element>;
  private static lastOutShowNum: number = 0;
  private static lastShowMenu: boolean = true;
  private static lastMaxWidth: string = '250px';
  private static lastMaxShowNum: number = 3;
  private static lastTime: number = 0;

  constructor(
    protected hostRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    private iterableDiffers: IterableDiffers,
    private keyValueDiffers: KeyValueDiffers
  ) {
    super(hostRef, renderer, changeDetectorRef);
    const localeWords = TiLocale.getLocaleWords().tiActionmenu;
    this.moreText = localeWords.more;
    this.menuText = localeWords.operation;
  }

  // 纠正 IE下同一行两个元素 offsetTop 值可能存在的一些(目前测试到有1px)的误差
  private static isEqualOffsetTop(elem1: any, elem2: any): boolean {
    return Math.abs((elem1 as HTMLElement).offsetTop - (elem2 as HTMLElement).offsetTop) <= 2;
  }

  /**
   * @ignore
   *  选中菜单内选项
   * @param item 菜单项数据
   */
  public onSelect(item: TiActionmenuItem): void {
    if (!item.disabled) {
      this.select.emit(item);
    }
  }
  /**
   * @ignore
   * 点击更多按钮
   */
  public onClick(): void {
    this.moreClick.emit(this.menuCom.dropComs.first.isShow);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.panelItems = this.items;
    this.halfSpace = Number.parseInt(this.space, 10) / 2 + 'px';
  }
  ngDoCheck(): void {
    if (this.data) {
      if (!this.dataDiffer) {
        // 首次docheck是ngOnInit()之后
        this.dataDiffer = this.keyValueDiffers.find(this.data).create();
      }
      const dataChanges: KeyValueChanges<any, any> | null = this.dataDiffer.diff(this.data);
      if (dataChanges) {
        // 根据data初始化items. 注意：第一次diff会走入changes
        this.items = this.dataToItemsFn(this.data);
      }
    }
    if (this.items) {
      if (!this.itemsDiffer) {
        this.itemsDiffer = this.iterableDiffers.find(this.items).create((index: number, item: TiActionmenuItem) => {
          return item[this.labelKey];
        });
        this.needInitItems = true;
      }
      const itemsChanges: IterableChanges<TiActionmenuItem> | null = this.itemsDiffer.diff(this.items);
      // 注意：如果有数据，那么第一次diff会就走入changes。如果是空数据，第一次diff结果是null，不会进入changes。
      if (itemsChanges) {
        // 如果items改变，则重新初始化。
        this.needInitItems = true;
        // 要绘制的数据变了，强制变更检测
        this.changeDetectorRef.markForCheck();
      }
    }
  }
  /**
   * 兼容旧版：
   * 之前只能内嵌一个模板，无命名。
   * 新版可以内嵌两个模板，示例书写要求都命名（#item，#tip）。
   * 但需要兼容旧版无命名测试用例。
   */

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    // 如果 item 模板为空 && 存在第一个模板，那么把第一个出现的 “非 #tip 标签” 的模板作为 item 模板
    if (
      !this.itemTemplate &&
      this.firstTemplate &&
      this.firstTemplate.elementRef.nativeElement !== (this.tipTemplate && this.tipTemplate.elementRef.nativeElement)
    ) {
      this.itemTemplate = this.firstTemplate;
    }
  }
  ngAfterViewInit() {
    // 查找元素赋值
    this.menuElem = this.menuCom.nativeElement;
    this.moreTextElem = this.hostRef.nativeElement.getElementsByClassName('tiMoreText')[0];
    this.menuTextElem = this.hostRef.nativeElement.getElementsByClassName('tiMenuText')[0];
  }
  ngAfterViewChecked(): void {
    if (this.needInitItems) {
      this.initItems();
    }
    super.ngAfterViewChecked(); // 内部执行了autofocus
  }
  /**
   * 计算那些item应该显示在外部，移除不该显示的item，调整pannel上显示的item项，调整menu显示的文字。
   * TODO：设置display:none,会引起重排，还有优化空间。
   */
  private initItems(): void {
    this.needInitItems = false;

    // 需要支持数据动态变更，这两项可能变化。
    this.itemElems = this.hostRef.nativeElement.getElementsByClassName('ti3-action-menu-item');
    this.dividingElems = this.hostRef.nativeElement.getElementsByClassName('ti3-action-menu-divider');

    // 情况零：如果itemElems相同，且临近时间，那么按照记录恢复布局即可
    if (this.itemElemsEqual() && new Date().getMilliseconds() - TiActionmenuComponent.lastTime < 1000) {
      this.recover();
      return;
    }

    // 情况一：items为空
    if (!this.items || this.items.length === 0) {
      this.setDisplay(this.menuElem, false);
      // 将情况一做记录
      // 注意：getElementsByClassName返回的HTMLCollection，类似一个数组引用，内容可能变化。所以转为数组方便记录。
      // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection
      TiActionmenuComponent.lastItemElems = Array.from(this.itemElems);
      TiActionmenuComponent.lastMaxWidth = this.maxWidth;
      TiActionmenuComponent.lastMaxShowNum = this.maxShowNum;
      TiActionmenuComponent.lastOutShowNum = 0;
      TiActionmenuComponent.lastShowMenu = false;
      TiActionmenuComponent.lastTime = new Date().getMilliseconds();
      return;
    } else {
      this.setDisplay(this.menuElem, true);
    }
    // 注意: itemElems不是数组，并且数据更新时，取到的length不对。所以，得使用items的length
    let firstChildrenIndex: number = this.findfirstChildrenAndSetDisplay(); // 第一个含有子项目的索引

    // 情况二：不显示menu  //条件：没有超过最大显示个数，且最后一个项目也在第一行, 且没有子项
    if (
      this.items.length <= this.maxShowNum &&
      TiActionmenuComponent.isEqualOffsetTop(this.itemElems[this.items.length - 1], this.itemElems[0]) &&
      firstChildrenIndex === -1
    ) {
      this.setDisplay(this.menuElem, false);
      // 设置可聚焦元素
      const focusItems: Array<any> = [];
      for (let i: number = 0; i < this.items.length; i++) {
        focusItems.push(this.itemElems[i]);
      }
      this.setFocusableElems(focusItems);

      // 将情况二做记录
      TiActionmenuComponent.lastItemElems = Array.from(this.itemElems);
      TiActionmenuComponent.lastMaxWidth = this.maxWidth;
      TiActionmenuComponent.lastMaxShowNum = this.maxShowNum;
      TiActionmenuComponent.lastOutShowNum = this.items.length;
      TiActionmenuComponent.lastShowMenu = false;
      TiActionmenuComponent.lastTime = new Date().getMilliseconds();
      return;
    }
    // 情况三：显示Menu，显示数目条件：有子项目的一定在菜单内/倒数第二个一定在菜单内/最大显示个数（含menu）。3值取最小。
    let outShowNum = this.getAndSetOutShowNum(firstChildrenIndex);
    // 将情况三做记录
    TiActionmenuComponent.lastItemElems = Array.from(this.itemElems);
    TiActionmenuComponent.lastMaxWidth = this.maxWidth;
    TiActionmenuComponent.lastMaxShowNum = this.maxShowNum;
    TiActionmenuComponent.lastOutShowNum = outShowNum;
    TiActionmenuComponent.lastShowMenu = true;
    TiActionmenuComponent.lastTime = new Date().getMilliseconds();
  }

  private setTextElem(outShowNum: number): void {
    if (outShowNum === 0) {
      // 立即生效，否则根据模板变量生效慢
      this.renderer.setStyle(this.menuElem, 'margin-left', '0px');
      this.setDisplay(this.moreTextElem, false);
      this.setDisplay(this.menuTextElem, true);
      // 设置可聚焦元素
      this.setFocusableElems(this.menuCom.getFocusableElems());
    } else {
      this.setDisplay(this.moreTextElem, true);
      this.setDisplay(this.menuTextElem, false);
      // 设置可聚焦元素
      const focusItems: Array<any> = [];
      for (let i: number = 0; i < outShowNum; i++) {
        focusItems.push(this.itemElems[i]);
      }
      this.setFocusableElems(focusItems.concat(this.menuCom.getFocusableElems()));
    }
  }

  private recover(): void {
    // 恢复是否显示下拉选项。
    this.setDisplay(this.menuElem, TiActionmenuComponent.lastShowMenu);
    // 由于使用异步处理导致时序问题，需要新增变量保存该值
    const outShowNum: number = TiActionmenuComponent.lastOutShowNum;
    // 恢复露出项
    for (let i: number = 0; i < this.items.length; i++) {
      const isShow: boolean = i < outShowNum;
      this.setDisplay(this.itemElems[i], isShow);
      if (this.dividingElems[i]) {
        this.setDisplay(this.dividingElems[i], isShow);
      }
    }

    // 恢复情况三
    // 设置菜单显示文字，设置可聚焦元素
    if (TiActionmenuComponent.lastShowMenu) {
      this.setTextElem(outShowNum);
    } else {
      // 设置可聚焦元素
      const focusItems: Array<any> = [];
      for (let i: number = 0; i < outShowNum; i++) {
        focusItems.push(this.itemElems[i]);
      }
      this.setFocusableElems(focusItems);
    }

    /**
     * 此句改变了模板变量，需要强制刷新
     * 这里引起ng-serve环境报错ExpressionChangedAfterItHasBeenCheckedError, 所以用Promise延时
     *
     * 此处promise不能删除，会导致menu下拉面板定位异常，故先用变量解决时序问题
     */
    Promise.resolve().then(() => {
      this.panelItems = this.items.slice(outShowNum, this.items.length);
      // 面板的数据变了，需要手动触发变更检测
      this.changeDetectorRef.markForCheck();
    });

    TiActionmenuComponent.lastTime = new Date().getMilliseconds();
  }

  private findfirstChildrenAndSetDisplay(): number {
    let firstChildrenIndex: number = -1; // 第一个含有子项目的索引
    // 这个for循环，做了两件事：找含有子项目，重置item可见。
    for (let i: number = 0; i < this.items.length; i++) {
      if (Object.prototype.hasOwnProperty.call(this.items[i], 'children')) {
        firstChildrenIndex = i; // 找到第一个含有子项目的索引
        // break;
      }
      this.setDisplay(this.itemElems[i], true); // 因为动态修改item，所以第二次进入时需要重置item可见。
      if (this.dividingElems[i]) {
        // 动态修改item，第二次进入时需要重置分割线可见
        this.setDisplay(this.dividingElems[i], true);
      }
    }
    return firstChildrenIndex;
  }

  private getAndSetOutShowNum(myFirstChildrenIndex: number): number {
    let firstChildrenIndex: number = myFirstChildrenIndex;
    if (firstChildrenIndex === -1) {
      firstChildrenIndex = this.items.length; // firstChild给一个超越数组大小的索引，方便下面计算
    }
    let outShowNum: number =
      this.items.length - 2 < this.maxShowNum - 1
        ? this.items.length - 2
        : this.maxShowNum - 1 < firstChildrenIndex + 1
        ? this.maxShowNum - 1
        : firstChildrenIndex + 1;

    for (let i: number = this.items.length - 1; i >= 0; i--) {
      if (i > outShowNum - 1) {
        // 本项属于超出的数目，先删除掉
        //  TODO: remove和style哪个效率高？
        this.setDisplay(this.itemElems[i], false);
        if (this.dividingElems[i]) {
          this.setDisplay(this.dividingElems[i], false);
        }
      } else if (!TiActionmenuComponent.isEqualOffsetTop(this.menuElem, this.itemElems[0])) {
        // 菜单没有在第一行，删除本项
        this.setDisplay(this.itemElems[i], false);
        if (this.dividingElems[i]) {
          this.setDisplay(this.dividingElems[i], false);
        }
        outShowNum--;
      }
    }
    // 设置菜单显示文字，设置可聚焦元素
    this.setTextElem(outShowNum);

    /**
     * 此句改变了模板变量，需要强制刷新
     * 这里引起ng-serve环境报错ExpressionChangedAfterItHasBeenCheckedError, 所以用Promise延时
     * 此处promise不能删除，会导致menu下拉面板定位异常
     */
    Promise.resolve().then(() => {
      this.panelItems = this.items.slice(outShowNum, this.items.length);
      // 面板的数据变了，需要手动触发变更检测
      this.changeDetectorRef.markForCheck();
    });

    return outShowNum;
  }

  /**
   * 设置显示/隐藏样式，比ngIf更及时生效。
   * @param elem HTML元素
   * @param isShow 是否显示
   */
  private setDisplay(elem: any, isShow: boolean): void {
    this.renderer.setStyle(elem, 'display', isShow ? 'inline-block' : 'none');
  }

  /**
   * @ignore
   * ngFor遍历的 trackBy函数，防止数据更新导致所有DOM重新渲染。TODO：这里是否该使用trackBy?
   * @param index 索引
   * @param item 数据
   * @returns 索引
   */
  public trackByFn(index: any, item: any): any {
    return index;
  }
  /**
   * @ignore
   * 比较itemElems是否与最后一次相同
   * @returns true if elems equal
   */
  public itemElemsEqual(): boolean {
    if (
      this.itemElems?.length !== TiActionmenuComponent.lastItemElems?.length ||
      this.nativeElement.parentNode.tagName !== 'TD' ||
      this.maxWidth !== TiActionmenuComponent.lastMaxWidth ||
      this.maxShowNum !== TiActionmenuComponent.lastMaxShowNum
    ) {
      return false;
    }
    for (let i = 0; i < this.itemElems.length; i++) {
      if ((this.itemElems[i] as HTMLElement).innerHTML !== (TiActionmenuComponent.lastItemElems[i] as HTMLElement).innerHTML) {
        return false;
      }
    }
    return true;
  }
}
