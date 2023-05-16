import { Component } from '@angular/core';
import { TiLeftmenuthinItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenuthin-routerlist.html'
})
export class LeftmenuthinRouterlistComponent {
  public items: Array<TiLeftmenuthinItem> = [
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
  public reloadState: boolean = true;
  public active: TiLeftmenuthinItem = this.items[3];
  public myLogs: Array<string> = [];
  onSelect(event: any): void {
    this.myLogs = [...this.myLogs, JSON.stringify(event)];
  }
}
