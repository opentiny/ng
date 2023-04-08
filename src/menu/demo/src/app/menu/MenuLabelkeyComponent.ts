import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './menu-labelkey.html'
})
export class MenuLabelkeyComponent {
  items: Array<TiMenuItem> = [
    {
      id: 'telnet',
      title: '远程登录'
    },
    {
      id: 'powerOn',
      title: '开机'
    },
    {
      id: 'powerOff',
      title: '关机'
    },
    {
      id: 'reboot',
      title: '重启'
    },
    {
      id: 'setting',
      title: '网络设置',
      children: [
        {
          id: 'modify',
          title: '更改安全组'
        },
        {
          id: 'toggle',
          title: '切换VPC'
        }
      ]
    }
  ];
}
