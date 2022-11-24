import { Component } from '@angular/core';
import { TiFileInfo, TiFileItem, TiFilter } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-input-field-test.html`,
})
export class UploadInputFieldTestComponent {
  disabled: boolean = true;
  url: string = '/upload';
  autoUpload: boolean = false;
  batchSend: boolean = true;
  method: string = 'get';
  alias: string = 'tiFileRename';
  placeholder: string = 'please select file';
  formDataFirst: boolean = true;
  headers: any = {
    tiheadersConfig: 'aa',
  };
  formData: any = {};
  filters: Array<TiFilter> = [
    {
      name: 'maxCount',
      params: [5],
    },
  ];
  filters1: Array<TiFilter> = [
    {
      name: 'maxCount',
      params: [1],
    },
  ];
  onAddItemSuccess(fileItem: TiFileItem): void {
    console.log(`filename:${fileItem.file.name}`);
  }
  onAddItemFailed(fileInfo: TiFileInfo): void {
    console.log(`filename:${fileInfo.name}`);
  }
  onBeforeSendItems(fileItems: Array<TiFileItem>): void {
    fileItems.forEach((item: TiFileItem) => {
      item.formData = {
        tinyFormdata: 'aa',
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
    this.disabled = false;
  }
}
