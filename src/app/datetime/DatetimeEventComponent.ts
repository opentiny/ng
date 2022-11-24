import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-event.html'
})
export class DatetimeEventComponent {
  myLogs: Array<string> = [];
  value: Date = null;

  onNgModelChange(value: Date): void {
    this.myLogs = [...this.myLogs, `onNgModelChange() value = ${value}`];
  }

  onOkClick(value: Date): void {
    this.myLogs = [...this.myLogs, `onOkClick() value = ${value}`];
  }
}
