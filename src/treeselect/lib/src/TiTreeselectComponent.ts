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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import { TiFormComponent } from '@opentiny/ng-base';
import { TiTreeComponent, TiTreeNode, TiTreeUtil } from '@opentiny/ng-tree';
import { TiDominatorComponent } from '@opentiny/ng-dominator';
import { TiDropComponent } from '@opentiny/ng-drop';
import { TiSearchboxNotsearchComponent } from '@opentiny/ng-searchbox';
import { TiLocale } from '@opentiny/ng-locale';
import { Util } from '@opentiny/ng-utils';
import { TiSelectComponent } from '@opentiny/ng-select';
import { TiDropsearchComponent } from '@opentiny/ng-dropsearch';
import packageInfo from '../package.json';
/**
 * Treeselect树选择下拉组件
 *
 * 支持单选/多选，全选，搜索，懒加载。
 *
 * 单选主要功能为从Tree组件数据中选择某一条数据，单选与Tree功能相同，只是视觉呈现不同。
 *
 * 多选主要功能是从Tree组件数据中任意选择多条数据，多选与Tree功能相同，只是视觉呈现不同。
 *
 * 该组件继承自TiSelectComponent，其中
 *
 * 输入属性：labelKey、searchKeys、tipPosition、panelMaxHeight和valueKey暂不支持；
 *
 */
