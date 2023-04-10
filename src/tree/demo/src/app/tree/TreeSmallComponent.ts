import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-small.html'
})
export class TreeSmallComponent {
  innerData: Array<TiTreeNode> = [
    {
      label: 'LIC',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: 'CBU安全',
          expanded: true,
          checked: 'indeterminate',
          children: [
            {
              label: 'SRE领域',
              expanded: true,
              checked: 'indeterminate',
              children: [
                {
                  label: '操作系统',
                  checked: true
                },
                {
                  label: '网络'
                }
              ]
            },
            {
              label: '近6个小时'
            },
            {
              label: '近12个小时'
            },
            {
              label: '近1天'
            }
          ]
        },
        {
          label: '近3天',
          children: [
            {
              label: 'ALM'
            },
            {
              label: 'MIC'
            }
          ]
        }
      ]
    }
  ];
}
