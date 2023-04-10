import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
  templateUrl: './anchor-offsettop.html'
})
export class AnchorOffsettopComponent {
  offsetTop: number = 0;
  items: Array<TiAnchorItem> = [
    {
      id: 'offsettop-1',
      title: '概览'
    },
    {
      id: 'offsettop-2',
      title: 'Pod列表'
    },
    {
      id: 'offsettop-3',
      title: '容器配置'
    },
    {
      id: 'offsettop-4',
      title: '访问配置'
    },
    {
      id: 'offsettop-5',
      title: '配置Pod'
    },
    {
      id: 'offsettop-6',
      title: '事件'
    },
    {
      id: 'offsettop-7',
      title: '历史版本'
    }
  ];
}
