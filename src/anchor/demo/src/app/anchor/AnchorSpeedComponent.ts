import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
  templateUrl: './anchor-speed.html'
})
export class AnchorSpeedComponent {
  speed: number = 100;
  items: Array<TiAnchorItem> = [
    {
      id: 'speed-1',
      title: '概览'
    },
    {
      id: 'speed-2',
      title: 'Pod列表'
    },
    {
      id: 'speed-3',
      title: '容器配置'
    },
    {
      id: 'speed-4',
      title: '访问配置'
    },
    {
      id: 'speed-5',
      title: '配置Pod'
    },
    {
      id: 'speed-6',
      title: '事件'
    },
    {
      id: 'speed-7',
      title: '历史版本'
    }
  ];
}
