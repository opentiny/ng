import { Component } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './tree-template.html'
})
export class TreeTemplateComponent {
  innerData: Array<TiTreeNode> = [
    {
      label: 'LIC',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: 'CBU安全',
          expanded: true,
          expandIcon: 'document',
          collapseIcon: 'file',
          checked: 'indeterminate',
          children: [
            {
              expandIcon: 'document',
              collapseIcon: 'file',
              label: 'SRE领域',
              expanded: true,
              checked: 'indeterminate',
              custom: true,
              children: [
                {
                  expandIcon: 'calendar',
                  label: '操作系统',
                  checked: true
                },
                {
                  expandIcon: 'calendar',
                  label: '网络'
                }
              ]
            },
            {
              expandIcon: 'calendar',
              label: '近6个小时'
            },
            {
              expandIcon: 'calendar',
              label: '近12个小时'
            },
            {
              expandIcon: 'calendar',
              label: '近1天'
            }
          ]
        },
        {
          label: '近3天',
          expandIcon: 'document',
          collapseIcon: 'file',
          children: [
            {
              expandIcon: 'calendar',
              label: 'ALM'
            },
            {
              expandIcon: 'calendar',
              label: 'MIC'
            }
          ]
        }
      ]
    }
  ];
}
