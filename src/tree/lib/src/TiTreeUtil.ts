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
import { Util } from '@opentiny/ng-utils';
import { TiTreeNode, TiTreeDragNode } from './TiTreeComponent';
/**
 *
 * 用于封装给树组件 [TiTreeComponent]{@link ../components/TiTreeComponent.html}
 * 提供公共方法，包括增、删、改、查、选中、取消选中、遍历、筛选、获取选中项等操作
 */
export class TiTreeUtil {
  private static selectedData: Array<TiTreeNode> = [];
  private static pnode: Array<TiTreeNode> = [];
  /**
   * 查找指定节点的父节点
   * @param data 所有节点数据
   * @param node 节点
   */
  public static getParentNode(data: Array<TiTreeNode>, node: TiTreeNode): TiTreeNode {
    if (!Array.isArray(data)) {
      return;
    }

    for (const item of data) {
      if (!TiTreeUtil.isLeaf(item)) {
        if (item.children.indexOf(node) !== -1) {
          return item;
        } else {
          const result: TiTreeNode = TiTreeUtil.getParentNode(item.children, node);
          if (result) {
            return result;
          }
        }
      }
    }
  }

  /**
   * 对整个树的每个节点执行一次给定的函数
   * @param data 所有节点数据
   * @param traverseFn 对各个节点执行的操作
   */
  public static traverse(data: Array<TiTreeNode>, traverseFn: Function): void {
    if (!Util.isFunction(traverseFn) || !Array.isArray(data)) {
      return;
    }

    for (const item of data) {
      traverseFn(item);
      if (!TiTreeUtil.isLeaf(item)) {
        TiTreeUtil.traverse(item.children, traverseFn);
      }
    }
  }

  /**
   * 更新多选树各节点的选中状态；主要用于手动添加或删除节点时，当前节点的兄弟节点和父节点的选中状态不一致。
   * @param data  所有节点数据
   */
  public static updateChecked(data: Array<TiTreeNode>): void {
    TiTreeUtil.check(data);
  }

  /**
   * 检查当前数据的多选状态
   * @param data 当前节点集合
   * @param allData 全部数据集合
   */
  private static check(data: Array<TiTreeNode>): void {
    for (const item of data) {
      // 非叶子节点深度优先递归，再回溯当前节点
      if (!TiTreeUtil.isLeaf(item)) {
        TiTreeUtil.check(item.children);
        // 根据子节点计算当前节点选中状态
        item.checked = TiTreeUtil.computeChecked(item);
      }
    }
  }

  /**
   * 当前节点是否是叶子节点的父节点，
   * 因为更新节点的选中状态时，根据叶子节点的选中状态计算出父节点的选中状态，再更新父节点的选中状态。
   * @param node 当前节点
   */
  private static isLeafsParentNode(node: TiTreeNode): boolean {
    if (!Array.isArray(node.children)) {
      return false;
    } else {
      for (const child of node.children) {
        if (Array.isArray(child.children)) {
          return false;
        }
      }

      return true;
    }
  }

  /**
   * 根据子节点的多选状态，计算出当前节点的多选状态
   * @param node 当前节点
   */
  private static computeChecked(node: TiTreeNode): boolean | string {
    const childrens: Array<TiTreeNode> = node.children;
    if (!childrens?.length) {
      return node?.checked;
    }
    let selectedNum: number = 0;
    let unSelectedNum: number = 0;
    for (const child of childrens) {
      if (child.checked === true) {
        selectedNum++;
      } else if (!child.checked) {
        // false和undefined 两种
        unSelectedNum++;
      }
    }
    if (selectedNum === childrens.length) {
      return true;
    } else if (unSelectedNum === childrens.length) {
      return false;
    } else {
      return 'indeterminate';
    }
  }

