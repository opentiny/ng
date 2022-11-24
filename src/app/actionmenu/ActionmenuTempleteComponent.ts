import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-templete.html',
})
export class ActionmenuTempleteComponent {
  items: Array<TiActionmenuItem> = [
    {
      id: 'telnet',
      label: '远程登录',
      tipPosition: 'top',
    },
    {
      id: 'powerOn',
      label: '开机',
      tipPosition: 'top',
    },
    {
      id: 'refresh',
      label: '刷新',
      iconName: 'refresh',
      tipIconName: 'warn',
      customTip: '确定要刷新吗？',
      tipPosition: 'left',
    },
    {
      id: 'delete',
      label: '删除',
      iconName: 'delete-1',
      tipIconName: 'warn',
      customTip: '确定要删除吗？',
      tipPosition: 'left',
    },
  ];
}
