import { Component } from '@angular/core';
import { TiFileItem } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-form-data.html`
})
export class UploadFormDataComponent {
  inputValue: string = 'aa';
  url: string = '/upload';
  onBeforeSendItems(fileItems: Array<TiFileItem>): void {
    // 上传前动态添加formData
    fileItems.forEach((item: TiFileItem) => {
      item.formData = {
        inputValut: this.inputValue,
        name: 'xxy'
      };
    });
  }
}
