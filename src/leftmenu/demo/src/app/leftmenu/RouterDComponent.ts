import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  template: ` <h1>欢迎来到使用指南页面</h1> `
})
export class RouterDComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('RouterDComponent Init RouterDComponentRouterDComponent', this.activeRoute.routeConfig.path);
  }
}
