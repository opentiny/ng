import { Component } from '@angular/core';
import { TiTreeDragNode, TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './tree-drag.html'
})
export class TreeDragComponent {
  myLogs: Array<string> = [];
  innerData: Array<TiTreeNode> = [
    {
      label: '家用电器',
      key: '0-1',
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
                  label: '海尔空调'
                },
                {
                  label: '美的空调',
                  disabled: true
                }
              ]
            },
            {
              label: '冰箱'
            },
            {
              label: '洗衣机'
            },
            {
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
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
    },
    {
      label: '服饰',
      expanded: true,
      children: [
        {
          label: '男装',
          key: '0-2-1'
        },
        {
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      children: [
        {
          label: '面部护理'
        },
        {
          label: '口腔护理'
        }
      ]
    }
  ];
  onDrop(event: TiTreeDragNode): void {
    this.myLogs = [...this.myLogs, `nodeDrop nodeName = ${event.dragNode.label} =>${event.targetNode.label}`];
  }
}
