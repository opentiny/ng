import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-href-website-view.html',
  styleUrls: ['../leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftmenuHrefWebsiteViewComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  items: Array<TiLeftmenuItem> = [
    {
      label: '菜单一',
      children: [
        {
          label: '子菜单1.1',
        },
        {
          label: '首页',
          href: ''
        },
      ],
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
