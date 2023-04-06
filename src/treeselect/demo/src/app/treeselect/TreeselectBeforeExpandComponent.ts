import { ChangeDetectorRef, Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-before-expand.html'
})
export class TreeselectBeforeExpandComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  private treeID: number = 5;
  // 单选
  options: Array<TiTreeNode> = [
    {
      label: '家用电器',
      children: []
    },
    {
      label: '服饰',
      children: []
    },
    {
      label: '视频',
      children: []
    },
    {
      label: '食品',
      children: []
    }
  ];

  value: any = TiTreeUtil.getTreeSelectedData(this.options, true, false);

  // 异步请求数据后插入当前节点并展开
  onBeforeExpand(item: TiTreeNode, multile?: boolean): void {
    if (item.children.length > 0) {
      // 已经加载过数据就不再重复加载,业务可根据自身场景来决定是否需要进行该处理
      item.expanded = true;

      return;
    }
    item.loadStatus = 'loading'; // 标志正在加载
    const getDataPromise: any = this.getNodeData(item);
    getDataPromise
      .then((data: Array<TiTreeNode>) => {
        // 1.将请求到的数据挂到该节点上
        item.children = data;
        // 2. 多选情况下，如果该节点是选中状态，则需要将所有子节点也选中
        if (multile && item.checked === true) {
          item.children.forEach((child: TiTreeNode) => {
            child.checked = true;
          });
        }
        // 3.将该节点展开
        item.expanded = true;
        item.loadStatus = 'success'; // 标志加载成功
      })
      .catch(() => {
        // 异步获取数据失败
        item.expanded = true; // 打开当前节点
        item.loadStatus = 'error'; // 标志加载失败
      });
  }

  private getNodeData(item: TiTreeNode): any {
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
        // 默认模式下不需要
        // 服务可根据自身接口增加该方法
        this.changeDetectorRef.markForCheck();
      }, 2000);
    });
  }

  private createData(item: TiTreeNode): Array<TiTreeNode> {
    const data: Array<TiTreeNode> = [];
    if (item.label === '服饰' || item.label === '家用电器') {
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
}
