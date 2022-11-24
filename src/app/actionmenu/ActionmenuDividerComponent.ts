import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-divider.html',
})
export class ActionmenuDividerComponent {
  showDivider: boolean = true;
  labelKey: string = 'title';
  panelMaxWidth: string = '230px';
  space: string = '20px';
  maxShowNum: number = 4;
  moreText: string = '更多操作';
  menuText: string = '操作项';
  items1: Array<TiActionmenuItem> = [
    {
      title: '启用',
      disabled: false,
      association: 'switch',
    },
    {
      title: '禁用',
      association: 'switch',
      disabled: true,
    },
    {
      title: '制作镜像',
    },
  ];
  items2: Array<TiActionmenuItem> = [
    {
      title: '启用',
      disabled: false,
      association: 'switch',
    },
  ];
  items3: Array<TiActionmenuItem> = [
    {
      title: '启用',
      disabled: false,
      association: 'switch',
    },
    {
      title: '禁用',
      association: 'switch',
      disabled: true,
    },
    {
      title: '制作镜像',
    },
  ];
  items4: Array<TiActionmenuItem> = [
    {
      title: '启用',
      disabled: false,
      association: 'switch',
    },
    {
      title: '禁用',
      association: 'switch',
      disabled: true,
    },
    {
      title: '制作镜像',
    },
    {
      title: '这是一个很长的选项只有云服务器处于关机状态才能执行该操作',
    },
    {
      title: '变更规格2',
      children: [
        {
          title: '制作镜像',
          label: '制作规格',
          children: [
            {
              title: '制作镜像',
              label: '规格1',
            },
            {
              title: '变更规格',
              label: '规格2',
              disabled: true,
            },
          ],
        },
        {
          title: '变更规格',
          label: '规格',
          disabled: true,
        },
      ],
    },
    {
      title: '制作镜像2',
      disabled: true,
    },
  ];
}
