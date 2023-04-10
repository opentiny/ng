import { Component } from '@angular/core';

@Component({
  templateUrl: './actionmenu-focus.html'
})
export class ActionmenuFocusComponent {
  items: Array<any> = [
    {
      label: '启用',
      disabled: true,
      association: 'switch'
    },
    {
      label: '禁用',
      association: 'switch',
      disabled: true
    },
    {
      label: '制作镜像',
      tip: '只有云服务器处于关机状态，才能执行该操作'
    },
    {
      label: '这是一个很长的选项，只有云服务器处于关机状态，才能执行该操作',
      tip: 'this is a tip'
    },
    {
      label: '变更规格2',
      tip: 'welcome tip',
      children: [
        {
          label: '制作镜像',
          tip: '只有云服务器处于关机状态，才能执行该操作',
          children: [
            {
              label: '制作镜像',
              tip: '只有云服务器处于关机状态，才能执行该操作'
            },
            {
              label: '变更规格',
              disabled: true
            }
          ]
        },
        {
          label: '变更规格',
          disabled: true
        }
      ]
    },
    {
      label: '制作镜像2',
      tip: '只有云服务器处于关机状态，才能执行该操作',
      disabled: true
    }
  ];

  onSelect(item: any): void {
    console.log('onSelect()');
    console.log(item);
  }
}
