import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';
@Component({
  templateUrl: './menu-disabled.html'
})
export class MenuDisabledComponent {
  disabled: boolean = true;
  items: Array<TiMenuItem> = [
    {
      id: 'telnet',
      label: '远程登录'
    },
    {
      id: 'powerOn',
      label: '开机',
      disabled: true
    },
    {
      id: 'powerOff',
      label: '关机'
    },
    {
      id: 'reboot',
      label: '重启'
    },
    {
      id: 'setting',
      label: '网络设置',
      children: [
        {
          id: 'modify',
          label: '更改安全组',
          disabled: true
        },
        {
          id: 'toggle',
          label: '切换VPC'
        }
      ]
    }
  ];
}
