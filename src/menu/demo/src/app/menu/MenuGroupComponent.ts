import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';
@Component({
  templateUrl: './menu-group.html'
})
export class MenuGroupComponent {
  items: Array<TiMenuItem> = [
    {
      id: 'telnet',
      label: '远程登录'
    },
    {
      id: 'powerOn',
      label: '开机',
      groupId: 'action'
    },
    {
      id: 'powerOff',
      label: '关机',
      groupId: 'action'
    },
    {
      id: 'reboot',
      label: '重启',
      groupId: 'action'
    },
    {
      id: 'setting',
      label: '网络设置',
      children: [
        {
          id: 'modify',
          label: '更改安全组'
        },
        {
          id: 'toggle',
          label: '切换VPC'
        }
      ]
    }
  ];
}
