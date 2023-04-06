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
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { TiDominatorComponent } from '@opentiny/ng-dominator';
import { TiDropComponent } from '@opentiny/ng-drop';
import { TiDroplistComponent } from '@opentiny/ng-droplist';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiListComponent } from '@opentiny/ng-list';
import { TiPositionType } from '@opentiny/ng-utils';
import packageInfo from '../package.json';

export interface TiCascaderItem {
  /**
   * 显示文本
   */
  label?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 二级面板数据
   *
   * 包含：1.label：显示文本 2.disabled：是否禁用 3.tip：提示信息 4.tipPosition：tip 显示方位，默认为 right
   */
  children?: Array<{
    label?: string;
    disabled?: boolean;
    tip?: any;
    tipPosition?: TiPositionType;
    [propName: string]: any;
  }>;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
/**
 * 级联选择器 目前只支持二级或三级级联
 *
 */
@Component({
  selector: 'ti-cascader',
  templateUrl: './cascader.html',
  styleUrls: ['./cascader.less'],
  // eslint-disable-next-line no-use-before-define
  providers: [TiFormComponent.getValueAccessor(TiCascaderComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(blur)': 'onBlur()',
    '[class.tp-cascader-dominator]': 'true'
  }
})
export class TiCascaderComponent extends TiFormComponent {
  // TODO: add explicit constructor

  // TODO: add explicit constructor

  /**
   * 数据列表
   */
  @Input() items: Array<TiCascaderItem>;
  /**
   * 是否开启点击叉号清除选中项
   */
  @Input() clearable: boolean = false;
  /**
   * 是否开启搜索
   */
  @Input() searchable: boolean = false;
  /**
   * 输入框的占位文本
   */
  @Input() placeholder: string;
  /**
   * 下拉框和输入框文本要展示的键值
   */
  @Input() labelKey: string = 'label';
  /**
   * 下拉面板的宽度
   */
  @Input() panelWidth: string = '160px';
  /**
   * 下拉面板的高度
   */
  @Input() panelHeight: string = '248px';
  /**
   * 是否只能选中子节点
   */
  @Input() onlySelectLeaf: boolean = true;
  /**
   * 输入框是否呈现选中项的全部节点
   */
  @Input() showAllLevel: boolean = true;
  /**
   * 指定选中项数据的键值
   */
  @Input() valueKey: string;
  /**
   * 展开下一级面板的触发方式
   */
  @Input() trigger: 'click' | 'hover' = 'click';
  /**
   * 设置数据唯一标识的键值
   */
  @Input() idKey: string;
  /**
   * @ignore
   * 指定子节点数据集
   */
  @Input() childrenKey: string = 'children';
  /**
   * @ignore
   * 选中事件，选中项没有变化
   */
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @ignore
   * 选中事件，选中项变化
   */
  @Output() readonly change: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 点击叉号清除选中项时触发的回调
   */
  @Output() readonly clear: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @ignore
   */
  @ViewChild(TiDominatorComponent, { static: true })
  dominatorCom: TiDominatorComponent;
  /**
   * @ignore
   */
  @ViewChild(TiDropComponent) dropCom: TiDropComponent;
  /**
   * @ignore 呈现各级数据的list
   */
  @ViewChildren('commonList') listComs: QueryList<TiListComponent>;
  /**
   * @ignore 宽的面板，是一个droplist，用于无数据和搜索场景
   */
  @ViewChild('wideDroplist') wideDroplist: TiDroplistComponent;
  /**
   * @ignore 分隔符 以后可能会对外开放
   */
  public separator: string = '/';
  /**
   * @ignore 转化为数字的panelWidth
   */
  public panelWidthNum: number;
  /**
   * @ignore 三个TiListComponent的model
   */
  public listModel: Array<any> = [];
  /**
   * @ignore 用于dominator呈现数据
   */
  public dominatorModel: string;
  /**
   * @ignore
   * itemsArr[0]存放根面板内容，itemArr[1]存放次级面板内容，itemArr[2]存放次次级面板内容
   */
  public itemsArr: Array<Array<any>> = [];
  /**
   * @ignore 宽面板的数据
   */
  public wideDroplistOptions: Array<any> = [];
  /**
   * @ignore
   */
  public listComsArr: Array<TiListComponent>;
  /**
   * @ignore 宽面板选中值
   */
  public wideDroplistModel: any;

  protected versionInfo: string = super.getVersion(packageInfo);

  /**
   * modelWhole与model的中间变量
   * model可能是['', '', '']，也可能是[{}, {}, {}]
   * modelWhole是[{}, {}, {}]
   */
  private _modelWhole: Array<TiCascaderItem>;

  private valueFn: (item: any) => any = (item: any) => {
    return item[this.valueKey];
  };

  ngOnInit(): void {
    super.ngOnInit();
    this.panelWidthNum = parseInt(this.panelWidth, 10);
  }
  ngOnChanges(change: SimpleChanges): void {
    super.ngOnChanges(change);
    if (change['items']) {
      this.itemsArr[0] = this.items;
    }
  }
  /**
   * @ignore
   */
  ngOnModelChange(): void {
    // model改变的时候
    // 1.更新modelWhole，面板显示会更新
    if (this.model?.length > 0 && this.valueKey) {
      let index: number = 0;
      let selectedLength: number = this.model.length; // 已选中的 label 的长度
      let tempModelWhole: Array<TiCascaderItem> = this.items.filter((item) => this.model[index] === this.valueFn(item)); // 中间变量，找到model里面第一个被选中的label
      this._modelWhole = tempModelWhole; // 更新_modelWhole
      for (index += 1; index < selectedLength; index += 1) {
        // 存在多级面板时，寻找其子节点
        if (tempModelWhole[0]?.[this.childrenKey]) {
          tempModelWhole = tempModelWhole[0][this.childrenKey].filter((item) => this.model[index] === this.valueFn(item));
          this._modelWhole.push(tempModelWhole[0]);
        }
      }
    } else {
      this._modelWhole = this.model;
    }
    // 2.更新dominator的显示文本
    this.joinDominatorModel();
  }
  /**
   * @ignore
   */
  public onDominatorClick(): void {
    if (this.disabled) {
      return;
    }
    if (this.dropCom.isShow || this.wideDroplist.isShow) {
      this.close();

      return;
    }
    if (this.items.length === 0) {
      this.wideDroplist.show();
    } else {
      this.showDropCom();
    }
  }
  ngAfterViewInit(): void {
    this.listComsArr = this.listComs.toArray();
    this.setFocusableElems(this.dominatorCom.getFocusableElems());
    this.renderer.setStyle(this.dropCom.nativeElement, 'width', '');
  }
  /**
   * @ignore
   */
  public close(): void {
    this.dropCom.hide();
    this.wideDroplist.hide();
    this.listComsArr.forEach((listCom: TiListComponent): void => {
      listCom.unlistenIESrollbarBug();
    });
  }
  /**
   * @ignore
   */
  public onBlur(): void {
    this.close();
  }
  /**
   * @ignore
   */
  public onSelect($event: TiCascaderItem, panelIndex: number): void {
    // 处理面板
    if ($event.children?.length > 0 && this.trigger === 'click') {
      this.showNextList($event, panelIndex);
    } else {
      // 关闭次级以后所有面板
      this.close();
      if (this.searchable) {
        this.dominatorCom.focus();
      }
    }
    this.handleListModel($event, panelIndex);
    /**
     * 需要修改cascader选中值的时机是：
     * 如果onlySelectLeaf === false，目前的listModel组成的数据集合和modelWhole不相等，
     * 如果onlySelectLeaf === true，已经选到最后一级，且内容不一致
     */
    if (!this.onlySelectLeaf || !$event.children || $event.children.length === 0) {
      if (this.modelWhole?.length !== this.listModel.length) {
        this.handleModel();

        return;
      }

      // 如果listModel和modelWhole的长度一样，则需要分别对比数组中的每一个是否一致
      for (let i: number = 0; i < this.listModel.length; i++) {
        if (!this.isSame(this.listModel[i], this.modelWhole[i])) {
          this.handleModel();

          return;
        }
      }
    }
  }
  /**
   * @ignore
   */
  public onMouseenter(event: TiCascaderItem, panelIndex: number): void {
    if (event.children?.length > 0) {
      this.showNextList(event, panelIndex);
    } else if (panelIndex < this.listComsArr.length - 1) {
      // 没有下一级数据，关闭后面所有面板
      this.listComsArr.forEach((list: TiListComponent, index: number): void => {
        if (index > panelIndex) {
          this.renderer.setStyle(list.nativeElement, 'display', 'none');
        }
      });
    }
  }
  private showNextList(event: TiCascaderItem, panelIndex: number): void {
    // 关闭次次级面板
    for (let i: number = panelIndex + 1; i < this.listComsArr.length - 1; i++) {
      this.renderer.setStyle(this.listComsArr[i + 1].nativeElement, 'display', 'none');
    }
    // 打开次级面板
    this.itemsArr[panelIndex + 1] = event.children;
    this.showList(panelIndex + 1);
  }
  /**
   * 在点选时，处理listModel
   */
  private handleListModel(event: TiCascaderItem, panelIndex: number): void {
    this.listModel = this.listModel || [];
    if (this.trigger === 'hover') {
      // trigger === hover，先补齐或修正之前的listModel
      this.listComsArr.forEach((list: TiListComponent, index: number): void => {
        this.listModel[index] = list.hoverOption;
      });
    }
    this.listModel.splice(panelIndex);
    this.listModel.push(event);
  }
  private handleModel(): void {
    // 处理数据
    this.modelWhole = [...this.listModel];
    this.joinDominatorModel();
  }
  /**
   * @ignore
   */
  public onClear(): void {
    this.model = [];
    this.clear.emit();
    if (this.dropCom.isShow) {
      this.listModel = [];
      // 隐藏除第一个外的其他list
      this.listComsArr.forEach((list: TiListComponent, index: number): void => {
        if (index > 0) {
          this.renderer.setStyle(list.nativeElement, 'display', 'none');
        }
      });
    }
  }
  /**
   * @ignore
   */
  public onMouseleave(panelIndex: number): void {
    this.listComsArr[panelIndex].hoverOption = undefined;
  }

  /**
   * @ignore
   * 根据model长度，展开有层级的面板（即dropCom）
   */
  private showDropCom(): void {
    /**
     * 触发tiScroll关闭面板的场景下，drop不显示，但list是显示的，
     * 下次重新打开时，一个或者多个list会全部显示，除第一个外，其他的都定位错误，
     * 所以，需要打开前隐藏除第一个外的其他list。
     */
    this.listComsArr.forEach((list: TiListComponent, index: number): void => {
      if (index > 0) {
        this.renderer.setStyle(list.nativeElement, 'display', 'none');
      }
      list.listenIESrollbarBug();
    });
    this.dropCom.show();
    // drop.show()会设置drop的最小宽度，cascader不需要，此处覆盖
    this.renderer.setStyle(this.dropCom.nativeElement, 'min-width', '');
    if (this.modelWhole && this.modelWhole.length > 0) {
      this.modelWhole.forEach((item: TiCascaderItem, i: number): void => {
        this.listModel[i] = item;
        this.itemsArr[i + 1] = item.children;
        this.showList(i);
        // 如果是初始有值，不加setTimeout不能滚到正确的位置
        setTimeout((): void => {
          this.listComsArr[i].scrollToSelected();
        }, 0);
      });
    } else {
      this.listModel[0] = undefined;
      this.showList(0);
    }
  }

  /**
   * @ignore
   */
  public showList(panelIndex: number): void {
    this.renderer.setStyle(this.listComsArr[panelIndex].nativeElement, 'display', 'inline-block');
    if (!this.listComsArr[panelIndex].model) {
      this.listComsArr[panelIndex].hoverOption = undefined;
    }
  }

  /**
   * @ignore
   */
  public onSearch(event: string): void {
    if (!this.items || this.items.length === 0) {
      return;
    }
    // 搜索内容不去除前后空格
    if (event === '') {
      // searchWord回删至空，交互表现和点击dominator一致，显示有层级的列表
      this.wideDroplist.hide();
      this.showDropCom();

      return;
    }
    const lowercaseSearchword: string = event.toLowerCase();
    const wideDroplistOptionLength: number = this.wideDroplistOptions.length;
    this.wideDroplistOptions = [];

    this.items.forEach((items1: TiCascaderItem, index1: number): void => {
      /**
       * 标识有没有找到wideDroplistModel，找到以后就不需要在后面的循环中继续查找
       */
      let flag: boolean = false;
      const lowercaseItems1Label: string = items1[this.labelKey].toLowerCase();

      // 在该项本身搜索
      if (
        (!this.onlySelectLeaf || !items1.children || items1.children?.length === 0) &&
        lowercaseItems1Label.includes(lowercaseSearchword)
      ) {
        this.wideDroplistOptions.push({
          label: `${items1[this.labelKey]}`,
          indexs: [index1],
          [this.idKey]: `${items1[this.idKey]}`,
          valueKeys: [items1[this.valueKey]]
        });
        if (!flag && this.modelWhole?.length === 1 && this.modelWhole[0] === items1) {
          flag = true;
          this.wideDroplistModel = this.wideDroplistOptions[this.wideDroplistOptions.length - 1];
        }
      }
      // 在该项的子项搜索
      if (items1.children?.length > 0) {
        items1.children.forEach((items2: TiCascaderItem, index2: number): void => {
          const lowercaseItems2Label: string = items2[this.labelKey].toLowerCase();

          if (!items2.children || items2.children?.length === 0 || !this.onlySelectLeaf) {
            if (
              lowercaseItems1Label.includes(lowercaseSearchword) ||
              lowercaseItems2Label.includes(lowercaseSearchword) ||
              `${lowercaseItems1Label}/${lowercaseItems2Label}`.includes(lowercaseSearchword)
            ) {
              this.wideDroplistOptions.push({
                label: `${items1[this.labelKey]}/${items2[this.labelKey]}`,
                indexs: [index1, index2],
                [this.idKey]: `${items1[this.idKey]}-${items2[this.idKey]}`,
                valueKeys: [items1[this.valueKey], items2[this.valueKey]]
              });
              if (!flag && this.modelWhole?.length === 2 && this.modelWhole[0] === items1 && this.modelWhole[1] === items2) {
                flag = true;
                this.wideDroplistModel = this.wideDroplistOptions[this.wideDroplistOptions.length - 1];
              }
            }
          }
          if (items2.children?.length > 0) {
            items2.children.forEach((items3: TiCascaderItem, index3: number): void => {
              const lowercaseItems3Label: string = items3[this.labelKey].toLowerCase();
              if (
                lowercaseItems1Label.includes(lowercaseSearchword) ||
                lowercaseItems2Label.includes(lowercaseSearchword) ||
                lowercaseItems3Label.includes(lowercaseSearchword) ||
                `${lowercaseItems1Label}/${lowercaseItems2Label}/${lowercaseItems3Label}`.includes(lowercaseSearchword)
              ) {
                this.wideDroplistOptions.push({
                  label: `${items1[this.labelKey]}/${items2[this.labelKey]}/${items3[this.labelKey]}`,
                  indexs: [index1, index2, index3],
                  [this.idKey]: `${items1[this.idKey]}-${items2[this.idKey]}-${items3[this.idKey]}`,
                  valueKeys: [items1[this.valueKey], items2[this.valueKey], items3[this.valueKey]]
                });
                if (
                  !flag &&
                  this.modelWhole?.length === 3 &&
                  this.modelWhole[0] === items1 &&
                  this.modelWhole[1] === items2 &&
                  this.modelWhole[2] === items3
                ) {
                  flag = true;
                  this.wideDroplistModel = this.wideDroplistOptions[this.wideDroplistOptions.length - 1];
                }
              }
            });
          }
        });
      }
    });

    this.dropCom.hide();
    // 如果数据长度有变化，面板打开前，需要先更新数据
    if (wideDroplistOptionLength !== this.wideDroplistOptions.length) {
      this.changeDetectorRef.detectChanges();
    }
    if (this.wideDroplist.isShow) {
      // 打开状态下，重新定位
      this.wideDroplist.rePosition();
    } else {
      this.wideDroplist.show();
    }
  }

  /**
   * @ignore
   * 搜索后，在宽面板点选数据
   */
  public wideDroplistChange(event): void {
    // 在change事件中，model肯定是会变化的，赋值为空对象不影响modelchange的触发
    if (event?.indexs?.length > 0 && !this.valueKey) {
      this.model = [];
      event.indexs.forEach((index: number, i: number): void => {
        this.model[i] = i === 0 ? this.items[index] : this.model[i - 1].children[index];
      });
      this.modelWhole = [...this.model];
    } else if (this.valueKey) {
      this.model = event.valueKeys;
    }
  }
  /**
   * @ignore
   */
  public onWideDroplistSelect(): void {
    // 选中项没有变化的时候，也需要让输入框失焦，选中项变化时输入框失焦是在dominator中处理的
    this.dominatorCom.focus();
  }
  private isSame(option1: TiCascaderItem, option2: TiCascaderItem): boolean {
    if (this.idKey) {
      return option1[this.idKey] === option2[this.idKey];
    }

    return (
      option1 === option2 ||
      (option1[this.labelKey] !== undefined && option2[this.labelKey] !== undefined && option1[this.labelKey] === option2[this.labelKey])
    );
  }
  /**
   * 通过model拼接dominatorModel，显示在dominator上
   */
  private joinDominatorModel(): void {
    this.dominatorModel = '';
    if (!this.modelWhole || this.modelWhole?.length === 0) {
      return;
    }
    if (this.showAllLevel) {
      this.modelWhole.forEach((item: any, index: number): void => {
        if (index === 0) {
          this.dominatorModel += `${item[this.labelKey]}`;
        } else {
          this.dominatorModel += `${this.separator}${item[this.labelKey]}`;
        }
      });
    } else {
      this.dominatorModel = this.modelWhole[this.model.length - 1][this.labelKey];
    }
  }

  private get modelWhole(): any {
    return this._modelWhole;
  }

  /**
   * 点选时modelWhole改变，要同时更改model
   */
  private set modelWhole(value: any) {
    this._modelWhole = value;
    if (this.valueKey && value !== undefined && value !== null) {
      // 存在valueKey，且value不为空
      this.model = value.map((item) => this.valueFn(item));
    } else {
      this.model = value;
    }
  }
}
