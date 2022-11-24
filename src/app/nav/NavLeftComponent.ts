import { Component } from '@angular/core';
import { TiNavMenuItem } from '@opentiny/ng/components/nav/interface';

@Component({
  templateUrl: './nav-left.html',
})
export class NavLeftComponent {
  baseUrl: string = window["DEPLOY_URL"] + window["PUBLIC_URL"];
  logoUrl: string =  `${this.baseUrl}assets/nav_logo/logo.png`;
  items: TiNavMenuItem[] = [
    { id: '1', label: '首页' },
    { id: '2', label: '文档' },
    { id: '3', label: '组件' },
    { id: '4', label: '关于' },
  ];
}
