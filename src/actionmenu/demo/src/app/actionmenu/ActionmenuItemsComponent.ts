import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-items.html'
})
export class ActionmenuItemsComponent {
  labelKey: string = 'title';
  items: Array<TiActionmenuItem> = [
    {
      title: '启用',
      disabled: false,
      association: 'switch'
    },
    {
      title: '禁用',
      association: 'switch',
      disabled: true
    },
    {
      title: '制作镜像'
    },
    {
      title: '这是一个很长的选项只有云服务器处于关机状态才能执行该操作'
    },
    {
      title: '变更规格2',
      childrens: [
        {
          title: '只有云服务器处于关机状态，才能执行该操作',
          childrens: [
            {
              title: '制作镜像'
            },
            {
              title: '变更规格',
              disabled: true
            }
          ]
        },
        {
          title: '变更规格',
          disabled: true
        }
      ]
    },
    {
      title: '制作镜像2',
      disabled: true
    }
  ];
  maxWidth: string = '265px';
  panelMaxWidth: string = '230px';
  space: string = '20px';
  maxShowNum: number = 4;
  moreText: string = '更多操作';
  menuText: string = '操作项';
  maxWidth3: string = '500px';
  maxWidth4: string = '264px';
  maxWidth5: string = '50px';
  items25: Array<TiActionmenuItem> = [
    {
      title: '远程登录'
    },
    {
      title: '变更规格'
    }
  ];
  maxWidth25: string = '58px';
  maxWidth26: string = '116px';
  items6: Array<TiActionmenuItem> = [
    {
      title: '这是一个很长的选项只有云服务器处于关机状态才能执行该操作',
      disabled: true
    }
  ];
  items7: Array<TiActionmenuItem> = [
    {
      title: '远程登录'
    }
  ];
}
