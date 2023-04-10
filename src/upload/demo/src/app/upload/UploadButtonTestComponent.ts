import { Component } from '@angular/core';
import { TiFileItem, TiFilter } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-button-test.html`
})
export class UploadButtonTestComponent {
  type: string = 'button';
  disabled: boolean = true;
  url: string = '/upload';
  autoUpload: boolean = false;
  batchSend: boolean = true;
  method: string = 'get';
  alias: string = 'tiFileRename';
  formDataFirst: boolean = true;
  headers: any = {
    tiheadersConfig: 'aa'
  };
  formData: any = {};
  filters: Array<TiFilter> = [
    {
      name: 'maxCount',
      params: [5]
    }
  ];
  onAddItemSuccess(fileItem: TiFileItem): void {
    console.log(`filename:${fileItem.file.name}`);
  }
  onAddItemFailed(fileItem: TiFileItem): void {
    console.log(`filename:${fileItem.file.name}`);
  }
  onBeforeSendItems(fileItems: Array<TiFileItem>): void {
    fileItems.forEach((item: TiFileItem) => {
      item.formData = {
        tinyFormdata: 'aa'
      };
    });
  }
  onProgressItems($event: any): void {
    console.log('onProgressItems');
    console.log($event.fileItems);
    console.log($event.progress);
  }
  onSuccessItems($event: any): void {
    console.log('onSuccessItems');
    console.log($event.fileItems);
    console.log($event.response);
    console.log($event.status);
  }
  onErrorItems($event: any): void {
    console.log('onErrorItems');
    console.log($event.fileItems);
    console.log($event.response);
    console.log($event.status);
  }
  onCancelItems($event: any): void {
    console.log('onCancelItems');
    console.log($event.fileItems);
    console.log($event.response);
    console.log($event.status);
  }
  onRemoveItems($event: any): void {
    console.log('onRemoveItems');
    console.log($event);
  }
  onCompleteItems($event: any): void {
    // 根据状态码和返回消息设置详情信息
    console.log(`response${$event.response}`);
  }
  onCompleteAllItems($event: any): void {
    console.log('onCompleteAllItems');
    console.log($event);
  }
  changeDisable(): void {
    this.disabled = !this.disabled;
  }
}
