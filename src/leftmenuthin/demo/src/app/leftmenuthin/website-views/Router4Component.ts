import { Component } from '@angular/core';
import { RouterBaseWebsiteViewsComponent } from './RouterBaseComponent';
@Component({
  template: `
    <div>Welcome to {{ label }}页面!</div>
    <div *ngIf="queryParams !== '{}'">查询参数: {{ queryParams }}</div>
  `,
  selector: 'web-setting'
})
export class Router4WebsiteViewsComponent extends RouterBaseWebsiteViewsComponent {
  public label: string = 'setting';
}
