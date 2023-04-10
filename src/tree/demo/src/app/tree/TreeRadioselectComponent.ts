import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-radioselect.html'
})
export class TreeRadioselectComponent {
  innerData: Array<TiTreeNode> = [
    {
      label: '家用电器',
      children: [
        {
          label: '大家电',
          children: [
            {
              label: '空调',
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
              label: '冰箱'
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
      checked: 'indeterminate',
      expanded: true,
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

  // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
  selectedData: Array<TiTreeNode> = TiTreeUtil.getSelectedData(this.innerData, false, false);

  onSelect(event: TiTreeNode): void {
    // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
    this.selectedData = TiTreeUtil.getSelectedData(this.innerData, false, false);
  }
}
