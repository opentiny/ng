import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';
@Component({
  templateUrl: './menu-border.html'
})
export class MenuBorderComponent {
  disabled: boolean = false;
  panelAlign: string = 'left';
  options: Array<TiMenuItem> = [
    {
      label: '一级菜单',
      tip: '远程登录',
      tipPosition: 'right',
      click(): void {
        console.log(this.label + 'clicked');
      }
    },
    {
      label: '变更规格',
      disabled: true
    },
    {
      label: '制作镜像',
      tip: '远程登录',
      tipPosition: 'left'
    },
    {
      label: '云服务器这是一个很长的选项只有云服务器处于关机状态才能执行该操作'
    },
    {
      label: '规格'
    },
    {
      label: '镜像',
      disabled: true
    }
  ];

  onSelect(item: TiMenuItem): void {
    if (typeof item.click === 'function') {
      item.click();

      return;
    }
    console.log(item);
  }

  changeDisabled(): void {
    this.disabled = !this.disabled;
  }

  changePanelAlign(): void {
    this.panelAlign = 'right';
  }
}
