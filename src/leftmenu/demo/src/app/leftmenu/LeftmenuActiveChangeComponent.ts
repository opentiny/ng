import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-active-change.html',
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuActiveChangeComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  myLogs: Array<string> = [];
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

  activeChange(event: TiLeftmenuItem): void {
    this.myLogs = [...this.myLogs, `activeChange() event=${event}`];
  }
}
