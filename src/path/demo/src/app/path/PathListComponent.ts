import { Component } from '@angular/core';
import { TiPathListItem } from '@opentiny/ng';

@Component({
  templateUrl: './path-list.html'
})
export class PathListComponent {
  items: Array<TiPathListItem> = [
    {
      label: 'type = "file"',
      type: 'file'
    },
    {
      label: 'type = "document"',
      type: 'document'
    }
  ];
  items1: Array<TiPathListItem> = [
    {
      label: 'clearable-1',
      type: 'file'
    },
    {
      label: 'clearable-2',
      type: 'file'
    }
  ];
  myLogs: Array<string> = [];
  clear(item: TiPathListItem): void {
    this.myLogs = [...this.myLogs, `${JSON.stringify(item)}`];
  }
}
