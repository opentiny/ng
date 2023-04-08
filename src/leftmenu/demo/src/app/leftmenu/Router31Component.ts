import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <h1>子菜单 3.1 的内容</h1>
    <a routerLink="../routerD">点击跳转到使用指南页面</a>
  `
})
export class Router31Component implements OnInit {
  token: string;
  queryParams: string;
  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    console.log('router31Test Init');

    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      this.token = JSON.stringify(paramMap.params);
    });

    // 这种是直接获取queryParam
    this.activeRoute.queryParamMap.subscribe((res: any) => {
      this.queryParams = JSON.stringify(res.params);
    });
  }
}
