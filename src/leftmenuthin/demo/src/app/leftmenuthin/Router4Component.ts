import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  template: `
    <div>Welcome to {{ label }}页面!</div>
    <div *ngIf="token !== '{}'">参数token: {{ token }}</div>
    <div *ngIf="queryParams !== '{}'">查询参数: {{ queryParams }}</div>
  `
})
export class Router4Component implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}
  label: string;
  token: string;
  queryParams: string;
  ngOnInit(): void {
    this.label = 'Setting';
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      this.token = JSON.stringify(paramMap.params);
    });

    // 直接获取queryParam
    this.activeRoute.queryParamMap.subscribe((res: any) => {
      this.queryParams = JSON.stringify(res.params);
    });
  }
}
