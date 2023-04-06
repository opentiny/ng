import { Component } from '@angular/core';

import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-basic.html'
})
export class SubtitleBasicComponent {
  items1: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: 'item1 test 测试长标题  测试长标题 测试长标题'
    }
  ];

  items: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: 'item test 测试长标题   测试长标题 测试长标题'
    },
    {
      id: '2',
      label: '弹性云服务器'
    },
    {
      id: '3',
      label: '3'
    }
  ];

  clickFn(): void {
    this.items[0].label = '变更后的标题';
  }
}
