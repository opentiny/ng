import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-routerlist-website-view.html',
  styleUrls: ['../leftmenuTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuRouterlistWebsiteViewComponent {
  marginLeft: string = '200px';
  reloadState: boolean = true;
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
      label: '携带多个路由'
    }
  ];
  showD: boolean = false;
  active: TiLeftmenuItem = this.items[0].children[0];

  toggleClick(isHide: boolean): void {
    this.marginLeft = isHide ? '0' : '200px';
  }
  linkToD(): void {
    this.showD = true;
  }
  clickLevel2(m2: any): void {
    if (m2 !== this.items[1]) {
      this.showD = false;
    }
  }
}
