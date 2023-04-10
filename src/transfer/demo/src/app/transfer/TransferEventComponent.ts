import { Component } from '@angular/core';
import { myOptions } from './data.js';
@Component({
  templateUrl: './transfer-event.html'
})
export class TransferEventComponent {
  myLogs: Array<string> = [];
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = [];

  transferToLeft(event: object): void {
    this.myLogs = [...this.myLogs, `transferToLeft event = ${JSON.stringify(event)}}`];
  }

  transferToRight(event: object): void {
    this.myLogs = [...this.myLogs, `transferToRight event = ${JSON.stringify(event)}}`];
  }

  onNgModelChange(event: object): void {
    this.myLogs = [...this.myLogs, `onNgModelChange event = ${JSON.stringify(event)}}`];
  }
}
