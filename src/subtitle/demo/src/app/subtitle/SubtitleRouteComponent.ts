import { Component } from '@angular/core';

import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-route.html'
})
export class SubtitleRouteComponent {
  public items1: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: '弹性云服务器'
    }
  ];

  routerLink = ['./../subtitle-event'];
  // 参数传递
  queryParams = { name: 'route' };
}
