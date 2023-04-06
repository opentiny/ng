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
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { TiTableComponent } from './TiTableComponent';
import { TiColsToggleDropComponent } from './TiColsToggleDropComponent';
import { TiSelectComponent } from '@opentiny/ng-select';
import { TiKeymap, TiPositionType } from '@opentiny/ng-utils';
import { TiLocale } from '@opentiny/ng-locale';
import packageInfo from '../package.json';
// 下面注释，可以避免编译lib时正则报错。原理未知，副作用未知。
// @dynamic
/**
 * TiColsToggle 控制列动态隐藏/显示的组件
 *
 * ti-cols-toggle 用来显示列操作按钮，点击该按钮可在打开的下拉中设置各列的隐藏/显示；
 * 在 ti-table 标签内，开发者可灵活设置其位置。
 *
 * TiTable 上的 columns 接口传入值各项(列)的 show 和 title 属性值影响着各列的隐藏/显示状
 * 态,具体可参考 TiTableComponent columns 输入接口说明。
 *
 * 开发者必须给需要动态显示/隐藏的列(th，td)使用 ngIf, 利用 ngIf 和 tiTable 上的 columns
 * 接口值中每列的show的值来控制当前列的显示或隐藏。
 *
 * ### 接口说明
 * **Inputs：**
 *
 * |     名称    |  类型   | 默认值   | 功能描述  |
 * | --------   | :-----   | :---- | :---- |
 * |  disabled   | boolean  | false | 设置列操作按钮是否禁用 |
 * | searchable   | boolean  | false | 是否显示搜索框 |
 * | selectAll   | boolean  | false | 是否开启全选功能|
 * | panelWidth   |  string  | 'justified' | 下拉面板的宽度，可选值为'justified'(默认), 'auto'或自定义宽度，但宽度不能小于select面板的宽度 |
 * | noDataText   |  string  | '暂无数据' | 无数据时的显示文本。默认值改为国际化词条 |
 * | select   | EventEmitter<TiTableColumns>  | 无 | 选中/取消选中事件，向外通知当前项数据，需要自行判断当前项是否选中|
 * | focus   | HTML事件  | 无 | 聚焦事件 |
 * | blur   | HTML事件  | 无 | 失焦事件 |
 *
 * <p><span style="color: red">以下说明不可用，不做参考。</span>该组件只有以上disabled、searchable、panelWidth、selectAll 这四个Input接口
 * 和foucs、blur、select 这三个事件接口可用，其余方法、Input、输出等(继承于TiSelectComponent,是供select的内部使用的)都不可用</p>
 */
@Component({
  selector: 'ti-cols-toggle',
  templateUrl: './cols-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiColsToggleComponent extends TiSelectComponent {
  private static readonly DEFAULT_PANEL_WIDTH: number = 250;
  private static readonly MAX_PANEL_WIDTH: number = 300;
  private static readonly MIN_PANEL_WIDTH: number = 200;
  /**
   * @ignore
   * 10.0.3 版本之前服务使用 tiTip 指令自行实现提示，为做兼容性处理，添加该接口判断服务是否使用指令实现
   */
  @Input() tiTip: string;
  /**
   * 设置按钮 tip 提示内容
   */
  @Input() tipContent: string = TiLocale.getLocaleWords().tiTable.colsToggleTip;
  /**
   * 设置按钮 tip 提示方向
   */
  @Input() tipPosition: TiPositionType = 'top';
  /**
   * @ignore
   */
  @ViewChild('toggleMenu', { static: true }) toggleMenuEleRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild(TiColsToggleDropComponent, { static: true }) dropsearchCom: TiColsToggleDropComponent;
  /**
   * @ignore
   */
  public table: TiTableComponent;
  protected versionInfo: string = super.getVersion(packageInfo);
  // 标记是否需要更新聚焦元素
  private shouldUpdateFocusableElems: boolean = false;
  constructor(
    protected elementRef: ElementRef,
    protected renderer2: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    table: TiTableComponent
  ) {
    super(elementRef, renderer2, changeDetectorRef);
    this.table = table;
  }

  ngOnInit(): void {
    // 兼容使用tiTip指令实现的tip提示
    this.tipContent = this.tiTip ? '' : this.tipContent;
    this.tipPosition = this.tiTip ? undefined : this.tipPosition;
    this.setDropPanelWidth();
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.updateFocusableElems();
    // TODO：严格来说，不应该继承自Select，Select中有对dominator的处理。看有没有更好实现方式。
  }

  ngAfterViewChecked(): void {
    // 这里不能调用父类方法，因为Select父类对dominator处理，空指针报错。
    // TODO: 看是否能够不继承select

    if (this.shouldUpdateFocusableElems) {
      this.shouldUpdateFocusableElems = false;
      this.updateFocusableElems();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchable'] && !changes['searchable'].firstChange) {
      // searchable 参数变更后，dropSearch 组件中会重新获取搜索输入框元素，this.dropsearchCom.getFocusableElems() 方法获取的搜索框元素失效。
      // 由于dropSearch在ngAfterViewChecked中变更聚焦元素，时机比ngOnChanges晚，但比组件的ngAfterViewChecked早，
      // 所以用shouldUpdateFocusableElems变量标记是否需要更新聚焦元素，之后在ngAfterViewChecked中处理
      this.shouldUpdateFocusableElems = true;
    }
  }
  /**
   * @ignore
   * 在失焦时，通知更新了表格的列数据，用于表格记忆上传列显示数据
   *
   * 继承了TiSelectComponent，TiSelectComponent 中在 @Component 元数据 host 配置中调用了该方法
   */
  public onBlur(): void {
    super.onBlur();
    // 表格记忆通知列切换变化
    if (this.table.storageId) {
      this.table.updateColumnsSubject.next(null);
    }
  }
  /**
   * @ignore
   * 阻止 button 聚焦时点击空格回车触发 click 事件导致面板展开关闭异常
   */
  public preventKeydownDefault(event: KeyboardEvent): void {
    const enterKeyCodeArr: Array<number> = [TiKeymap.KEY_SPACE, TiKeymap.KEY_ENTER, TiKeymap.KEY_NUMPAD_ENTER];
    if (enterKeyCodeArr.includes(event.keyCode)) {
      event.preventDefault();
    }
  }
  // 更新可聚焦元素
  private updateFocusableElems(): void {
    if (this.searchable) {
      // 推荐在onInit()时调用setFocusableElems(), 但是ngFor/ngIf中的元素在ngAfterViewInit()才能获取到
      this.setFocusableElems([this.toggleMenuEleRef.nativeElement].concat(this.dropsearchCom.getFocusableElems()));
    } else {
      this.setFocusableElems([this.toggleMenuEleRef.nativeElement]);
    }
  }

  private setDropPanelWidth(): void {
    // TODO:
    const panelWidthNum: number = parseInt(this.panelWidth, 10);

    if (panelWidthNum > TiColsToggleComponent.MAX_PANEL_WIDTH) {
      this.panelWidth = `${TiColsToggleComponent.MAX_PANEL_WIDTH}px`;

      return;
    }

    if (panelWidthNum < TiColsToggleComponent.MIN_PANEL_WIDTH) {
      this.panelWidth = `${TiColsToggleComponent.MIN_PANEL_WIDTH}px`;
    }
  }
}
