import { Component, ViewEncapsulation } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './tree-icon.html', // 指定组件模板
  encapsulation: ViewEncapsulation.None
})
export class TreeIconComponent {
  data: Array<TiTreeNode> = [
    {
      label: 'asdasdAAA',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '大家电',
          expanded: true,
          expandIcon: 'ti3-icon ti3-icon-document',
          collapseIcon: 'ti3-icon ti3-icon-file',
          checked: 'indeterminate',
          children: [
            {
              expandIcon: 'ti3-icon ti3-icon-document',
              collapseIcon: 'ti3-icon ti3-icon-file',
              label: '空调',
              expanded: true,
              checked: 'indeterminate',
              children: [
                {
                  expandIcon: 'ti3-icon ti3-icon-calendar',
                  label: '海尔空调',
                  checked: true
                },
                {
                  expandIcon: 'ti3-icon ti3-icon-calendar',
                  label: '美的空调'
                }
              ]
            },
            {
              expandIcon: 'ti3-icon ti3-icon-calendar',
              label: '冰箱'
            },
            {
              expandIcon: 'ti3-icon ti3-icon-calendar',
              label: '洗衣机'
            },
            {
              expandIcon: 'ti3-icon ti3-icon-calendar',
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
          expandIcon: 'ti3-icon ti3-icon-document',
          collapseIcon: 'ti3-icon ti3-icon-file',
          children: [
            {
              expandIcon: 'ti3-icon ti3-icon-calendar',
              label: '加湿器'
            },
            {
              expandIcon: 'ti3-icon ti3-icon-calendar',
              label: '电熨斗'
            }
          ]
        }
      ]
    },
    {
      label: '服饰',
      expandIcon: 'ti3-icon ti3-icon-document',
      collapseIcon: 'ti3-icon ti3-icon-file',
      children: [
        {
          expandIcon: 'ti3-icon ti3-icon-calendar',
          label: '男装'
        },
        {
          expandIcon: 'ti3-icon ti3-icon-calendar',
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      expandIcon: 'ti3-icon ti3-icon-document',
      collapseIcon: 'ti3-icon ti3-icon-file',
      expanded: true,
      checked: true,
      children: [
        {
          expandIcon: 'ti3-icon ti3-icon-calendar',
          label: '面部护理面部护理',
          checked: true
        },
        {
          expandIcon: 'ti3-icon ti3-icon-calendar',
          label: '口腔护理',
          checked: true
        }
      ]
    }
  ];
}
