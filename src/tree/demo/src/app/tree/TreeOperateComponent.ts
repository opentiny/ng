import { Component } from '@angular/core';
import { TiTreeNode } from '@opentiny/ng';
@Component({
  templateUrl: './tree-operate.html'
})
export class TreeOperateComponent {
  myLogs: Array<string> = [];
  innerData: Array<TiTreeNode> = [
    {
      label: 'LIC',
      expanded: true,
      checked: 'indeterminate',
      addable: true,
      editable: true,
      deleteable: true,
      children: [
        {
          label: 'CBU安全',
          expanded: true,
          checked: 'indeterminate',
          addable: true,
          editable: true,
          deleteable: true,
          children: [
            {
              label: 'SRE领域',
              expanded: true,
              checked: 'indeterminate',
              custom: true,
              addable: true,
              editable: true,
              deleteable: true,
              children: [
                {
                  label: '操作系统',
                  checked: true,
                  addable: true
                },
                {
                  label: '网络',
                  deleteable: true,
                  addable: true
                }
              ]
            },
            {
              label: '近6个小时',
              disabled: true
            },
            {
              label: '近12个小时',
              addable: true,
              editable: true,
              deleteable: true
            },
            {
              label: '近1天',
              disabled: true,
              addable: true,
              editable: true,
              deleteable: true
            }
          ]
        },
        {
          label: '近3天',
          addable: true,
          editable: true,
          deleteable: true,
          children: [
            {
              label: 'ALM',
              editable: true,
              deleteable: true
            },
            {
              label: 'MIC',
              editable: true,
              deleteable: true
            }
          ]
        }
      ]
    }
  ];
  nodeAddFn(node: TiTreeNode): void {
    node.addable = true;
    node.editable = true;
    node.deleteable = true;
    this.myLogs = [...this.myLogs, `add nodeName = ${node.label}`];
  }

  nodeEditFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `edit nodeName = ${node.label}`];
  }

  nodeDeleteFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `delete nodeName = ${node.label}`];
  }

  // 编辑节点之后的回调
  afterNodeEditFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `afterNodeEdit nodeName = ${node.label}`];
  }

  // 添加节点之后的回调
  afterNodeAddFn(node: TiTreeNode): void {
    this.myLogs = [...this.myLogs, `afterNodeAdd nodeName = ${node.label}`];
  }
}
