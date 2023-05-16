import { Component } from '@angular/core';
import { TiLeftmenuthinItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenuthin-routerlist-website-views.html',
  styleUrls: ['./router.less']
})
export class LeftmenuthinRouterlistWebsiteViewsComponent {
  items: Array<TiLeftmenuthinItem> = [
    {
      router: ['./home'],
      label: '主页',
      iconName: 'home'
    },
    {
      router: ['./cart'],
      label: '购物车',
      iconName: 'cart',
      routerList: [['routerE']]
    },
    {
      router: ['./favorite'],
      label: '收藏',
      iconName: 'star',
      routerList: [['routerF']]
    },
    {
      router: ['./setting'],
      label: '设置',
      iconName: 'settings'
    }
  ];
  reloadState: boolean = true;
  active: TiLeftmenuthinItem = this.items[1];
  childRouter: boolean = false;
  onSelect(event: TiLeftmenuthinItem) {
    this.childRouter = false;
  }
  childChange() {
    this.childRouter = true;
  }
}
