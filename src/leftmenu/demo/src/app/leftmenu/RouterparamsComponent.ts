import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <p>参数: {{ token }}</p>
    <p>参数: {{ queryParams }}</p>
    <p>参数：{{ fragment }}</p>
  `
})
export class RouterparamsComponent implements OnInit {
  token: string;
  queryParams: string;
  fragment: string;
  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      this.token = JSON.stringify(paramMap.params);
    });
    this.activeRoute.queryParamMap.subscribe((res: any) => {
      this.queryParams = JSON.stringify(res.params);
    });
    this.activeRoute.fragment.subscribe((res: any) => {
      this.fragment = JSON.stringify(res);
    });
  }
}
