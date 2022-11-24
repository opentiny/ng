import { Component } from '@angular/core';
import { TiFileItem } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-chunksize.html`,
})
export class UploadChunksizeComponent {
  myLogs: Array<string> = [];
  chunkSize: number = 1024 * 1024;
  onAddItemSuccess(fileItem: TiFileItem): void {
    this.myLogs = [...this.myLogs, `onAddItemSuccess() filename:${fileItem.file.name}`];
  }
  onAddItemFailed(fileItem: TiFileItem): void {
    this.myLogs = [...this.myLogs, `onAddItemFailed() filename:${fileItem.file.name}`];
  }
  onBeforeSendItems(fileItems: Array<TiFileItem>): void {
    this.myLogs = [...this.myLogs, `onBeforeSendItems()`];
    fileItems.forEach((item: TiFileItem) => {
      item.formData = {
        tinyFormdata: 'Custom data',
      };
    });
  }
  onProgressItems($event: any): void {
    this.myLogs = [...this.myLogs, `onProgressItems() progress:${$event.progress}`];
  }
  onSuccessItems($event: any): void {
    this.myLogs = [...this.myLogs, `onSuccessItems() response:${$event.response} status:${$event.status}`];
  }
  onErrorItems($event: any): void {
    this.myLogs = [...this.myLogs, `onErrorItems() response:${$event.response} status:${$event.status}`];
  }
  onCancelItems($event: any): void {
    this.myLogs = [...this.myLogs, `onCancelItems() response:${$event.response} status:${$event.status}`];
  }
  onRemoveItems($event: any): void {
    this.myLogs = [...this.myLogs, `onRemoveItems()`];
  }
  onBeforeRemoveItems(fileItemArry: Array<TiFileItem>): void {
    this.myLogs = [...this.myLogs, `onBeforeRemoveItems()`];
    fileItemArry[0].remove();
  }
  onCompleteItems($event: any): void {
    this.myLogs = [...this.myLogs, `onCompleteItems() response:${$event.response}`];
  }
  onCompleteAllItems($event: any): void {
    this.myLogs = [...this.myLogs, `onCompleteAllItems()`];
  }
}
