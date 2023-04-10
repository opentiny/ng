import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-dividing-website-view.html',
  styleUrls: ['../leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuDividingWebsiteViewComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  items: Array<TiLeftmenuItem> = [
    {
      label: '菜单一',
      showDividingLine: true,
      children: [
        {
          label: '子菜单1.1'
        },
        {
          label: '子菜单1.2'
        }
      ]
    },
    {
      label: '菜单二'
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[0];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
