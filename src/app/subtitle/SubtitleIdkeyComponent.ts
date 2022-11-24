import { Component } from '@angular/core';

import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-idkey.html'
})

export class SubtitleIdkeyComponent {
  items: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: '购买弹性云服务器'
    },
    {
      id: '2',
      label: '弹性云服务器'
    },
    {
      id: '3',
      label: '云服务器'
    },
    {
      id: '4',
      label: '弹性云服务器'
    }
  ];
}
