import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    template:  `
      <h1>欢迎来到伸缩带宽页面</h1>
    `
})
export class Router32Component implements OnInit {
  label: string;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('router32Test Init', this.activeRoute.routeConfig.path);
    this.label = 'init';

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

  clickFn(): void {
    this.label = `${this.label}xxxx`;
  }
}
