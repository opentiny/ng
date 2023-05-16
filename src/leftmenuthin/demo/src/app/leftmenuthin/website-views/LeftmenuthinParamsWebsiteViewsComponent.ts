import { Component } from '@angular/core';
import { TiLeftmenuthinItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenuthin-params-website-views.html',
  styleUrls: ['./router.less']
})
export class LeftmenuthinParamsWebsiteViewsComponent {
  items: Array<TiLeftmenuthinItem> = [
    {
      router: ['./home'],
      label: '主页',
      iconName: 'home',
      params: 'ddd',
      routerExtras: {
        queryParams: {
          local: 'zh-cn'
        }
      }
    },
    {
      router: ['./cart'],
      label: '购物车',
      iconName: 'cart',
      routerExtras: {
        queryParams: {
          local: 'zh-cn',
          size: 'large'
        }
      }
    },
    {
      router: ['./favorite'],
      label: '收藏',
      iconName: 'star',
      routerExtras: {
        queryParams: {
          size: 'middle',
          color: 'red'
        },
        fragment: 'top'
      }
    },
    {
      router: ['./setting'],
      label: '设置',
      iconName: 'settings',
      routerExtras: {
        queryParams: {
          local: 'en-us',
          color: 'red'
        },
        fragment: 'top'
      }
    }
  ];
  reloadState: boolean = true;
  active: TiLeftmenuthinItem = this.items[0];
  toJson(obj: Object): string {
    return JSON.stringify(obj);
  }
}
