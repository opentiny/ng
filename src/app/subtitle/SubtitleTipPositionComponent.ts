import { Component } from '@angular/core';

import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-tip-position.html'
})

export class SubtitleTipPositionComponent {
  items: Array<TiSubtitleItem> = [{
    id: '1',
    label: '购买弹性云服务器购买弹性云服务器购买弹性云服务器'
  }];
  items1: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: '购买弹性云服务器购买弹性云服务器购买弹性云服务器'
    },
    {
      id: '2',
      label: 'ECS-name-1'
    },
    {
      id: '3',
      label: '云服务器'
    }
  ];
}
