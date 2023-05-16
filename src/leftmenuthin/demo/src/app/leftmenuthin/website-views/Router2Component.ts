import { Component } from '@angular/core';
import { RouterBaseWebsiteViewsComponent } from './RouterBaseComponent';
@Component({
  template: `
    <div>Welcome to {{ label }} 页面!</div>
    跳转至<a href="javascript:void(0);" (click)="onClick()">routerE</a>(在当前路由的routerList中)
    <div *ngIf="queryParams !== '{}'">查询参数: {{ queryParams }}</div>
  `,
  selector: 'web-cart'
})
export class Router2WebsiteViewsComponent extends RouterBaseWebsiteViewsComponent {
  label: string = 'cart';
}
