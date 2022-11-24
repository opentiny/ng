import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-group.html',
  styleUrls: ['./leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuGroupComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  items: Array<TiLeftmenuItem> = [
    {
      label: '分组一',
      isGroup: true,
      children: [{
        label: '菜单一',
        children: [{
          label: '子菜单1.1',
          router: ['./router11']
        }]
      }, {
        label: '子菜单1.2',
        router: ['./router12']
      }]
    }, {
      label: '分组二',
      isGroup: true,
      children: [{
        label: '菜单二',
        router: ['router2']
      }]
    }
  ];

  active: TiLeftmenuItem = this.items[1].children[0];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
