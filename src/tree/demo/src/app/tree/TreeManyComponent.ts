import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-many.html'
})
export class TreeManyComponent {
  innerData1: Array<TiTreeNode> = [
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

  // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
  selectedData1: Array<TiTreeNode> = TiTreeUtil.getSelectedData(this.innerData1, false, false);

  innerData2: Array<TiTreeNode> = [
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

  // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
  selectedData2: Array<TiTreeNode> = TiTreeUtil.getSelectedData(this.innerData2, false, false);

  onSelect1(event: TiTreeNode): void {
    console.log(event);
    // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
    this.selectedData1 = TiTreeUtil.getSelectedData(this.innerData1, false, false);
  }

  onSelect2(event: TiTreeNode): void {
    console.log(event);
    // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
    this.selectedData2 = TiTreeUtil.getSelectedData(this.innerData2, false, false);
  }
}
