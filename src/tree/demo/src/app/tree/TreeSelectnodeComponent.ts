import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';
@Component({
  templateUrl: './tree-selectnode.html', // 指定组件模板
  styleUrls: ['./treeTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class TreeSelectnodeComponent implements OnInit {
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
          expandIcon: 'document',
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
                  checked: true
                },
                {
                  expandIcon: 'calendar',
                  label: '美的空调'
                }
              ]
            },
            {
              expandIcon: 'calendar',
              label: '冰箱'
            },
            {
              expandIcon: 'calendar',
              label: '洗衣机'
            },
            {
              expandIcon: 'calendar',
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
          expandIcon: 'document',
          collapseIcon: 'file',
          children: [
            {
              expandIcon: 'calendar',
              label: '加湿器'
            },
            {
              expandIcon: 'calendar',
              label: '电熨斗'
            }
          ]
        }
      ]
    },
    {
      label: '服饰',
      expanded: true,
      expandIcon: 'document',
      collapseIcon: 'file',
      children: [
        {
          expandIcon: 'calendar',
          label: '男装'
        },
        {
          expandIcon: 'calendar',
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      expandIcon: 'document',
      collapseIcon: 'file',
      expanded: false,
      checked: false,
      children: [
        {
          expandIcon: 'calendar',
          label: '面部护理',
          checked: false
        }
      ]
    }
  ];
  multiple: boolean = false;
  selectedData: Array<TiTreeNode> = [];
  ngOnInit(): void {
    [...this.arr] = this.innerData;
    this.newId = 40;
    this.selectedData = TiTreeUtil.getSelectedData(this.innerData, false, false);
  }

  selectFn(event: TiTreeNode): void {
    this.selectedData = TiTreeUtil.getSelectedData(this.innerData, false, false);
  }

  changeFn(event: TiTreeNode): void {
    console.log(event, 'change');
  }

  // 选中并展开面部护理
  selectNode(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.expandNode(data, data[2].children[0]);
    TiTreeUtil.selectNode(data, data[2].children[0], false);
    this.innerData = data;
  }

  // 选中海尔空调
  selectNode1(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.selectNode(data, data[0].children[0].children[0].children[0], false);
    this.innerData = data;
  }
  // 选中男装
  selectNode2(): void {
    const data: Array<TiTreeNode> = this.arr.concat();
    TiTreeUtil.selectNode(data, data[1].children[0], false);
    this.innerData = data;
  }
}
