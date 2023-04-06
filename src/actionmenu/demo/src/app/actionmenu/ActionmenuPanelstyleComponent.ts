import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-panelstyle.html'
})
export class ActionmenuPanelstyleComponent {
  items: Array<TiActionmenuItem> = [
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
      id: 'renew',
      label: '续费'
    },
    {
      id: 'reset',
      label: '重置'
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
