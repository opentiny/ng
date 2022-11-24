
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    template:  `
      <h1>欢迎来到帮助中心页面</h1>
    `
})
export class RouterCComponent implements OnInit {
   constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('RouterCComponent Init', this.activeRoute.routeConfig.path);
  }
}