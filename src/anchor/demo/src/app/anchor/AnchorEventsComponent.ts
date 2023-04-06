import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
  templateUrl: './anchor-events.html'
})
export class AnchorEventsComponent {
  myLogs: Array<string> = [];
  items: Array<TiAnchorItem> = [
    {
      id: 'events-1',
      title: '概览'
    },
    {
      id: 'events-2',
      title: 'Pod列表'
    },
    {
      id: 'events-3',
      title: '容器配置'
    },
    {
      id: 'events-4',
      title: '访问配置'
    },
    {
      id: 'events-5',
      title: '配置Pod'
    },
    {
      id: 'events-6',
      title: '事件'
    },
    {
      id: 'events-7',
      title: '历史版本'
    }
  ];

  onSelect(item: TiAnchorItem): void {
    this.myLogs = [...this.myLogs, `onSelect() item ${JSON.stringify(item)}`];
  }
}
