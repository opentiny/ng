import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';
import { CascaderData } from './CascaderData';

@Component({
  templateUrl: './cascader-events.html'
})

export class CascaderEventsComponent {
  items: Array<TiCascaderItem> = CascaderData;
  selected: Array<TiCascaderItem> = [];
  selected1: Array<TiCascaderItem> = [];

  myLogs: Array<string> = [];
  onClear(): void {
    this.myLogs = [...this.myLogs, '已清除'];
  }

  ngModelChange(item): void {
    this.myLogs = [...this.myLogs, `ngModelChange：${JSON.stringify(item)}`];
  }
}
