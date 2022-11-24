import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';
import { TiNavMenuItem } from '@opentiny/ng/components/nav/interface';

@Component({
  templateUrl: './nav-basic.html',
})
export class NavBasicComponent {
  items: TiNavMenuItem[] = [
    { id: '1', label: '首页' },
    { id: '2', label: '文档' },
    { id: '3', label: '组件' },
    { id: '4', label: '关于' },
  ];
}
