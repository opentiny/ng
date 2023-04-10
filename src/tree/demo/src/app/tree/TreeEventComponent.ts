import { Component } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';
@Component({
  templateUrl: './tree-event.html'
})
export class TreeEventComponent {
  myLogs: Array<string> = [];
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
              custom: true,
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

  selectFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `select nodeName= ${node.label}`];
  }

  changeFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `change nodeName= ${node.label}`];
  }

  expandFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `expand nodeName= ${node.label}`];
  }
  collapseFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `collapse nodeName= ${node.label}`];
  }
}
