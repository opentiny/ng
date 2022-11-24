import { Component, ViewChild } from '@angular/core';
import { TiFilter, TiUploadComponent } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-changes.html`,
})
export class UploadChangesComponent {
  @ViewChild(TiUploadComponent) uploadCom: TiUploadComponent;
  myLogs: Array<string> = [];
  buttonText: string = '按钮样式';
  inputFieldWidth: string = '500px';
  url: string = '/upload';
  headers: any = {
    tiheadersConfig: 'aa',
  };
  beforeSendItems($event: Event): void {
    this.myLogs = [...this.myLogs,
      `url='${$event[0].url}';headers=${JSON.stringify($event[0].headers)}`
    ];
  }
  changeUrl(): void {
    this.url = '/newUrl';
    this.myLogs = [...this.myLogs, `修改url='${this.url}'`];
  }
  changeHeaders(): void {
    this.headers = {
      newTiheadersConfig: 'newConfig',
    };
    this.myLogs = [...this.myLogs, `修改headers=${JSON.stringify(this.headers)}`];
  }
}