  /**
   * 添加节点
   * @param data 所有节点数据
   * @param node  添加的一个或多个节点
   * @param index  添加的位置: -1表示从尾部追加
   * @param pNode 指定要添加的节点的父节点，没有指定父节点时默认添加到根节点
   */
  public static addNode(data: Array<TiTreeNode>, node: Array<TiTreeNode>, index: any, pNode?: TiTreeNode): void {
    const k: number = parseInt(index, 10);
    if (isNaN(k) || !Array.isArray(data)) {
      return;
    }

    const nodes: Array<TiTreeNode> = Array.isArray(node) ? node : [node];
    // 当没有指定父节点时，默认将节点添加到根节点
    if (!pNode) {
      const resuleIndex: any = index === -1 ? data.length : index;
      for (let i: number = 0; i < nodes.length; i++) {
        data.splice(resuleIndex + i, 0, nodes[i]);
      }

      return;
    }

    // 如果父节点是叶子节点时，给叶子节点添加children数组
    if (TiTreeUtil.isLeaf(pNode)) {
      pNode.children = [];
    }

    // 根据Index值，将node插入指定位置
    if (index === -1) {
      pNode.children = pNode.children.concat(nodes); // 返回值为新数组
    } else {
      for (let j: number = 0; j < nodes.length; j++) {
        pNode.children.splice(index + j, 0, nodes[j]);
      }
    }
  }

  /**
   * 删除指定节点
   * @param  data 所有节点数据
   * @param  node  节点
   */
  public static removeNode(data: Array<TiTreeNode>, node: TiTreeNode): void {
    if (!Array.isArray(data)) {
      return;
    }

    // 找到不匹配搜索内容的叶子节点并删除。为了避免要删除的元素在数组中的索引改变，从后向前循环
    for (let i: number = data.length - 1; i >= 0; i--) {
      if (data[i] === node) {
        TiTreeUtil.deleteArr(data, i);

        return;
      }

      if (!TiTreeUtil.isLeaf(data[i])) {
        TiTreeUtil.removeNode(data[i].children, node);
      }
    }
  }
  // 3.0.3 selectNode/unSelectNode第三个参数：是否单选, 改为是否多选。已确认无人使用。
  // TODO：这两个函数的重复代码，可以合并
  /**
   * 选中指定节点
   * @param  data 所有节点数据
   * @param  node  节点
   * @param  multiple 是否是多选树
   */
  public static selectNode(data: Array<TiTreeNode>, node: TiTreeNode, multiple: boolean): void {
    if (!Array.isArray(data)) {
      return;
    }
    if (!multiple) {
      // 单选模式
      TiTreeUtil.traverse(data, (travNode: TiTreeNode): void => {
        travNode.checked = false; // 清空所有的选中项
      });
      node.checked = true; // 将当前项置为选中
    } else {
      // 多选
      TiTreeUtil.selectAllChildren(node); // 先置当前节点选中，如果当前节点是非叶子节点 递归让其子节点全部选中
    }

    TiTreeUtil.selectParents(node, data, true, multiple); // 设置父节点选中情况
  }
  // TODO:Tiny4 deselect改为unselect
  /**
   * 取消选中指定节点
   * @param data 所有节点数据
   * @param node  节点
   * @param multiple 是否是多选树
   */
  public static deSelectNode(data: Array<TiTreeNode>, node: TiTreeNode, multiple: boolean): void {
    if (!Array.isArray(data)) {
      return;
    }
    if (!multiple) {
      TiTreeUtil.traverse(data, (travNode: TiTreeNode): void => {
        travNode.checked = false; // 清空所有的选中项
        travNode.unHighLight = false;
      });
    } else {
      TiTreeUtil.deSelectAllChildren(node);
      TiTreeUtil.deSelectParents(node, data);
    }
  }

  /**
   * 展开指定节点的祖先节点
   * @param data 所有节点数据
   * @param node 节点
   */
  public static expandNode(data: Array<TiTreeNode>, node: TiTreeNode): boolean {
    if (!Array.isArray(data)) {
      return;
    }

    let num: number = 0;
    let result: boolean = false;
    for (const item of data) {
      if (item === node) {
        num++;
      } else if (!TiTreeUtil.isLeaf(item)) {
        result = TiTreeUtil.expandNode(item.children, node);
        if (result) {
          item.expanded = true;
          num++;
        }
      }
    }

    return num > 0;
  }

