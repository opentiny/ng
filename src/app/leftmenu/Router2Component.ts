import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    template:  `
      <h1>欢迎来到镜像服务页面</h1>
      <a routerLink="../routerC">点击跳转到帮助中心页面</a>
    `
})
export class Router2Component implements OnInit {
   constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('router2Test Init', this.activeRoute.routeConfig.path);
    // 这种是直接获取queryParam
    this.activeRoute.queryParams.subscribe(
      (res: any) => {
        console.log('queryParams', res);
      },
      (err: any) => {
        console.log('网络错误');
      }
    );
  }
}
