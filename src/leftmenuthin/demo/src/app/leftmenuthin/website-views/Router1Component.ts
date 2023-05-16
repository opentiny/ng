import { Component } from '@angular/core';
import { RouterBaseWebsiteViewsComponent } from './RouterBaseComponent';

@Component({
  template: `
    <div>Welcome to {{ label }}页面!</div>
    <div *ngIf="queryParams !== '{}'">查询参数: {{ queryParams }}</div>
  `,
  selector: 'web-home'
})
export class Router1WebsiteViewsComponent extends RouterBaseWebsiteViewsComponent {
  label: string = 'home';
}
