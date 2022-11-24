import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-labelkey.html',
})
export class ActionmenuLabelkeyComponent {
  items: Array<TiActionmenuItem> = [
    {
      id: 'telnet',
      title: '远程登录',
    },
    {
      id: 'powerOn',
      title: '开机',
    },
    {
      id: 'powerOff',
      title: '关机',
    },
    {
      id: 'reboot',
      title: '重启',
    },
    {
      id: 'setting',
      title: '网络设置',
      children: [
        {
          id: 'modify',
          title: '更改安全组',
        },
        {
          id: 'toggle',
          title: '切换VPC',
        },
      ],
    },
  ];
}
