import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { TiTreeComponent, TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './tree-before-expand.html',
  encapsulation: ViewEncapsulation.None
})
export class TreeBeforeExpandComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  tree: Array<TiTreeNode> = [
    {
      label: '家用电器',
      children: []
    },
    {
      label: '视频',
      children: []
    }
  ];
  treeID: number = 5;
  beforeExpand(TreeCom: TiTreeComponent): void {
    const item: TiTreeNode = TreeCom.getBeforeExpandNode();
    item.loadStatus = 'loading';
    const getDataPromise: any = this.getNodeData(item);
    getDataPromise
      .then((data: Array<TiTreeNode>) => {
        item.children = data;
        item.expanded = true;
        item.loadStatus = 'success';
      })
      .catch(() => {
        item.expanded = true;
        item.loadStatus = 'error';
      });
  }
  createData(item: TiTreeNode): Array<TiTreeNode> {
    const data: Array<TiTreeNode> = [];
    if (item.label === '家用电器') {
      for (let i: number = 0; i < 3; i++) {
        const dataList: TiTreeNode = {
          type: 'FILE',
          label: `item${this.treeID}`
        };
        this.treeID++;
        data.push(dataList);
      }

      return data;
    }

    return data;
  }
  getNodeData(item: TiTreeNode): any {
    return new Promise((resolve: any, reject: any): any => {
      setTimeout(() => {
        const data: Array<TiTreeNode> = this.createData(item);
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
}
