import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-group-website-view.html',
  styleUrls: ['../leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftmenuGroupWebsiteViewComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  items: Array<TiLeftmenuItem> = [
    {
      label: '分组一',
      isGroup: true,
      children: [{
        label: '菜单一',
        children: [
          {
            label: '子菜单1.1'
          },
          {
            label: '子菜单1.2'
          }
        ]
      }],
    },
    {
      label: '分组二',
      isGroup: true,
      children: [{
        label: '菜单二'
      }]
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[0];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
