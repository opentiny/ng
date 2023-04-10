import { Component } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';
@Component({
  templateUrl: './tree-check-relation.html'
})
export class TreeCheckRelationComponent {
  multiple: boolean = true;
  checkRelation: boolean = false;
  innerData: Array<TiTreeNode> = [
    {
      label: 'LIC',
      expanded: true,
      children: [
        {
          label: 'CBU安全',
          expanded: true,
          children: [
            {
              label: 'SRE领域',
              expanded: true,
              children: [
                {
                  label: '操作系统'
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
