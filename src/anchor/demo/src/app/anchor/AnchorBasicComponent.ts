import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
  templateUrl: './anchor-basic.html'
})
export class AnchorBasicComponent {
  items: Array<TiAnchorItem> = [
    {
      id: 'basic-1',
      title: '概览'
    },
    {
      id: 'basic-2',
      title: 'Pod列表'
    },
    {
      id: 'basic-3',
      title: '容器配置'
    },
    {
      id: 'basic-4',
      title: '访问配置'
    },
    {
      id: 'basic-5',
      title: '配置Pod'
    },
    {
      id: 'basic-6',
      title: '事件'
    },
    {
      id: 'basic-7',
      title: '历史版本'
    }
  ];
}
