import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-disabled.html',
})
export class ActionmenuDisabledComponent {
  disabled: boolean = true;
  items: Array<TiActionmenuItem> = [
    {
      id: 'telnet',
      label: '远程登录',
    },
    {
      id: 'powerOn',
      label: '开机',
      disabled: true,
    },
    {
      id: 'powerOff',
      label: '关机',
    },
    {
      id: 'reboot',
      label: '重启',
    },
    {
      id: 'setting',
      label: '网络设置',
      disabled: true,
      children: [
        {
          id: 'modify',
          label: '更改安全组',
        },
        {
          id: 'toggle',
          label: '切换VPC',
        },
      ],
    },
  ];
}
