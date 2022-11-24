import { Component } from '@angular/core';
import { TiFileItem } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-case-test.html`,
})
export class UploadCaseTestComponent {
  url: string = '/upload';
  autoUpload: boolean = false;

  onBeforeSendItems(files: Array<TiFileItem>): void {
    console.log('onBeforeSendItems', files);
    files[0].uploader.cancelAll(); // 在上传前全部取消
  }
}
