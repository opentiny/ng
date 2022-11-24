import { Component } from '@angular/core';

@Component({
  templateUrl: `./uploadimage-maxcount.html`,
})
export class UploadimageMaxcountComponent {
  myLogs: Array<string> = [];
  uploadLimit(event: any): void {
    this.myLogs = [...this.myLogs, `图片数量已达上限。`];
  }
}
