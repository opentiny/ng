import { Component } from '@angular/core';

import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-event.html'
})
export class SubtitleEventComponent {
  myLogs: Array<string> = [];

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

  selected: TiSubtitleItem = this.items[1];

  onBack($event: Event): void {
    $event.preventDefault();
    this.myLogs = [...this.myLogs, `onBack() event`];
  }
  onChange(item: TiSubtitleItem): void {
    this.myLogs = [...this.myLogs, `selected change event: ${JSON.stringify(item)}`];
  }
}
