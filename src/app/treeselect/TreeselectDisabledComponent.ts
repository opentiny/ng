import { Component } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-disabled.html',
})
export class TreeselectDisabledComponent {
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
              children: [
                {
                  label: '海尔空调',
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  value: TiTreeNode = [];
  myOptions: Array<TiTreeNode> = JSON.parse(JSON.stringify(this.options));
  myValue: TiTreeNode = JSON.parse(JSON.stringify(this.value));
}
