import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  template: `
    <div style="color: red">Welcome to router B!</div>
    <a routerLink="../routerA">go to routerA(in router32 routerList)</a>
  `
})
export class RouterBComponent implements OnInit {
  label: string;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('RouterBComponent Init', this.activeRoute.routeConfig.path);
  }
}
