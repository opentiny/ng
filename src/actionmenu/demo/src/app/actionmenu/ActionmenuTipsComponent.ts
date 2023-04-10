import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-tips.html'
})
export class ActionmenuTipsComponent {
  items: Array<TiActionmenuItem> = [
    {
      id: 'telnet',
      label: '远程登录'
    },
    {
      id: 'powerOn',
      label: '开机',
      disabled: true,
      tip: '已冻结，不能执行此操作。请联系客服。',
      tipPosition: 'top'
    },
    {
      id: 'powerOff',
      label: '关机'
    },
    {
      id: 'reboot',
      label: '重启',
      tip: '重新启动服务器。',
      tipPosition: 'right'
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
