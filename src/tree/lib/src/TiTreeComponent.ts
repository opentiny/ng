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
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TiKeymap, Util } from '@opentiny/ng-utils';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiTreeUtil } from './TiTreeUtil';
import { TiLocale } from '@opentiny/ng-locale';
import { TiRenderer } from '@opentiny/ng-renderer';
import packageInfo from '../package.json';

// TODO: 采用TiCheckgroup重构后，不需要那么多TreeUtil方法，不需要选中节点/取消选中节点方法。
/**
 * 树组件中每个节点的配置
 */
export interface TiTreeNode {
  /**
   * 节点文本
   */
  label?: string;
  /**
   * 节点是否展开
   */
  expanded?: boolean;
  /**
   * 多选场景下，节点选中状态
   */
  checked?: boolean | string;
  /**
   * 节点展开时的字体图标，10.1.2 支持自定义模板添加图标
   */
  expandIcon?: string;
  /**
   * 节点收起时的字体图标，10.1.2 支持自定义模板添加图标
   */
  collapseIcon?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 子节点数据集
   */
  children?: Array<TiTreeNode>;
  /**
   * 异步加载状态
   */
  loadStatus?: 'loading' | 'error' | 'success';
  /**
   * 是否支持悬浮编辑功能
   */
  editable?: boolean;
  /**
   * 是否支持悬浮添加功能
   */
  addable?: boolean;
  /**
   * 是否支持悬浮删除功能
   */
  deleteable?: boolean;
  /**
   * 是否显示'更多'按钮
   */
  showMore?: boolean;
  /**
   * '更多'加载状态
   */
  moreStatus?: 'loading' | 'error' | 'success';
  /**
   * 是否支持拖拽
   * 1.禁用状态不可拖拽；
   * 2.非禁用状态：
   * true: 节点可拖拽；
   * false: 节点不可拖拽；
   * undefined: 如果 nodeDraggable 为 true，则可拖拽；为 false 或者 undefined，则不可拖拽
   */
  draggable?: boolean;
  /**
   * @ignore
   * 父节点
   */
  parent?: TiTreeNode;
  /**
   * @ignore
   * 开启虚拟滚动时会给节点添加该内部属性
   * 节点层级，根节点层级为0，往下依次类推
   */
  level?: number;
  /**
   * @ignore
   * 开启虚拟滚动时会给节点添加该内部属性
   * 是否为同层级且隶属同一父节点的节点集合中的最后一个
   */
  isLast?: boolean;
  /**
   * @ignore
   * 开启虚拟滚动时会给节点添加该内部属性
   * 是否为同层级且隶属同一父节点的节点集合中的第一个
   */
  isFirst?: boolean;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
/**
 * drag info
 */
export interface TiTreeDragNode {
  /**
   * 事件对象
   */
  event?: DragEvent;
  /**
   * 目标节点
   */
  targetNode?: TiTreeNode;
  /**
   * 被拖拽的节点
   */
  dragNode?: TiTreeNode;
  /**
   * 放置位置，-1 代表当前节点前，0 代表当前节点里面，1 代表当前节点后
   */
  dropPosition?: number;
}
/**
 * Tree树组件
 *
 * 分类：支持单选、多选两种类型
 *
 * 公共方法：树组件提供 [TiTreeUtil]{@link ../classes/TiTreeUtil.html} 公共方法，包括增、删、改、查、选中、取消选中、遍历、筛选、获取选中项等操作
 *
 */
@Component({
  selector: 'ti-tree',
  templateUrl: './tree.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tree.less'],
  host: {
    '[class.ti3-tree-virtual-scroll]': 'virtual'
  }
})
export class TiTreeComponent extends TiBaseComponent {
  private static readonly DEFAULT_ITEM_SIZE: number = 30;
  private static readonly DEFAULT_ITEM_LEFT_SPACE: number = 24; // .ti3-tree-leaf-node 元素左边距
  private static readonly SMALL_ITEM_LEFT_SPACE: number = 16; // .ti3-tree-leaf-node 元素左边距
  /**
   * 组件全量数据
   */
  @Input() data: Array<TiTreeNode>;
  /**
   * 多选场景下，父节点是否可被点击选中
   */
  @Input() parentCheckable: boolean = true;
  /**
   * 是否多选
   */
  @Input() multiple: boolean = false;
  /**
   * 多选场景下，当 changedByCheckbox 为 true 时：
   *
   * 1.点击文本，复选框状态不会改变，只会触发 select 回调；
   *
   * 2.点击复选框只会触发 change 回调；
   *
   * 3.复选框 disabled 时，点击文本会触发 select 事件
   */
  @Input() changedByCheckbox: boolean = false;
  /**
   * 是否高亮匹配树节点中搜索到的文本
   */
  @Input() highlightWords: string;
  /**
   * @ignore
   * 支持拖放
   *
   * 设置为true：所有节点可拖拽
   *
   * 设置为false/undefined：所有节点不可拖拽
   *
   * 如果节点设置了draggable属性，节点是否可拖拽就需要看draggable的值
   */
  /**
   * 是否支持拖放
   */
  @Input() nodeDraggable: boolean = false;
  /**
   * 多选场景下，是否关联父子节点选中状态
   */
  @Input() checkRelation: boolean = true;
  /**
   * 是否开启虚拟滚动
   */
  @Input() virtual: boolean = false;
  /**
   * 节点展开前触发的回调，一般用于异步数据获取
   */
  @Output() readonly beforeExpand: EventEmitter<TiTreeComponent> = new EventEmitter<TiTreeComponent>();
  /**
   * 点击节点时触发的回调
   */
  @Output() readonly select: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 当前选中项改变时触发的回调，参数：改变的选中项
   */
  @Output() readonly change: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 拖拽节点放入目标节点前触发的回调，参数：当前拖拽节点
   */
  @Output() readonly beforeDrop: EventEmitter<TiTreeDragNode> = new EventEmitter<TiTreeDragNode>();
  /**
   * 鼠标在拖放目标上释放时触发的回调，参数：当前拖拽节点
   */
  @Output() readonly nodeDrop: EventEmitter<TiTreeDragNode> = new EventEmitter<TiTreeDragNode>();
  /**
   * 点击悬浮添加节点按钮时触发的回调，参数：当前新增的节点
   */
  @Output() readonly nodeAdded: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 点击悬浮编辑节点按钮时触发的回调，参数：当前编辑的节点
   */
  @Output() readonly nodeEdited: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 点击悬浮删除节点按钮时触发的回调，参数：当前删除的节点
   */
  @Output() readonly nodeDeleted: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 点击 '更多' 按钮时触发的回调，参数：当前点击的 '更多' 按钮节点
   */
  @Output() readonly beforeMore: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 节点展开时触发的回调，参数：当前点击的节点
   */
  @Output() readonly expand: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 节点折叠时触发的回调，参数：当前点击的节点
   */
  @Output() readonly collapse: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 新增节点后的回调，参数：当前新增的节点
   */
  @Output() readonly afterNodeAdd: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 编辑节点后的回调，参数：当前编辑的节点
   */
  @Output() readonly afterNodeEdit: EventEmitter<TiTreeNode> = new EventEmitter<TiTreeNode>();
  /**
   * 用于异步场景：当前点击需要展开的父节点
   */
  private beforeExpandNode: TiTreeNode;
  /**
   * 监听data改变
   */
  private dataDiffer: IterableDiffer<any>;
  /**
   * @ignore
   * 获取到用户自定义的模板
   */
  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;
  /**
   * @ignore
   * 获取文本区域dom集合
   */
  @ViewChildren('nodeList') elems: QueryList<ElementRef>;
  /**
   * CdkVirtualScrollViewport 实例
   */
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  virtualScrollViewport: CdkVirtualScrollViewport;
  /**
   * @ignore
   * 模板中使用，高亮的选中项
   */
  public actived: TiTreeNode;
  /**
   * @ignore
   * 词条
   */
  public treeLan = TiLocale.getLocaleWords().tiTree;
  /**
   * @ignore
   * 模板中使用，虚拟滚动时每个节点占据的高度
   */
  public itemSize: number = TiTreeComponent.DEFAULT_ITEM_SIZE;
  /**
   * 被拖拽节点
   */
  private dragNode: TiTreeNode;
  /**
   * 拖拽position
   */
  private dropPosition: number;
  /**
   * 拖放经过的节点
   */
  private overNode: TiTreeNode;
  /**
   * 当前操作的节点是否为新增的节点
   */
  private addingNode: boolean = false;
  /**
   * 是否为 small(紧凑型) 的树
   */
  private isSmall: boolean = false;
  private oldData: Array<TiTreeNode>;
  protected versionInfo: string = super.getVersion(packageInfo);
  constructor(
    protected elementRef: ElementRef,
    protected renderer2: Renderer2,
    protected iterableDiffers: IterableDiffers,
    private tiRenderer: TiRenderer,
    private cdRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer2);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.dataDiffer = this.iterableDiffers.find(this.data).create((index: number, item: TiTreeNode) => {
      return item.checked;
    });
    // 内部使用的数据，用于记录用户的操作改变
    // TODO: 仅在初始化时挡非法数据，是不够的。建议去除。但因为要兼容已发出的版本，所以不去除。
    this.data = !Util.isArray(this.data) ? [] : this.data;
    this.oldData = this.data;
    this.isSmall = this.nativeElement.hasAttribute('small');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 动态修改选中项时需要修改索引才能使选中项高亮
    if (changes['data'] && !changes['data'].firstChange) {
      // 选中项背景高亮
      this.actived = this.initActived(this.data);
    }
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    if (this.data === this.oldData) {
      const dataChanges: IterableChanges<TiTreeNode> = this.dataDiffer.diff(this.data);
      if (dataChanges) {
        // 重新初始化选中项背景高亮
        this.actived = this.initActived(this.data);
      }
    } else {
      this.oldData = this.data;
    }

