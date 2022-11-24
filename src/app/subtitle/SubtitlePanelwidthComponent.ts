import { Component } from '@angular/core';

import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-panelwidth.html'
})

export class SubtitlePanelwidthComponent {
  items: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: '购买弹性云服务器'
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
