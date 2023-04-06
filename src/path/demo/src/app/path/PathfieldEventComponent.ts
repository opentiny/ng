import { Component } from '@angular/core';
import { TiPathChangeEvent, TiPathFieldItem } from '@opentiny/ng';

@Component({
  templateUrl: './pathfield-event.html'
})
export class PathfieldEventComponent {
  items: Array<TiPathFieldItem> = [
    {
      label: 'window'
    },
    {
      label: 'document'
    },
    {
      label: 'body'
    },
    {
      label: 'container'
    },
    {
      label: 'content'
    }
  ];
  myLogs: Array<string> = [];
  pathChange(event: TiPathChangeEvent | Event): void {
    this.myLogs = [...this.myLogs, `pathchage => ${JSON.stringify(event)}`];
  }
}
