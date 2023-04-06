import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-active-change-website-view.html',
  styleUrls: ['../leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuActiveChangeWebsiteViewComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  myLogs: Array<string> = [];
  items: Array<TiLeftmenuItem> = [
    {
      label: '菜单一',
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

  itemClickHandle(event: TiLeftmenuItem): void {
    this.myLogs = [...this.myLogs, `itemClickHandle() event=${JSON.stringify(event)}`];
  }
}
