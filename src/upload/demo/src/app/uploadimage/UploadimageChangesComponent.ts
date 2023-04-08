import { Component } from '@angular/core';

@Component({
  templateUrl: `./uploadimage-changes.html`
})
export class UploadimageChangesComponent {
  myLogs: Array<string> = [];
  customHeaders: any = {
    tiheadersConfig: 'TinyNG'
  };
  customFormData: any = {
    tiCustomFormData: 'hello tiny'
  };
  changeHeaders(): void {
    this.customHeaders.tiCustomHeader = 'custom header';
    this.myLogs = [...this.myLogs, `添加头信息：${JSON.stringify(this.customHeaders)}`];
  }
  beforeSendItems($event: Event): void {
    this.myLogs = [
      ...this.myLogs,
      `请求方式：${$event[0].method}; 文件名：'${$event[0].alias}'; 头信息：${JSON.stringify(
        $event[0].headers
      )}; 附加信息：${JSON.stringify($event[0].formData)}`
    ];
  }
}
