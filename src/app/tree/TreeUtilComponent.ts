import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';
@Component({
  templateUrl: './tree-util.html', // 指定组件模板
  styleUrls: ['./treeTest.less'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeUtilComponent implements OnInit, AfterViewInit {
  newId: number;
  arr: Array<TiTreeNode>;
  innerData: Array<TiTreeNode> = [
    {
      label: '家用电器',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '大家电',
          expanded: true,
          expandIcon: 'document', // 10.1.2版本之后可通过自定义模板设置图标及样式
          collapseIcon: 'file',
          checked: 'indeterminate',
          children: [
            {
              expandIcon: 'document',
              collapseIcon: 'file',
              label: '空调',
              expanded: true,
              checked: 'indeterminate',
              children: [
                {
                  expandIcon: 'calendar',
                  label: '海尔空调',
                  checked: true,
                },
                {
                  expandIcon: 'calendar',
                  label: '美的空调',
                },
              ],
            },
            {
              expandIcon: 'calendar',
              label: '冰箱',
            },
            {
              expandIcon: 'calendar',
              label: '洗衣机',
            },
            {
              expandIcon: 'calendar',
              label: '热水器',
            },
          ],
        },
        {
          label: '生活电器',
          expandIcon: 'document',
          collapseIcon: 'file',
          children: [
            {
              expandIcon: 'calendar',
              label: '加湿器',
            },
            {
              expandIcon: 'calendar',
              label: '电熨斗',
            },
          ],
        },
      ],
    },
    {
      label: '服饰',
      expanded: true,
      expandIcon: 'document',
      collapseIcon: 'file',
      children: [
        {
          expandIcon: 'calendar',
          label: '男装',
        },
        {
          expandIcon: 'calendar',
          label: '女装',
        },
      ],
    },
    {
      label: '化妆',
      expandIcon: 'document',
      collapseIcon: 'file',
      expanded: false,
      checked: true,
      children: [
        {
          expandIcon: 'calendar',
          label: '面部护理',
          checked: true,
        },
        {
          expandIcon: 'calendar',
          label: '口腔护理',
          checked: true,
        },
      ],
    },
  ];
  multiple: boolean = true;
  selectedData: Array<TiTreeNode> = [];
  ngOnInit(): void {
    [...this.arr] = this.innerData;
    this.newId = 40;
    this.selectedData = TiTreeUtil.getSelectedData(this.innerData, false, true);
  }

  ngAfterViewInit(): void {
    console.log(
      TiTreeUtil.getParentNode(
        this.innerData,
        this.innerData[0].children[0].children[0]
      )
    );
  }
  selectFn(event: TiTreeNode): void {
    this.selectedData = TiTreeUtil.getSelectedData(this.innerData, false, true);
  }

  changeFn(event: TiTreeNode): void {
    console.log(event, 'change');
  }

  /**
   * @description 生成一个节点/多个节点：
   * @param nodeNum 生成节点的个数：1，生成一个节点
   */
  createData(id: number, nodeNum: number): Array<TiTreeNode> {
    const data: Array<TiTreeNode> = [];
    if (nodeNum === 1) {
      const dataList: TiTreeNode = {
        label: `新增节点${id}`,
      };
      data.push(dataList);
    } else {
      for (let i: number = 0; i < nodeNum; i++) {
        this.newId = id + i;
        const dataLists: TiTreeNode = {
          label: `新增节点${this.newId}`,
        };
        data.push(dataLists);
      }
    }

    return data;
  }

  // 展开整个树
  expandNode(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.traverse(data, traverseFn);

    function traverseFn(node: TiTreeNode): void {
      node.expanded = true;
    }
    this.innerData = data;
  }

  // 折叠整个树
  deExpandNode(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.traverse(data, traverseFn);

    function traverseFn(node: TiTreeNode): void {
      node.expanded = false;
    }
    this.innerData = data;
  }

  // 根节点指定位置添加一个节点
  addNode1(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 1);
    console.log(node);
    TiTreeUtil.addNode(data, node, 1);
    this.innerData = data;
  }

  // 根节点指定位置添加多个节点
  addNode2(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 2);
    TiTreeUtil.addNode(data, node, 1);
    this.innerData = data;
  }

  // 根节点追加一个节点
  addNode3(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 1);
    TiTreeUtil.addNode(data, node, -1);
    this.innerData = data;
  }

  // 根节点追加多个节点
  addNode4(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 2);
    TiTreeUtil.addNode(data, node, -1);
    this.innerData = data;
  }

  // 父节点指定位置添加一个节点
  addNode5(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 1);
    TiTreeUtil.addNode(data, node, 0, data[1]);
    // 更新数据的选中状态。
    // 多选树且叶子节点的父节点可选时，如果父节点是选中的，添加一个非选中的叶子节点，父节点的选中状态应该改变，
    // 叶子节点的选中状态决定父节点的选中状态，要保证数据节点的选中状态一致，使用此方法更新数据选中项。
    TiTreeUtil.updateChecked(data);
    this.innerData = data;
  }

  // 父节点指定位置添加多个节点
  addNode6(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 2);
    TiTreeUtil.addNode(data, node, 0, data[1]);
    // 更新数据的选中状态。原因参考addNode5方法内注释
    TiTreeUtil.updateChecked(data);

    this.innerData = data;
  }

  // 父节点追加一个节点
  addNode7(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 1);
    TiTreeUtil.addNode(data, node, -1, data[1]);
    // 更新数据的选中状态。原因参考addNode5方法内注释
    TiTreeUtil.updateChecked(data);

    this.innerData = data;
  }

  // 父节点追加多个节点
  addNode8(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    const node: Array<TiTreeNode> = this.createData(++this.newId, 2);
    TiTreeUtil.addNode(data, node, -1, data[1]);
    // 更新数据的选中状态。原因参考addNode5方法内注释
    TiTreeUtil.updateChecked(data);
    this.innerData = data;
  }

  // 删除一个节点：美的空调
  deleteNode(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.removeNode(data, data[0].children[0].children[0].children[1]);
    // 更新数据的选中状态。原因参考addNode5方法内注释
    TiTreeUtil.updateChecked(data);
    this.innerData = data;
  }
  // 选中并展开面部护理
  selectNode(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.expandNode(data, data[2].children[0]);
    TiTreeUtil.selectNode(data, data[2].children[0], true);
    this.innerData = data;
  }

  // 取消选中并展开海尔空调
  deSelectNode(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.deSelectNode(
      data,
      data[0].children[0].children[0].children[0],
      true
    );
    TiTreeUtil.expandNode(data, data[0].children[0].children[0].children[0]);
    this.innerData = data;
  }

  remove(): void {
    this.innerData.pop();
  }
}