  /**
   * 筛选匹配的节点
   * @param data 所有节点数据
   * @param matchFn 用户传入匹配节点的回调
   * @returns 是否找到
   */
  public static search(data: Array<TiTreeNode>, matchFn: (node: TiTreeNode) => boolean): boolean {
    if (!Util.isFunction(matchFn) || !Array.isArray(data)) {
      return false;
    }

    let findNum: number = 0;
    let isFind: boolean = false;
    // 找到不匹配搜索内容的叶子节点并删除。为了避免要删除的元素在数组中的索引改变，从后向前循环
    for (let i: number = data.length - 1; i >= 0; i--) {
      if (!matchFn(data[i]) && !TiTreeUtil.isLeaf(data[i])) {
        // 未匹配到且为父节点
        isFind = TiTreeUtil.search(data[i].children, matchFn);
        if (isFind) {
          findNum++;
        } else {
          TiTreeUtil.deleteArr(data, i);
        }
      } else if (matchFn(data[i])) {
        // 匹配到
        findNum++;
      } else {
        // 未匹配到且为叶子节点
        TiTreeUtil.deleteArr(data, i);
      }
    }

    return findNum > 0;
  }

  /**
   * 获取当前选中节点
   * @param data 所有节点数据
   * @param onlySelectLeaf 选中项中是否只包含叶子节点
   * @param multiple 是否是多选树
   * @param checkRelation 父子节点选中状态是否关联
   */
  public static getSelectedData(
    data: Array<TiTreeNode>,
    onlySelectLeaf: boolean,
    multiple: boolean,
    checkRelation?: boolean
  ): Array<TiTreeNode> {
    // 每次遍历之前需要清空当前选中项列表
    TiTreeUtil.selectedData = [];
    TiTreeUtil.querySelectedNode(data, onlySelectLeaf, multiple, checkRelation);

    return TiTreeUtil.selectedData;
  }

  /**
   * @ignore 获取当前选中节点
   * @description 作为treeselect 组件单独使用内部方法，规避回显时和选中不一致问题。
   * @param data 所有节点数据
   * @param onlySelectLeaf 选中项中是否只包含叶子节点
   * @param multiple 是否是多选树
   * @param checkRelation 父子节点选中状态是否关联
   */
  public static getTreeSelectedData(
    data: Array<TiTreeNode>,
    onlySelectLeaf: boolean,
    multiple: boolean,
    checkRelation?: boolean
  ): Array<TiTreeNode> {
    // 每次遍历之前需要清空当前选中项列表
    TiTreeUtil.selectedData = [];
    TiTreeUtil.querySelectedNode(data, onlySelectLeaf, multiple, checkRelation, true);

    return TiTreeUtil.selectedData;
  }

  /**
   * @ignore
   * @description 根据整棵树的节点数据，查询所有选中项，并更新selectedData
   * @param data 全部节点数据
   * @param onlySelectLeaf 选中项中是否只包含叶子节点
   * @param multiple 是否多选模式
   * @param checkRelation 父子节点选中状态是否关联
   * @param isTreeselectEcho 是否是下拉树回显 多选情况下
   */
  public static querySelectedNode(
    data: Array<TiTreeNode>,
    onlySelectLeaf: boolean,
    multiple: boolean,
    checkRelation?: boolean,
    isTreeselectEcho?: boolean
  ): void {
    let tempNode: any;
    const relation: boolean = checkRelation !== false;
    for (let i: number = 0; i < data.length; i++) {
      tempNode = data[i];

      //多选下拉 父节点为选中状态时
      if (multiple && !TiTreeUtil.isLeaf(tempNode) && isTreeselectEcho) {
        if (tempNode.checked === true) {
          TiTreeUtil.selectedData.push(tempNode);
          continue;
        }
      }

      // 多选树，父节点且父子选中关系不关联
      if (multiple && !relation && !TiTreeUtil.isLeaf(tempNode)) {
        if (tempNode.checked === true) {
          TiTreeUtil.selectedData.push(tempNode);
        }

        TiTreeUtil.querySelectedNode(tempNode.children, onlySelectLeaf, multiple, relation, isTreeselectEcho);
      } else if (TiTreeUtil.checkedParentNode(tempNode)) {
        TiTreeUtil.pnode.push(tempNode);
        TiTreeUtil.querySelectedNode(tempNode.children, onlySelectLeaf, multiple, relation, isTreeselectEcho);

        // 单选情况下仅查找到第一个选中的叶子节点即可
        if (!multiple) {
          break;
        }
      }

      // 叶子节点选中
      if (TiTreeUtil.checkedLeafNode(tempNode)) {
        TiTreeUtil.selectedData.push(tempNode);

        if (!onlySelectLeaf && (!multiple || (multiple && relation))) {
          tempNode.parent = TiTreeUtil.pnode.concat();
          // 单选情况下仅查找到第一个选中的叶子节点即可
          if (!multiple) {
            TiTreeUtil.pnode.splice(0, TiTreeUtil.pnode.length);
            break;
          }
        }
      }

      // 遍历到最后一项时将父节点从pnode中移除
      if (i === data.length - 1) {
        TiTreeUtil.pnode.pop();
      }
    }
  }

