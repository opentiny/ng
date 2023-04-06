import { Component } from '@angular/core';
import { TiLink } from '@opentiny/ng';

@Component({
  templateUrl: './crumb-events.html'
})
export class CrumbEventsComponent {
  myLogs: Array<string> = [];
  items: Array<TiLink> = [
    {
      label: '服装'
    },
    {
      label: '女装'
    },
    {
      label: '裙子'
    },
    {
      label: '连衣裙'
    },
    {
      label: '复古'
    }
  ];

  onSelect(item: TiLink): void {
    this.myLogs = [...this.myLogs, `onSelect() item = ${JSON.stringify(item)}`];
  }
}
