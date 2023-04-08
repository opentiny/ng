import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-reload-state.html',
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuReloadStateComponent {
  marginLeft: string = '200px';
  items: Array<TiLeftmenuItem> = [
    {
      label: '菜单一',
      children: [
        {
          label: '子菜单1.1',
          router: ['./router11']
        },
        {
          label: '子菜单1.2',
          router: ['./router12']
        }
      ]
    },
    {
      label: '菜单二',
      router: ['router2']
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[0];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
