import { Component } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './tree-disabled.html'
})
export class TreeDisabledComponent {
  data: Array<TiTreeNode> = [
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
              disabled: true,
              children: [
                {
                  label: '海尔空调',
                  disabled: true
                },
                {
                  label: '美的空调'
                }
              ]
            }
          ]
        },
        {
          label: '生活电器',
          disabled: true,
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
    }
  ];
}
