import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-event.html',
})
export class TreeselectEventComponent {
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
                  label: '海尔空调',
                },
                {
                  label: '美的空调',
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

  value: Array<TiTreeNode> = TiTreeUtil.getSelectedData(this.options, true, false);

  myLogs: Array<string> = [];

  onSelect(event: any): void {
    this.myLogs = [...this.myLogs, `onSelect() event=${JSON.stringify(event)}`];
  }
}
