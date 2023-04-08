import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-routerlist.html',
  styleUrls: ['./leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuRouterlistComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
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
      label: '携带多个路由',
      router: ['./router2'],
      routerList: [['routerC']]
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[1];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
