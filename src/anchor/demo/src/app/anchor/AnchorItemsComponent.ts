import { Component, ChangeDetectorRef } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
  templateUrl: './anchor-items.html',
  styleUrls: ['./anchortest.less']
})
export class AnchorItemsComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  items: Array<TiAnchorItem> = [];
  items1: Array<TiAnchorItem> = [
    {
      id: 'id1',
      title: '概览'
    },
    {
      id: 'id2',
      title: 'Pod列表'
    },
    {
      id: 'id3',
      title: '容器配置'
    }
  ];
  ngOnInit(): void {
    // 模拟数据更新
    setTimeout(() => {
      this.items = this.items1;
      // onpush模式使用setTimeout需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
    }, 2000);
  }
}