    // 异步挂载数据，改变节点属性时指引未发生变化，onpush模式下不会触发变更，故手动触发
    this.cdRef.markForCheck();
  }
  /**
   * @ignore
   * @description 判断是否显示复选框
   * @param node 节点数据
   */
  public showCheckboxFn(node: TiTreeNode): boolean {
    if (this.multiple !== true) {
      return false;
    }

    if (this.parentCheckable === true) {
      return true;
    }

    return TiTreeUtil.isLeaf(node);
  }

  /**
   * @ignore
   * @description 点击父节点图标执行的逻辑
   * @param  node 当前节点数据
   */
  public onClickPnodeIcon(node: TiTreeNode, event: MouseEvent): void {
    // 阻止事件冒泡：点击父节点图标无高亮样式
    event.stopPropagation();
    this.beforeExpandNode = node;
    // 1.当前节点是展开状态
    if (node.expanded) {
      node.expanded = false;
      this.collapse.emit(node);
    } else if (this.beforeExpand.observers.length === 0) {
      // 2.如果未定义beforeExpand事件(非异步)，点击时让节点展开
      node.expanded = true;
      this.expand.emit(node);
    } else {
      // 3.异步获取数据：将组件实例通知出去
      this.beforeExpand.emit(this);
    }
  }

  /**
   * 获取当前需要展开的父节点，适用于异步场景
   */
  public getBeforeExpandNode(): TiTreeNode {
    return this.beforeExpandNode;
  }
  /**
   * @ignore
   * @param node 节点
   */
  public onClickReload(event: MouseEvent, node): void {
    node.expanded = false;
    this.onClickPnodeIcon(node, event);
  }

  /**
   * @ignore
   * @description 根据item的isExpanded属性获取item图标
   * @param node 当前节点数据
   */
  public getItemIcon(node: TiTreeNode): string {
    if (TiTreeUtil.isLeaf(node)) {
      return `${node.expandIcon} ti3-tree-node-icon`;
    }

    return `${node.expanded ? node.expandIcon : node.collapseIcon} ti3-tree-node-icon`;
  }

  /**
   * @ignore
   * @description 点击复选框触发select、change事件
   * 需要注意：click事件中拿到的是操作前的选中状态，而change事件中拿到的是操作后的选中状态
   * @param node 当前节点数据
   */
  public onInputChange(node: TiTreeNode, event: Event): void {
    if (node.disabled === true) {
      return;
    }
    // 点击当前项高亮
    this.actived = node;
    if (this.checkRelation) {
      this.setSeletedState(node, this.data, node.checked);
    }
    if (!this.changedByCheckbox) {
      this.select.emit(node);
    }
    this.change.emit(node);
  }

  /**
   * @ignore
   * 点击文本区域
   * @param node 当前节点数据
   * @param event 鼠标事件
   * @returns void
   */
  public onItemWrapperClick(node: TiTreeNode): void {
    if (node.disabled === true || node.editing) {
      return;
    }
    // 悬浮功能: 点击生成节点时，显示操作按钮
    if (!node.editing) {
      node.isHover = true;
    }
    // 点击当前项高亮
    this.actived = node;
    // 1.处理多选情况
    if (this.multiple === true) {
      if (this.changedByCheckbox) {
        this.select.emit(node);

        return;
      }

      // 1.1 处理父节点不支持多选
      if (!this.showCheckboxFn(node)) {
        return;
      }

      // 1.2 处理父节点支持多选
      node.checked = node.checked !== true;
      // 处理当前节点选中状态变化后，对父子节点的影响
      if (this.checkRelation) {
        this.setSeletedState(node, this.data, node.checked);
      }
      this.select.emit(node);
      this.change.emit(node);

      return;
    }

    // 2.处理单选场景
    // 2.1(单选且已选中)或者(单选且非叶子节点)的情况下，点击只会触发select事件,因为当前选中项不会发生变化
    if (node.checked === true || !TiTreeUtil.isLeaf(node)) {
      // 触发select事件
      this.select.emit(node);

      return;
    }

    // 2.2单选叶子节点未选中
    this.deSelectAllNode(this.data);
    node.checked = true;
    TiTreeUtil.selectParents(node, this.data, 'indeterminate'); // 设置祖先节点的选中状态

    // 触发select和change事件
    this.select.emit(node);

    this.change.emit(node);
  }

  // 处理当前节点选中状态变化后，对父子节点的影响
  private setSeletedState = (node: TiTreeNode, allData: Array<TiTreeNode>, checked: boolean | string): void => {
    if (checked === true) {
      TiTreeUtil.selectAllChildren(node);
      TiTreeUtil.selectParents(node, allData, true);
    } else {
      TiTreeUtil.deSelectAllChildren(node);
      TiTreeUtil.deSelectParents(node, allData);
    }
  };

  /**
   * 单选时，取消所有节点的选中状态
   * @param  allData 所有节点数据
   */
  private deSelectAllNode = (allData: Array<TiTreeNode>): void => {
    allData.forEach((node: TiTreeNode) => {
      TiTreeUtil.deSelectAllChildren(node);
    });
  };

  /**
   * @ignore
   */
  public trackByFn(index: number, node: any): any {
    return index;
  }
  /**
   * @ignore
   * 判断是否为叶子节点
   */
  public isLeaf(node: TiTreeNode): boolean {
    return !Util.isArray(node.children);
  }

  // 初始化选中项高亮
  private initActived = (data: Array<TiTreeNode>): any => {
    let result: TiTreeNode;
    for (const node of data) {
      if (node.checked === true) {
        return node;
      }

      if (!TiTreeUtil.isLeaf(node)) {
        result = this.initActived(node.children);
      }

      if (!Util.isUndefined(result)) {
        return result;
      }
    }

    return result;
  };
  /**
   * @ignore
   * @param node 节点数据
   */
  public onBlur(node: TiTreeNode): void {
    if (node.focused) {
      node.focused = false; // 失焦后节点删除获焦标志类
    }
  }
  /**
   * @ignore
   * @param node 节点数据
   */
  public onFocus(node: TiTreeNode): void {
    if (!node.focused && !node.disabled) {
      node.focused = true; // 设置获焦标志类
    }
  }
  /**
   * @ignore
   * @param event 键盘事件
   * @param node 当前节点数据
   */
  public onKeydown(event: KeyboardEvent, node: TiTreeNode): void {
    /**
     * 快捷键交互定义
     * 1,tab键切换焦点至树组件的文本区域，复选框无需提供焦点，文本样式为文本悬浮态
     * 2,树组件内部焦点切换支持上下左右键：
     *    -上下键：按上下键可以在并列的节点移动，如无并列节点无法移动。
     *    -左右键：展开收起节点及跨层级移动焦点。当焦点再子节点时，按左键可收起改节点，焦点移动至父节点；
     *     当焦点在父节点上时，按右键可将焦点移动到启子节点上,如节点未展开则同时展开该子节点
     * 3,Enter键或Space键：当焦点在节点名称上时，按下键则选中或取消该节点，选中后节点变为选中态
     */
    // 阻止默认和冒泡
    if (
      [
        TiKeymap.KEY_ENTER,
        TiKeymap.KEY_NUMPAD_ENTER,
        TiKeymap.KEY_SPACE,
        TiKeymap.KEY_ARROW_UP,
        TiKeymap.KEY_ARROW_DOWN,
        TiKeymap.KEY_ARROW_LEFT,
        TiKeymap.KEY_ARROW_RIGHT
      ].indexOf(event.keyCode) > -1
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
    switch (event.keyCode) {
      case TiKeymap.KEY_ENTER: // ENTER键
      case TiKeymap.KEY_NUMPAD_ENTER: // ENTER键(苹果数字小键盘)
      case TiKeymap.KEY_SPACE:
        this.onItemWrapperClick(node);
        break;
      case TiKeymap.KEY_ARROW_UP: // 向上箭头，同级
        this.setKeyDownUp(node, 'up');
        break;
      case TiKeymap.KEY_ARROW_DOWN: // 向下箭头，同级
        this.setKeyDownUp(node, 'down');
        break;
      case TiKeymap.KEY_ARROW_LEFT: // 向左箭头，跨节点层级
        this.setKeyleft(node);
        break;
      case TiKeymap.KEY_ARROW_RIGHT: // 向右箭头，跨节点层级
        this.setKeyright(node);
        break;
      default:
        break;
    }
  }

  // 上下键
  private setKeyDownUp(node: TiTreeNode, type: string): void {
    let parArr: Array<TiTreeNode>;
    const pareNode: TiTreeNode = TiTreeUtil.getParentNode(this.data, node); // 获取父节点
    if (pareNode) {
      parArr = pareNode.children;
    } else {
      parArr = this.data;
    }
    const curIndex: number = parArr.findIndex((item: TiTreeNode) => item === node); // 获取当前节点在其父节点集合的index
    this.setFocusNode(node, parArr, curIndex, type);
  }
  // 左键
  private setKeyleft(node: TiTreeNode): void {
    // 当正在编辑时，关闭其父节点时，节点恢复文本状态
    if (node.editing && node.label !== '') {
      delete node.editing;
    }
    const pareNode: TiTreeNode = TiTreeUtil.getParentNode(this.data, node);
    if (!pareNode) {
      // 当前节点时一级节点时 return
      return;
    }
    pareNode.expanded = false;
    this.collapse.emit(node);
    if (pareNode.disabled) {
      this.setKeyleft(pareNode);

      return;
    }
    pareNode.focused = true;
    this.setFocusElem(node);
  }
  // 右键
  private setKeyright(node: TiTreeNode): void {
    if (TiTreeUtil.isLeaf(node)) {
      return;
    }
    const childNodeArr: Array<TiTreeNode> = node.children;
    const childnoDisabledArr: Array<TiTreeNode> = childNodeArr.filter((childNode: TiTreeNode) => !childNode.disabled); // 获取子节点未禁用的节点集合
    if (childnoDisabledArr.length < 1) {
      return;
    }
    const childFirstNode: TiTreeNode = childnoDisabledArr[0]; // 未禁用的节点集合的first获取焦点
    childFirstNode.focused = true;
    if (!node.expanded) {
      node.expanded = true;
      this.expand.emit(node);
    }
    this.setFocusElem(node);
  }
  // 上下键焦点处理
  private setFocusNode(node: TiTreeNode, parList: Array<TiTreeNode>, curIndex: number, type: string): void {
    let targetNode: TiTreeNode;
    let targetIndex: number;
    let _curIndex: number = curIndex;
    if (type === 'up') {
      // 同级获取上一个节点
      targetIndex = _curIndex - 1;
      if (targetIndex < 0) {
        targetIndex = parList.length - 1;
      }
      targetNode = parList[targetIndex];
    } else {
      // 同级获取下一个节点
      targetIndex = _curIndex + 1;
      if (targetIndex > parList.length - 1) {
        targetIndex = 0;
      }
      targetNode = parList[targetIndex];
    }
    // 上下移动时，first或last节点禁用时,return
    if ((targetNode === parList[0] || targetNode === parList[parList.length - 1]) && targetNode.disabled) {
      return;
    }
    // 当中间节点有禁用时，移动到禁用的节点上一个或下一个节点
    if (targetNode.disabled) {
      _curIndex = targetIndex;
      this.setFocusNode(node, parList, _curIndex, type);

      return;
    }
    targetNode.focused = true;
    this.setFocusElem(node);
  }

  // 目标元素获取焦点
  private setFocusElem(node: TiTreeNode): void {
    if (node.focused) {
      node.focused = false;
    }
    // 当按键操作会改变文本元素是否添加class`ti3-tree-text-focus`, 加延时是为了class变更后，获取正确的含有class的文本区域元素
    // 类ti3-tree-text-focus作为获焦元素的标志
    setTimeout(() => {
      // 找到含有类ti3-tree-text-focus的文本元素
      const focusNode: ElementRef = this.elems.toArray().find((elem: ElementRef) => {
        return this.tiRenderer.hasClass(elem.nativeElement, 'ti3-tree-text-focus');
      });
      if (focusNode) {
        focusNode.nativeElement.focus();
      }
    }, 0);
  }

  /**
   * @ignore
   * @param node 当前节点数据
   * @description 节点是否可拖拽
   */
  public isDraggable(node: TiTreeNode): boolean {
    return !node.disabled && (node.draggable || (this.nodeDraggable && node.draggable !== false));
  }

  /**
   * @ignore
   * @param startEvent 鼠标事件
   * @param node 当前节点数据
   * @description 拖拽开始时在被拖拽元素上触发此事件
   */
  public onDragstart(event: DragEvent, node: TiTreeNode): void {
    // 当节点的draggable属性设置为false表示不可拖拽，但是选中文本时会触发dragstart事件，故阻止默认行为
    if (!this.isDraggable(node)) {
      event.preventDefault();

      return;
    }

    event.stopPropagation();
    this.dragNode = node; // 保存被拖拽的节点
  }

  /**
   * @ignore
   * @param enterEvent 鼠标事件
   * @param node 当前节点数据
   * @description 拖拽鼠标进入元素时在该元素上触发
   */
  public onDragenter(event: DragEvent, node: TiTreeNode): void {
    event.preventDefault();
    this.overNode = null;

    // 拖拽节点和目标节点是同一节点,retuen
    if (node === this.dragNode) {
      return;
    }

    // 保存移动到的节点
    this.overNode = node;

    // 拖拽的节点拖拽到其子节点时，关闭其节点
    if (this.dragNode === TiTreeUtil.getParentNode(this.data, node)) {
      this.dragNode.expanded = false;
      this.collapse.emit(node);
    }
  }

  /**
   * @ignore
   * @param overEvent 鼠标事件
   * @param node 当前节点数据
   * @description 拖拽时鼠标在目标元素上移动时触发
   */
  public onDragover(event: DragEvent, node: TiTreeNode): void {
    event.preventDefault();
    event.dataTransfer.effectAllowed = 'move';
    if (node === this.overNode) {
      this.clearDragClass(event); // 清除节点之前的样式
      this.dropPosition = this.calcDropPosition(event); // 获取移动到节点的位置
      // 拖拽经过父节点,放置内部位置时，且该节点未展开时，展开其节点
      if (this.dropPosition === 0 && !node.expanded && node.children && node.children.length > 1) {
        node.expanded = true;
        this.expand.emit(node);
      }
      // 设置拖动过程中的状态样式
      this.renderer2.addClass(event.currentTarget, this.setDragOverClass(node));
    }
  }

  /**
   * @ignore
   * @param leaveEvent 鼠标事件
   * @param node 当前节点数据
   * @description 拖拽时鼠标在离开目标元素时触发
   */
  public onDragleave(event: DragEvent, node: TiTreeNode): void {
    event.preventDefault();
    this.clearDragClass(event);
  }

  /**
   * @ignore
   * @param dropEvent 鼠标事件
   * @param node 当前节点数据
   * @description 鼠标在拖放目标上释放时,在拖放目标上触发
   */
  public onDrop(event: DragEvent, node: TiTreeNode): void {
    event.preventDefault();
    this.dragNode.focused = false;
    this.clearDragClass(event);
    // 异步加载节点时禁止放置到节点内部
    if (this.dropPosition === 0 && node.loadStatus === 'loading') {
      return;
    }
    // 拖拽节点和目标节点是同一节点,retuen
    if (node === this.dragNode) {
      return;
    }
    const params: TiTreeDragNode = {
      event,
      targetNode: node,
      dragNode: this.dragNode,
      dropPosition: this.dropPosition
    };

    if (this.beforeDrop.observers.length > 0) {
      this.beforeDrop.emit(params);

      return;
    }

    TiTreeUtil.dropApply(params, this.data);

    // 拖放节点是父节点且是收起状态时，展开该节点
    if (node.children && node.children.length > 0 && !node.expanded) {
      node.expanded = true;
      this.expand.emit(node);
    }
    this.nodeDrop.emit(params);
  }

  /**
   * @ignore
   * @param endEvent 鼠标事件
   * @param node 当前节点数据
   * @description 鼠标在拖放目标上释放时,在拖拽元素上触发
   */
  public onDragend(event: DragEvent, node: TiTreeNode): void {
    event.preventDefault();
    this.dragNode = null;
    this.overNode = null;
  }

  // 计算拖拽节点的放置方式0（作为目标节点的子节点），-1（放置在目标节点的前面）,1（放置在目标节点的后面）
  private calcDropPosition(event: DragEvent): number {
    const clientY: number = event.clientY;
    const { top, height } = (event.target as HTMLElement).getBoundingClientRect();
    const gapHeight: number = height / 3;
    if (clientY > top + height - gapHeight) {
      return 1;
    }
    if (clientY < top + gapHeight) {
      return -1;
    }

    return 0;
  }

  // 清除拖拽样式
  private clearDragClass(event: DragEvent): void {
    // 拖拽过程中的三种状态
    const dragClasses: Array<string> = ['ti3-tree-drag-over-inner', 'ti3-tree-drag-over-top', 'ti3-tree-drag-over-bottom'];
    dragClasses.forEach((item: string) => {
      this.renderer2.removeClass(event.currentTarget, item);
    });
  }

  // 根据拖动的位置获取相应的样式
  private setDragOverClass(node: TiTreeNode): string {
    if (node !== this.overNode) {
      return;
    }
    if (this.dropPosition === 0) {
      return 'ti3-tree-drag-over-inner';
    } else if (this.dropPosition === -1) {
      return 'ti3-tree-drag-over-top';
    } else if (this.dropPosition === 1) {
      return 'ti3-tree-drag-over-bottom';
    }

    return '';
  }

  /**
   * @ignore
   * @param node 节点
   * @param type hover标志
   */
  public onMousenode(node: TiTreeNode, type: string): void {
    // 鼠标进入节点且不是编辑状态时，显示操作按钮
    if (type === 'enter' && !node.editing) {
      node.isHover = true;
    } else {
      delete node.isHover;
    }
  }

  /**
   * @ignore
   * @param node 节点
   */
  public onBlurEdit(node: TiTreeNode): void {
    if (node.label === '') {
      return;
    }

    delete node.editing;

    if (this.addingNode) {
      this.addingNode = false;
      this.afterNodeAdd.emit(node);

      return;
    }

    this.afterNodeEdit.emit(node);
  }

  /**
   * @ignore
   * @param node 节点
   */
  public onKeydownEdit(event: KeyboardEvent): void {
    // 当中文输入法成对输入符号(中括号 大括号)，默认会触发左键将光标移动到前后符号中间，会触发父节点的左键事件，导致父节点收起
    event.stopPropagation();
  }

  /**
   * @ignore
   * @param deleteEvent 删除事件
   * @param node 节点
   */
  public deleteNode(event: Event, node: TiTreeNode): void {
    // 阻止事件冒泡 防止触发选中
    event.stopPropagation();
    const parentNode: TiTreeNode = TiTreeUtil.getParentNode(this.data, node);
    TiTreeUtil.removeNode(this.data, node);
    // 节点的父节点无子节点时， 删除children属性，解决依旧会显示展开图标问题
    if (parentNode && parentNode.children.length < 1) {
      delete parentNode.children;
    }
    // 更新多选状态
    if (this.multiple) {
      TiTreeUtil.updateChecked(this.data);
    }
    this.nodeDeleted.emit(node);
  }

  /**
   * @ignore
   * @param editEvent 编辑事件
   * @param node 节点
   */
  public editNode(event: Event, node: TiTreeNode): void {
    // 阻止事件冒泡 防止触发选中
    event.stopPropagation();
    node.editing = true;
    delete node.isHover;
    this.nodeEdited.emit(node);
    // autofocus视图变化时 会报错 视图变化时 强制变检一次，消除报错(Expression has changed after it was checked)
    this.cdRef.detectChanges();
  }

  /**
   * @ignore
   * @param addEvent 增加事件
   * @param node 节点
   */
  public addNode(event: Event, node: TiTreeNode): void {
    // 阻止事件冒泡 防止触发选中
    event.stopPropagation();
    this.addingNode = true;
    const newNode: TiTreeNode = {
      label: this.treeLan.newNode,
      editing: true,
      parent: node
    };
    node.expanded = true;
    this.expand.emit(node);
    this.nodeAdded.emit(newNode);
    TiTreeUtil.addNode(this.data, [newNode], 0, node);
    // 更新多选状态
    if (this.multiple) {
      TiTreeUtil.updateChecked(this.data);
    }
    // autofocus视图变化时 会报错 强制变检一次，消除报错(Expression has changed after it was checked)
    this.cdRef.detectChanges();
  }
  /**
   * @ignore
   * @param node 节点
   */
  public onClickMore(node: TiTreeNode): void {
    this.beforeMore.emit(node);
  }

  /**
   * @ignore
   * 开启虚拟滚动时需要对节点数据做扁平化处理
   * @param nodes 同层级且隶属同一父节点的节点集合
   * @param level 节点层级，根节点层级为0，往下依次类推
   */
  public getFlatData(nodes: Array<TiTreeNode>, level?: number): Array<TiTreeNode> {
    let result: Array<TiTreeNode> = [];
    if (!nodes) {
      return result;
    }
    nodes.forEach((item: TiTreeNode, index: number): void => {
      item.level = level ? level : 0;
      item.isLast = index === nodes.length - 1;
      item.isFirst = index === 0;
      result.push(item);
      if (item.expanded && item.children && item.children.length > 0) {
        result = result.concat(this.getFlatData(item.children, item.level + 1));
      }
    });

    return result;
  }

  /**
   * @ignore
   * 虚拟滚动扁平化结构时，获取不同层级节点左侧的缩进
   * @param node 节点
   */
  public getNodeLeftSpace(node: TiTreeNode): string {
    const space: number = this.isSmall ? TiTreeComponent.SMALL_ITEM_LEFT_SPACE : TiTreeComponent.DEFAULT_ITEM_LEFT_SPACE;

    return `${node.level * space}px`;
  }
  /**
   * @ignore
   * 是否为根节点
   * @param node 节点
   */
  public isRootNode(node: TiTreeNode): boolean {
    return this.data.includes(node);
  }
  /**
   * @ignore
   * @param level 节点层级
   */
  public getVerticalGuideLines(level: number): Array<any> {
    return new Array(level);
  }

  /**
   * @ignore
   * @param level 节点层级
   */
  public getVerticalGuideLineLeft(level: number): string {
    const size: number = this.isSmall ? TiTreeComponent.SMALL_ITEM_LEFT_SPACE : TiTreeComponent.DEFAULT_ITEM_LEFT_SPACE;
    // 其中 6 和 8 是 展开/收起图标宽度的一半
    const offset: number = this.isSmall ? 6 : 8;

    return `${(level * size + offset) * -1}px`;
  }
}
