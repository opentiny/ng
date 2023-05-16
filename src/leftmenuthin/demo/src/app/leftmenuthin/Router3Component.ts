import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div>Welcome to {{ label }}页面!</div>
    跳转至<a routerLink="../routerF">routerF</a>(在当前路由的routerList中)
    <div *ngIf="token !== '{}'">参数token: {{ token }}</div>
    <div *ngIf="queryParams !== '{}'">查询参数: {{ queryParams }}</div>
  `
})
export class Router3Component implements OnInit {
  public label: string;
  public token: string;
  public queryParams: string;
  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.label = 'Star';
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      this.token = JSON.stringify(paramMap.params);
    });

    // 直接获取queryParam
    this.activeRoute.queryParamMap.subscribe((res: any) => {
      this.queryParams = JSON.stringify(res.params);
    });
  }
}
