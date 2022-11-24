import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { TiTreeComponent, TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './tree-before-more.html',
  encapsulation: ViewEncapsulation.None
})
export class TreeBeforeMoreComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  innerData: Array<TiTreeNode> = [
    {
      label: '家用电器',
      children: []
    },
    {
      label: '视频',
      children: []
    }
  ];
  treeID: number = 0;
  multiple: boolean = true;
  offset: number; // 当前已展开的节点数量
  nodeNum: number = 2; // 每次点击展开节点的数量
  beforeExpand(TreeCom: TiTreeComponent): void {
    const node: TiTreeNode = TreeCom.getBeforeExpandNode();
    node.loadStatus = 'loading';
    this.offset = 0;
    const getDataPromise: any = this.getNodeData(
      node,
      this.offset,
      this.nodeNum,
      'before'
    );
    getDataPromise
      .then((data: Array<TiTreeNode>) => {
        node.children = data;
        node.showMore = true;
        node.expanded = true;
        node.loadStatus = 'success';
      })
      .catch(() => {
        node.showMore = false;
        node.expanded = true;
        node.loadStatus = 'error';
      });
  }
  beforeMore(node: TiTreeNode): void {
    node.moreStatus = 'loading';
    this.offset = node.children?.length;
    const getDataPromise: any = this.getNodeData(
      node,
      this.offset,
      this.nodeNum,
      'more'
    );
    getDataPromise
      .then((data: Array<TiTreeNode>) => {
        node.children = node.children.concat(data);
        node.moreStatus = 'success';
      })
      .catch(() => {
        node.moreStatus = 'error';
      });
  }
  getNodeData(
    item: TiTreeNode,
    offset: number,
    num: number,
    style: string
  ): any {
    return new Promise((resolve: any, reject: any): any => {
      setTimeout(() => {
        const data: Array<TiTreeNode> = this.createData(
          item,
          offset,
          num,
          style
        );
        if (data && data.length > 0) {
          resolve(data);
        } else {
          const errMsg: string = '获取数据失败';
          reject(errMsg);
        }
        // onPush模式下,setTimeout返回数据，需要使用changeDetectorRef
        this.changeDetectorRef.markForCheck();
      }, 2000);
    });
  }

  createData(
    item: TiTreeNode,
    offset: number,
    num: number,
    style: string
  ): Array<TiTreeNode> {
    const data: Array<TiTreeNode> = [];
    let result: Array<TiTreeNode>;
    this.treeID = 0;
    if (style === 'before' &&
      (item.label === '家用电器' || item.label === '视频')) {
      for (let i: number = 0; i < 100; i++) {
        const dataList: TiTreeNode = {
          label: item.label + this.treeID,
          children: []
        };
        this.treeID++;
        data.push(dataList);
      }
    }

    if (style === 'more' && item.label === '家用电器') {
      for (let i: number = 0; i < 100; i++) {
        const dataList: TiTreeNode = {
          label: item.label + this.treeID,
          children: []
        };
        this.treeID++;
        data.push(dataList);
      }
    }
    result = data.slice(offset, offset + num);

    return result;
  }
}
