import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-toggleable-website-view.html',
  styleUrls: ['../leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftmenuToggleableWebsiteViewComponent {
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
          label: '子菜单1.2',
        },
      ],
    },
    {
      label: '菜单二',
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[0];
}
