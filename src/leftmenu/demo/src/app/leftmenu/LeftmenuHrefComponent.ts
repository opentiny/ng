import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-href.html',
  styleUrls: ['./leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuHrefComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  toggleable: boolean = true;
  items: Array<TiLeftmenuItem> = [
    {
      label: '菜单一',
      children: [
        {
          label: '子菜单1.1',
          router: ['./router11']
        },
        {
          label: '首页',
          href: ''
        }
      ]
    },
    {
      label: '地图',
      href: ''
    }
  ];
  active: TiLeftmenuItem = this.items[0].children[0];
  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
