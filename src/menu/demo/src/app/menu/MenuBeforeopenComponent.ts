import { Component } from '@angular/core';
import { TiMenuComponent, TiMenuItem } from '@opentiny/ng';
@Component({
  templateUrl: './menu-beforeopen.html'
})
export class MenuBeforeopenComponent {
  items: Array<TiMenuItem> = [];
  onBeforeOpen(menucomp: TiMenuComponent): void {
    setTimeout(() => {
      // 模拟一秒后才获取到菜单数据
      this.items = [
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
      menucomp.open();
    }, 1000);
  }
}
