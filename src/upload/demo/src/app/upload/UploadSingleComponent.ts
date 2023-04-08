import { Component } from '@angular/core';
import { TiFilter } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-single.html`
})
export class UploadSingleComponent {
  url: string = '/upload';
  placeholder: string = '单文件上传';
  // maxCount定义为1时，代表单文件上传
  filters: Array<TiFilter> = [
    {
      name: 'maxCount',
      params: [1]
    }
  ];
}
