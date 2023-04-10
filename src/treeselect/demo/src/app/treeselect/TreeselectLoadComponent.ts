import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-load.html'
})
export class TreeselectLoadComponent {
  options: Array<TiTreeNode>;
  value: any;

  private dataA: Array<TiTreeNode> = [
    {
      label: '家用电器',
      expanded: true,
      children: [
        {
          label: '大家电',
          expanded: true,
          children: [
            {
              label: '空调',
              expanded: true,
              disabled: false,
              children: [
                {
                  label: '海尔空调'
                },
                {
                  label: '美的空调'
                }
              ]
            },
            {
              label: '冰箱',
              disabled: false
            },
            {
              label: '洗衣机'
            },
            {
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器'
            },
            {
              label: '电熨斗'
            }
          ]
        }
      ]
    },
    {
      label: '服饰',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '男装',
          checked: true
        },
        {
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      children: [
        {
          label: '面部护理'
        },
        {
          label: '口腔护理'
        }
      ]
    }
  ];

  private dataB: Array<TiTreeNode> = [
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

  // 每个组件都用下面六个函数，只改变函数内容
  changeUndefined(): void {
    this.options = undefined;
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  }
  changeNull(): void {
    this.options = null;
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  }
  changeWrongType(): void {
    const temp: any = 5;
    this.options = temp;
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  }
  changeNullData(): void {
    this.options = [];
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  }
  changeDataA(): void {
    this.options = this.dataA;
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  }
  changeDataB(): void {
    this.options = this.dataB;
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  }
}
