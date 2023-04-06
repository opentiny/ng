import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './menu-event.html'
})
export class MenuEventComponent {
  myLogs: Array<string> = [];
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

  onSelect(item: any): void {
    this.myLogs = [...this.myLogs, `onSelect() event = ${JSON.stringify(item)}`];
  }
}
