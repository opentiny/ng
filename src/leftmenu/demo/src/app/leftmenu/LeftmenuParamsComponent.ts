import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-params.html',
  styleUrls: ['./leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuParamsComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
  items: Array<TiLeftmenuItem> = [
    {
      label: '菜单一',
      children: [
        {
          label: '子菜单1.1',
          router: ['router11']
        },
        {
          label: '子菜单1.2',
          router: ['router12']
        }
      ]
    },
    {
      label: '带参数路由',
      router: ['Routerparams', 1],
      routerExtras: {
        queryParams: {
          locale: 'zh-cn'
        },
        fragment: 'tiny'
      }
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[0];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
}
