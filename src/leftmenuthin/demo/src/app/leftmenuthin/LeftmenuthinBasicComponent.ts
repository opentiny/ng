import { Component } from '@angular/core';
import { TiLeftmenuthinItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenuthin-basic.html'
})
export class LeftmenuthinBasicComponent {
  myLogs: Array<any> = [];
  items: Array<TiLeftmenuthinItem> = [
    {
      router: ['./home'],
      label: '主页',
      iconName: 'home'
    },
    {
      router: ['./cart'],
      label: '购物车',
      iconName: 'cart'
    },
    {
      router: ['./favorite'],
      label: '收藏',
      iconName: 'star'
    },
    {
      router: ['./setting'],
      label: '设置',
      iconName: 'settings'
    }
  ];
  reloadState: boolean = true;
  active: TiLeftmenuthinItem = this.items[2];
  onSelect(event: any): void {
    this.myLogs = [...this.myLogs, `select => ${JSON.stringify(event)}`];
  }
  onActiveChange(event: any): void {
    this.myLogs = [...this.myLogs, `activeChange => ${JSON.stringify(event)}`];
  }
  onReloadStateChange(event: any) {
    this.myLogs = [...this.myLogs, `reloadStateChange => ${JSON.stringify(event)}`];
  }
}
