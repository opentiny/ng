import { Component } from '@angular/core';
import { TiFilter } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-filter.html`
})
export class UploadFilterComponent {
  filters: Array<TiFilter> = [
    {
      name: 'type',
      params: ['.png,.img']
    },
    {
      name: 'maxSize',
      params: [102400]
    },
    {
      name: 'maxCount',
      params: [2]
    }
  ];
  myLogs: Array<string> = [];
  onAddItemFailed(event: any): void {
    this.myLogs = [...this.myLogs, `errorType:${event.validResults.toString()}----filename:${event.file.name}`];
  }
  onAddItemSuccess(event: any): void {
    this.myLogs = [...this.myLogs, `success----filename:${event.file.name}`];
  }
}