  /**
   * @ignore
   * @description 判断节点node是否是一个处于选中或半选状态的父节点
   * @param node 节点数据
   */
  public static checkedParentNode(node: TiTreeNode): boolean {
    return (node.checked === true || node.checked === 'indeterminate') && !TiTreeUtil.isLeaf(node);
  }

  /**
   * @ignore
   * @description 判断节点node是否是一个处于选中状态的叶子节点
   * @param node 节点数据
   */
  public static checkedLeafNode(node: TiTreeNode): boolean {
    return node.checked === true && TiTreeUtil.isLeaf(node);
  }

  /**
   * @ignore
   * 判断是否为叶子节点
   */
  public static isLeaf(item: TiTreeNode): boolean {
    return !Util.isArray(item.children);
  }

  /**
   * @ignore
   * 从数组arr中删除下标为index的节点
   */
  public static deleteArr(arr: Array<TiTreeNode>, index: number): void {
    arr.splice(index, 1);
  }
  // TODO: checked传入false时，与deSelectParents有什么区别？可以合并么？
  /**
   * @ignore
   * 当子节点选中时，设置祖先元素的选中状态
   * @param item 子节点的数据
   * @param allData 全部节点数据
   * @param checked 取值为：true/false/'indeterminate'
   * @param multiple 是否是多选树
   */
  public static selectParents(item: TiTreeNode, allData: Array<TiTreeNode>, checked: boolean | string, multiple?: boolean): void {
    const pNode: TiTreeNode = TiTreeUtil.getParentNode(allData, item);
    if (Util.isUndefined(pNode)) {
      return;
    }

    // 当子元素为半选时，祖先元素一律设置为半选状态
    if (checked === 'indeterminate') {
      pNode.checked = 'indeterminate';
      TiTreeUtil.selectParents(pNode, allData, 'indeterminate');

      return;
    }

    const childrens: Array<TiTreeNode> = pNode.children;
    let selectedNum: number = 0;
    for (const child of childrens) {
      if (child.checked === true) {
        selectedNum++;
      }
    }

    if (selectedNum === childrens.length) {
      //单选模式，子层级只有一项时，高亮正常，且getSelectData可正常获取到值
      if (childrens.length === 1 && multiple === false) {
        pNode.unHighLight = true; //单选模式，子层级只有一项时，父层级不高亮；
      }
      pNode.checked = true;
      TiTreeUtil.selectParents(pNode, allData, true, multiple);
    } else {
      pNode.checked = 'indeterminate';
      TiTreeUtil.selectParents(pNode, allData, 'indeterminate');
    }
  }

  /**
   * @ignore
   * 根据父节点选择子节点
   */
  public static selectAllChildren(item: TiTreeNode): void {
    // 如果子节点是禁用状态不做处理；
    if (item.disabled !== true) {
      item.checked = true;
    }

    if (!TiTreeUtil.isLeaf(item)) {
      item.children.forEach((child: TiTreeNode) => {
        TiTreeUtil.selectAllChildren(child);
      });
    }
  }

