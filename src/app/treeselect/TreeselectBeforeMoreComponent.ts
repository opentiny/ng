import { ChangeDetectorRef, Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-before-more.html',
})
export class TreeselectBeforeMoreComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  options: Array<TiTreeNode> = [
    {
      label: '家用电器',
      children: [],
    },
    {
      label: '服饰',
      children: [],
    },
    {
      label: '视频',
      children: [],
    },
    {
      label: '食品',
      children: [],
    },
  ];

  value: any = TiTreeUtil.getSelectedData(this.options, true, true);
  treeID: number = 0;
  offset: number; // 当前已展开的节点数量
  nodeNum: number = 3; // 每次点击展开节点的数量

  // 异步请求数据后插入当前节点并展开
  beforeExpand(node: TiTreeNode, multile?: boolean): void {
    if (node.children.length > 0) {
      // 已经加载过数据就不再重复加载,业务可根据自身场景来决定是否需要进行该处理
      node.expanded = true;

      return;
    }

    node.loadStatus = 'loading'; // 标志正在加载
    this.offset = 0;
    const getDataPromise: Promise<any> = this.getNodeData(node, this.offset, this.nodeNum, 'before');
    getDataPromise
      .then((data: Array<TiTreeNode>) => {
        // 1.将请求到的数据挂到该节点上
        node.children = data;
        // 2. 多选情况下，如果该节点是选中状态，则需要将所有子节点也选中
        if (multile && node.checked === true) {
          node.children.forEach((child: TiTreeNode) => {
            child.checked = true;
          });
        }
        node.showMore = true; // 当前节点下显示更多按钮
        // 3.将该节点展开
        node.expanded = true;
        node.loadStatus = 'success'; // 标志加载成功
      })
      .catch((error: Error) => {
        // 异步获取数据失败
        node.expanded = true; // 打开当前节点
        node.loadStatus = 'error'; // 标志加载失败
      });
  }

  // 点击更多异步请求其余节点
  beforeMore(node: TiTreeNode, multile?: boolean): void {
    node.moreStatus = 'loading';
    this.offset = node.children?.length;
    const getDataPromise: Promise<any> = this.getNodeData(node, this.offset, this.nodeNum, 'more');
    getDataPromise
      .then((data: Array<TiTreeNode>) => {
        // 多选情况下，如果该节点是选中状态，则需要将新添加的子节点也选中
        if (multile && node.checked === true) {
          data.forEach((child: TiTreeNode) => {
            child.checked = true;
          });
        }
        // 将请求的数据合并到该节点上
        node.children = node.children.concat(data);
        node.moreStatus = 'success'; // 标志加载成功
        // 此处根据业务实际返回，数据加载完后隐藏更多按钮
        if (node.children.length > 6) {
          node.showMore = false;
        }
      })
      .catch((error: Error) => {
        node.moreStatus = 'error'; // 异步获取数据失败
      });
  }

  // 模拟异步请求
  private getNodeData(item: TiTreeNode, offset: number, num: number, style: string): any {
    return new Promise((resolve: any, reject: any): any => {
      setTimeout(() => {
        const data: Array<TiTreeNode> = this.createData(item, offset, num, style);
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

  private createData(item: TiTreeNode, offset: number, num: number, style: string): Array<TiTreeNode> {
    const data: Array<TiTreeNode> = [];
    let result: Array<TiTreeNode>;
    this.treeID = 0;
    if (
      style === 'before' &&
      (item.label === '服饰' || item.label === '家用电器' || item.label === '视频' || item.label === '食品')
    ) {
      for (let i: number = 0; i < 100; i++) {
        const dataList: TiTreeNode = {
          label: item.label + this.treeID,
          children: [],
        };
        this.treeID++;
        data.push(dataList);
      }
    }

    if (style === 'more' && (item.label === '服饰' || item.label === '家用电器')) {
      for (let i: number = 0; i < 100; i++) {
        const dataList: TiTreeNode = {
          label: item.label + this.treeID,
          children: [],
        };
        this.treeID++;
        data.push(dataList);
      }
    }

    result = data.slice(offset, offset + num);

    return result;
  }
}