@Component({
  selector: 'ti-treeselect',
  templateUrl: 'treeselect.html',
  styleUrls: ['./treeselect.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiTreeselectComponent)],
  host: {
    '(blur)': 'onBlur()'
  }
})
export class TiTreeselectComponent extends TiSelectComponent {
  // 搜索框的高度
  private static readonly SEARCHBOX_HEIGHT: number = 30;
  /**
   * 下拉面板最大高度
   */
  @Input() dropMaxHeight: number = (30 + 1) * 8;
  /**
   * 树节点展开前触发的回调，一般用于异步数据获取
   */
  @Output() readonly beforeExpand: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 点击 “更多” 按钮时触发的回调，一般用于分段加载场景
   */
  @Output() readonly beforeMore: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();

  /**
   * @ignore 搜索结果
   */
  public oldOptions: Array<any>;

  /**
   * @ignore 内部标签
   */
  @ViewChild(TiDropComponent, { static: true }) dropCom: TiDropComponent;
  /**
   * @ignore 内部标签
   */
  @ViewChild(TiDominatorComponent, { static: true })
  dominatorCom: TiDominatorComponent;
  /**
   * @ignore 内部标签
   */
  @ViewChild('searchboxCom') searchboxCom: TiSearchboxNotsearchComponent;
  /**
   * @ignore 内部标签
   */
  @ViewChild('datatemplate') dataTemplate: ElementRef;

  /**
   * @ignore 全选框的半选中状态
   */
  public indeterminate: boolean = false;

  /**
   * @ignore 是否全选中
   */
  public isAllSelected: boolean = false;

  /**
   * @ignore 搜索内容
   */
  public searchText: string = '';

  /**
   * @ignore 是否处于搜索状态
   */
  private isInSearch: boolean = false;
  protected versionInfo: string = super.getVersion(packageInfo);

  ngOnInit(): void {
    super.ngOnInit();
    // 强制装换，方便调用super.xxx
    this.dropsearchCom = this.dropCom as unknown as TiDropsearchComponent;

    // 记录传入的数据，浅拷贝
    this.oldOptions = this.options;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 解决延迟或者动态设置options，树组件未渲染的问题
    if (changes['options'] && !changes['options'].firstChange) {
      // 重新记录传入的数据
      this.oldOptions = changes['options'].currentValue;
    }
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    // 异步挂载数据，改变节点属性时指引未发生变化，onpush模式下不会触发变更，故手动触发
    this.changeDetectorRef.markForCheck();
  }

  ngAfterViewChecked(): void {
    if (this.searchable !== this.oldSearchable) {
      this.oldSearchable = this.searchable;
      if (this.searchable) {
        this.setFocusableElems(
          this.dominatorCom.getFocusableElems().concat(this.searchboxCom.getFocusableElems()).concat(this.dropCom.nativeElement)
        );
      } else {
        this.setFocusableElems(this.dominatorCom.getFocusableElems().concat(this.dropCom.nativeElement));
      }
    }
    // 调用父类逻辑afterViewChecked才去设置autofocs
    super.ngAfterViewChecked();
  }

  /**
   * @ignore drop高度被压缩时，重新设置下拉面板的高度
   */
  private restyleDropMaxHeight(): void {
    let dropCurMaxHeight: number = parseInt(this.dropCom.nativeElement.style.maxHeight, 10);

    let dropMaxHeightAdapted: number = this.dropMaxHeight;
    if (!isNaN(dropCurMaxHeight)) {
      // 减去搜索框高度和间距的和
      if (this.searchable) {
        dropCurMaxHeight -= TiTreeselectComponent.SEARCHBOX_HEIGHT;
      }
      if (dropCurMaxHeight < this.dropMaxHeight) {
        dropMaxHeightAdapted = dropCurMaxHeight;
      }
    }

    this.renderer.setStyle(this.dataTemplate.nativeElement, 'max-height', dropMaxHeightAdapted + 'px');
  }

  ngOnModelChange(): void {
    if (this.multiple) {
      // 多选时，重新设置下拉面板定位
      this.setPosition();
      if (this.selectAll) {
        // 允许全选时，设置全选框状态
        this.setAllSelectCheckboxState();
      }
    }
  }

  /**
   * @ignore 设置下拉面板定位
   */
  setPosition(optionsChange?: boolean): void {
    setTimeout(() => {
      if (optionsChange) {
        this.dropCom.resetPosition();
      } else {
        this.dropCom.setPosition();
      }
      this.restyleDropMaxHeight();
    }, 0);
  }

  /**
   * @ignore 关闭下拉面板并转移焦点
   */
  public close(): void {
    this.dropCom.hide();
    // 焦点转移至dominator
    if (this.searchable) {
      this.dominatorCom.focus();
    }
  }

  /**
   * @ignore 仅仅关闭下拉面板
   */
  private closeWithoutFocus(): void {
    this.dropCom.hide();
  }

  /**
   * @ignore 打开下拉面板
   */
  public open(): void {
    // 初始化最大高度
    this.renderer.setStyle(this.dataTemplate.nativeElement, 'max-height', this.dropMaxHeight + 'px');
    this.dropCom.show();
    this.restyleDropMaxHeight();
    // 焦点转移至搜索框
    if (this.searchable) {
      this.searchboxCom.focus();
    }
  }

  /**
   * 尝试打开下拉面板
   */
  public wantOpen(): void {
    super.wantOpen();
  }

  /**
   * @ignore 点击ti-dominator触发的事件
   * 点击下拉面板，展开或者关闭面板
   */
  public onClickDominator(): void {
    if (this.disabled) {
      return;
    }
    if (!this.dropCom.isShow) {
      // 清空搜索内容
      this.searchText = '';
      this.searchTextChange(this.searchText);
      this.wantOpen();
    } else {
      this.close();
    }
  }

  /**
   * @ignore
   * 单选点击清除按钮时触发 clear 事件, 如果下拉中有搜索,则需要聚焦于 searchbox。
   */
  public onClearDominator(): void {
    this.clear.emit();

    if (this.dropsearchCom.isShow && this.searchable) {
      this.searchboxCom.focus();
    }
  }

  /**
   * @ignore 删除ti-dominator选中项时触发的事件
   * 需要取消树节点的选中
   */
  public onDeleteDominatorTag(item: any): void {
    const deletedItem: TiTreeNode = item.item;
    // 1.取消选中当前节点、设置子节点及祖先节点的选中情况。从model中删除时，item.item.checked还是为true，要设置为false
    this.setSelectState(deletedItem, !deletedItem.checked);

    // 2.设置为非全选
    this.isAllSelected = false;
    // 3.设置全选框状态
    if (this.multiple && this.selectAll) {
      item.model.length === 0 ? (this.indeterminate = false) : (this.indeterminate = true);
    }
  }

  /**
   * @ignore ti-searchbox-notsearch搜索框内容变化时触发的事件
   */
  public searchTextChange(searchText: string): void {
    if (Util.isEmptyString(searchText)) {
      this.options = this.oldOptions;
      this.isInSearch = false;
    } else {
      // this.oldOptions 叶子浅拷贝
      const searchResult: Array<TiTreeNode> = TiTreeUtil.copy(this.oldOptions);
      TiTreeUtil.search(searchResult, (cnode: TiTreeNode): boolean => {
        return cnode.label.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0;
      });
      // 展开整个树
      TiTreeUtil.traverse(searchResult, (node: TiTreeNode): void => {
        if (node.children && node.children.length > 0) {
          node.expanded = true;
        }
      });
      this.options = searchResult;
      this.isInSearch = true;
    }
    if (this.multiple && this.selectAll) {
      this.setAllSelectCheckboxState();
    }

    // 重新设置面板定位
    this.setPosition(true);
  }

  /**
   * @ignore
   */
  public onBeforeExpand(treeInst: TiTreeComponent): void {
    const node: TiTreeNode = treeInst.getBeforeExpandNode();
    if (this.beforeExpand.observers.length === 0) {
      node.expanded = true;
    } else {
      this.beforeExpand.emit(node);
    }
  }

  /**
   * @ignore
   */
  public onBeforeMore(node: TiTreeNode): void {
    this.beforeMore.emit(node);
  }

  /**
   * @ignore 从model中获取option所在的索引
   */
  private getItemIndexFromModel(option: TiTreeNode): number {
    let index: number = -1;
    index = this.model.findIndex((item: any) => {
      // 判断item和option的引用是否相同即可
      return item === option;
    });

    return index;
  }

  /**
   * @ignore 获取需要放到model中的节点，根据规范，如果子节点全部选中了，需要在model中放入父节点或者祖先节点。找到第一个checked为true的节点即可
   * node: 树组件select事件中的参数
   */
  private getRealSelectedNode(node: TiTreeNode): TiTreeNode {
    let selectedNode: TiTreeNode = null;
    const parentNode: TiTreeNode = TiTreeUtil.getParentNode(this.oldOptions, node);
    parentNode && parentNode.checked === true ? (selectedNode = this.getRealSelectedNode(parentNode)) : (selectedNode = node);

    return selectedNode;
  }

  /**
   * @ignore 获取需要从model移除的节点，根据规范，如果某个子节点取消选中了，那么可能是它的父节点或祖先节点或所有子节点从model中被移除
   * node：树组件select事件的参数
   */
  private getRealUnselectedNode(node: TiTreeNode): TiTreeNode {
    let unselectedNode: TiTreeNode = null;
    let parentNode: TiTreeNode = TiTreeUtil.getParentNode(this.oldOptions, node);

    if (this.getItemIndexFromModel(node) !== -1) {
      // 需要从model中移除的节点是node本身
      unselectedNode = node;
    } else {
      // 需要从model中移除的节点是node父节点或祖先节点
      // 当节点处于半选状态时,点击节点的复选框,节点状态为选中,否则为非选中,所以要先判断parentNode是否存在
      while (parentNode && this.getItemIndexFromModel(parentNode) === -1) {
        parentNode = TiTreeUtil.getParentNode(this.oldOptions, parentNode);
      }
      // parentNode可能为undefined
      unselectedNode = parentNode;
    }

    return unselectedNode;
  }

  /**
   * @ignore 取消选中时，获取被选中的子节点，根据规范，父节点或祖先节点被选中之后，如果取消了某个子节点的选中，那么需要把它的所有选中的子节点加入model中
   * unselectedNode：需要从model中移除的节点
   */
  private getSelectedChildren(unselectedNode: TiTreeNode): Array<TiTreeNode> {
    let selectedChildren: Array<TiTreeNode> = [];
    if (unselectedNode.children) {
      unselectedNode.children.forEach((child: TiTreeNode) => {
        if (child.checked === true) {
          selectedChildren.push(child);
        } else {
          selectedChildren = selectedChildren.concat(this.getSelectedChildren(child));
        }
      });
    }

    return selectedChildren;
  }

  /**
   * @ignore 根据checked的值，设置option节点及其子节点和祖先节点的选中状态
   * option: 选中的节点；checked：option.checked属性，true/false
   */
  private setSelectState(option: TiTreeNode, checked: boolean): void {
    // 对oldOptions进行操作，将搜索时的结果映射回来
    TiTreeUtil.traverse(this.oldOptions, (node: TiTreeNode) => {
      if (node === option) {
        node.checked = checked;
        if (checked === true) {
          TiTreeUtil.selectAllChildren(node);
          TiTreeUtil.selectParents(node, this.oldOptions, true);
        } else {
          TiTreeUtil.deSelectAllChildren(node);
          TiTreeUtil.deSelectParents(node, this.oldOptions);
        }
      }
    });
  }

  /**
   * @ignore 选中某个节点后，更新this.model
   * option: 选中的节点
   */
  private setModelWhenSelected(option: TiTreeNode): void {
    // 1.获取option最后一个被选中的祖先节点
    const selectedNode: TiTreeNode = this.getRealSelectedNode(option);
    // 2.从model中删除selectNode的所有子节点，一直到叶子节点
    TiTreeUtil.traverse([selectedNode], (node: TiTreeNode) => {
      let deleteIndex: number = this.getItemIndexFromModel(node);
      while (deleteIndex !== -1) {
        this.model.splice(deleteIndex, 1);
        deleteIndex = this.getItemIndexFromModel(node);
      }
    });
    // 3.将selectedNode加入到this.model中
    if (this.getItemIndexFromModel(selectedNode) === -1) {
      this.model.push(selectedNode);
    }
  }

  /**
   * @ignore 取消选中某个节点后，更新this.model
   * option: 被取消选中的节点
   */
  private setModelWhenUnselected(option: TiTreeNode): void {
    // 1.获取需要从model中删除的节点
    const unselectedNode: TiTreeNode = this.getRealUnselectedNode(option);

    // 2.更新model
    if (unselectedNode) {
      // 2.1unselectedNode为option或option的祖先节点
      const deleteIndex: number = this.getItemIndexFromModel(unselectedNode);
      this.model.splice(deleteIndex, 1);
      // 将option所有选中的子节点存放到this.model中
      if (unselectedNode !== option) {
        const selectedChildren: Array<TiTreeNode> = this.getSelectedChildren(unselectedNode);
        this.model.push(...selectedChildren);
      }
    } else {
      // 2.2unselectedNode为undefined，这种情况下，只需从model中删除option所有选中的子节点
      TiTreeUtil.traverse([option], (node: TiTreeNode) => {
        const deleteIndex: number = this.getItemIndexFromModel(node);
        if (deleteIndex !== -1) {
          this.model.splice(deleteIndex, 1);
        }
      });
    }
  }

  /**
   * @ignore 处于搜索状态下，更新model
   */
  private setModelWhenSearch(data: Array<TiTreeNode>, checked: boolean): void {
    // 或者所有处于checked状态的叶子节点
    let selectedLeafNodes: Array<TiTreeNode> = [];
    selectedLeafNodes = this.getLeafNodes(data, checked);
    // 根据每个叶子节点更新model
    for (const leafNode of selectedLeafNodes) {
      // 设置oldOptions各节点状态
      this.setSelectState(leafNode, checked);
      checked ? this.setModelWhenSelected(leafNode) : this.setModelWhenUnselected(leafNode);
    }
  }

  /**
   * @ignore 获取data里面选中或者未选中的全部叶子节点
   * data：搜索范围，checked：true/false
   */
  private getLeafNodes(data: Array<TiTreeNode>, checked: boolean): Array<TiTreeNode> {
    const leafNodes: Array<TiTreeNode> = [];
    TiTreeUtil.traverse(data, (node: TiTreeNode) => {
      if ((TiTreeUtil.isLeaf(node) || (node.children && node.children.length === 0)) && node.checked === checked) {
        leafNodes.push(node);
      }
    });

    return leafNodes;
  }

  /**
   * @ignore 设置全选checkbox的状态
   */
  private setAllSelectCheckboxState(): void {
    // 1.假设节点都被选中或都没被选中
    let isAllSelected: boolean = true;
    let isAllUnSelected: boolean = true;

    // 2.判断是否所有节点都被选中或都没被选中，disabled状态下的节点不用统计
    TiTreeUtil.traverse(this.options, (node: TiTreeNode) => {
      // 2.1 有节点没被选中
      if (!node.disabled && node.checked !== true) {
        isAllSelected = false;
      }
      // 2.2 有节点被选中或半选中
      if (!node.disabled && (node.checked === true || node.checked === 'indeterminate')) {
        isAllUnSelected = false;
      }
    });

    // 3.设置checkbox状态
    this.isAllSelected = isAllSelected;
    this.indeterminate = !isAllSelected && !isAllUnSelected;
  }

  /**
   * @ignore ti-tree的select事件
   */
  public onTreeSelect(option: any): void {
    // 节点被禁用，不做操作，直接返回
    if (option.disabled === true) {
      return;
    }

    // 1.触发select事件
    this.select.emit(option);
    if (!this.multiple) {
      // 2.1单选，直接替换model
      TiTreeUtil.traverse(this.options, (node: TiTreeNode) => {
        if (node === option) {
          node.checked = true;
          this.model = [option];
        } else {
          node.checked = false;
        }
      });
      // 关闭下拉面板
      this.close();
    } else {
      // 2.2多选
      if (!this.isInSearch) {
        // 2.2.1非搜索状态
        // 设置oldOptions各节点状态
        this.setSelectState(option, option.checked);
        if (option.checked === true) {
          this.setModelWhenSelected(option);
        } else {
          this.setModelWhenUnselected(option);
        }
      } else {
        // 2.2.2搜索状态
        this.setModelWhenSearch([option], option.checked);
      }

      // 2.3手动触发ngModelChange事件，splice和push无法触发
      this.model = this.model.concat();
      // 2.4设置全选状态
      if (this.selectAll) {
        this.setAllSelectCheckboxState();
      }
    }

    // 3.重新设置ti-dominator高度
    this.setPosition();
  }

  /**
   * @ignore 全选复选框的按钮事件
   */
  public onSelectAllChange(isAllSelected: any): void {
    // 1.将当前tree节点全部选中 或 不选中
    TiTreeUtil.traverse(this.options, (node: TiTreeNode) => {
      if (!node.disabled) {
        node.checked = isAllSelected;
      }
    });

    // 2.设置model
    if (!this.isInSearch) {
      // 2.1 未处于搜索状态下，使用concat进行单层深拷贝
      !this.isAllSelected ? (this.model = this.options.concat()) : (this.model = []);
    } else {
      // 2.2  处于搜索状态下
      this.setModelWhenSearch(this.options, isAllSelected);
      // 手动触发ngModelChange事件
      this.model = this.model.concat();
    }
  }

  /**
   * @ignore 全选复选框的点击事件
   */
  public onClickSelectAll(event: any): void {
    // 点击时，this.isAllSelected为false，所以要取反
    this.onSelectAllChange(!this.isAllSelected);
    event.preventDefault();
  }

  /**
   * @ignore
   * 失焦情况下，仅关闭面板，不做聚焦等处理
   */
  public onBlur(): void {
    this.closeWithoutFocus();
  }

  /**
   * @ignore
   * 鼠标点击到空白，原本会失焦，此处通过阻止默认事件的方式进行了处理
   */
  public onMouseDownDropOuter(event: any): void {
    event.preventDefault();
  }

  /**
   * @ignore
   * #datatemplate内部滚动条会引起外部滚动条事件触发，引起弹框内的树下拉组件无法使用鼠标拖动滚动条，因此此处阻止事件冒泡
   */
  public onMouseWheel(event: any): void {
    event.stopPropagation();
  }
}