  // TODO:Tiny4 deselect改为unselect
  /**
   * @ignore
   * 父节点取消选中，置子节点都为取消选中状态
   * @param item 子节点的数据
   */
  public static deSelectAllChildren(item: TiTreeNode): void {
    item.checked = false;

    if (Util.isArray(item.children) && item.children.length > 0) {
      item.children.forEach((child: TiTreeNode) => {
        TiTreeUtil.deSelectAllChildren(child);
      });
    }
  }

  // TODO:Tiny4 deselect改为unselect
  /**
   * @ignore
   * 当前节点取消选中时，设置祖先元素的选中状态
   * @param item 当前节点的数据
   * @param allData 全部的节点数据
   */
  public static deSelectParents(item: TiTreeNode, allData: Array<TiTreeNode>): void {
    const pNode: TiTreeNode = TiTreeUtil.getParentNode(allData, item);
    if (Util.isUndefined(pNode)) {
      return;
    }

    const childrens: Array<TiTreeNode> = pNode.children;
    let selectedNum: number = 0;
    for (const child of childrens) {
      if (child.checked === true || child.checked === 'indeterminate') {
        selectedNum++;
      }
    }

    if (selectedNum === 0) {
      pNode.checked = false;
      TiTreeUtil.deSelectParents(pNode, allData);
    } else {
      pNode.checked = 'indeterminate';
      TiTreeUtil.selectParents(pNode, allData, 'indeterminate');
    }
  }
  /**
   * @ignore
   * @param event 拖拽数据
   * @param data 所用节点数据
   */
  public static dropApply(event: TiTreeDragNode, data: Array<TiTreeNode>): void {
    if (!Array.isArray(data)) {
      return;
    }
    const dragNode: TiTreeNode = event.dragNode; // 拖拽节点
    const dragParentNode: TiTreeNode = TiTreeUtil.getParentNode(data, dragNode); // 拖拽节点的父节点
    const dropNode: TiTreeNode = event.targetNode; // 拖放节点
    const dropParentNode: TiTreeNode = TiTreeUtil.getParentNode(data, dropNode); // 拖放节点的父节点
    const dropPosition: number = event.dropPosition; // 拖拽位置
    TiTreeUtil.removeNode(data, dragNode);
    // 拖拽父节点无子节点时，删除children属性，此处是为解决当children为空时，展开收起图标还会存在的问题
    if (dragParentNode?.children.length < 1) {
      delete dragParentNode.children;
    }
    if (dropPosition === 0) {
      TiTreeUtil.addNode(data, [dragNode], -1, dropNode);
    } else {
      let index: number;
      if (!dropParentNode) {
        // 拖放节点为顶级级节点时
        index = data.indexOf(dropNode);
        if (dropPosition === -1) {
          data.splice(index, 0, dragNode);
        } else {
          data.splice(index + 1, 0, dragNode);
        }
      } else {
        index = dropParentNode.children.indexOf(dropNode);
        if (dropPosition === -1) {
          TiTreeUtil.addNode(data, [dragNode], index, dropParentNode);
        } else {
          TiTreeUtil.addNode(data, [dragNode], index + 1, dropParentNode);
        }
      }
    }
    // 更新选中状态
    TiTreeUtil.updateChecked(data);
  }

  /**
   * 主干深拷贝，叶子浅拷贝
   * 因为搜索结果里，叶子节点的勾选效果，需要保留在原始数据。
   * @param data 节点数据
   * @returns 复制后的数据
   */
  /**
   * 拷贝节点数据，对非叶子节点深拷贝，叶子节点浅拷贝
   * @param data 节点数据
   * @returns 拷贝后的数据
   */
  public static copy(data: any): Array<TiTreeNode> {
    // 叶子节点 或 children 为 [] 也需要进行浅拷贝
    if (
      typeof data !== 'object' ||
      data === null ||
      (data.label !== undefined && (TiTreeUtil.isLeaf(data) || (data.children && data.children.length === 0)))
    ) {
      return data;
    }

    const clone: any = Array.isArray(data) ? data.slice() : { ...data };
    const keys: Array<string> = Object.keys(clone);
    for (const key of keys) {
      clone[key] = TiTreeUtil.copy(clone[key]);
    }

    return clone;
  }
}
