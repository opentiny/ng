import { Component } from '@angular/core';

@Component({
  templateUrl: `./upload-custom.html`,
})
export class UploadCustomComponent {
  myLogs: Array<string> = [];
  customHeaders: any = {
    tiCustomHeader: 'TinyNG'
  };
  customFormData: any = {
    tiCustomFormData: 'hello tiny'
  };
  beforeSendItems($event: Event): void {
    this.myLogs = [...this.myLogs, `请求方式：${$event[0].method}; 文件名：'${$event[0].alias}'; 头信息：${JSON.stringify($event[0].headers)}; 附加信息：${JSON.stringify($event[0].formData)}`];
  }
}
