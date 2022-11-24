import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';
@Component({
    templateUrl: './menu-buttoncolor.html'
})
export class MenuButtoncolorComponent {
    items: Array<TiMenuItem> = [
        {
          id: 'telnet',
          label: '远程登录'
        },
        {
          id: 'powerOn',
          label: '开机'
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
