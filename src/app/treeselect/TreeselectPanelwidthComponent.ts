import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-panelwidth.html',
})
export class TreeselectPanelwidthComponent {
  options: Array<TiTreeNode> = [
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
                  label: '海尔空调 （1.5匹 静悦 新一级 变频省电 冷暖 卧室挂式空调挂机 大风口）',
                },
                {
                  label: '美的空调 （新一级 极光先锋 大1.5匹 智能家电 变频冷暖 壁挂式空调挂机 一键智控温 K 1.5）',
                },
              ],
            },
            {
              label: '冰箱',
              disabled: false,
            },
            {
              label: '洗衣机',
            },
            {
              label: '热水器',
            },
          ],
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器',
            },
            {
              label: '电熨斗',
            },
          ],
        },
      ],
    },
    {
      label: '服饰',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '男装',
          checked: true,
        },
        {
          label: '女装',
        },
      ],
    },
    {
      label: '化妆',
      children: [
        {
          label: '面部护理',
        },
        {
          label: '口腔护理',
        },
      ],
    },
  ];

  // 当前选中项
  value: TiTreeNode = TiTreeUtil.getSelectedData(this.options, true, false);
}
