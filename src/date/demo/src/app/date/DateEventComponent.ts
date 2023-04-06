import { Component } from '@angular/core';

@Component({
  templateUrl: './date-event.html'
})
export class DateEventComponent {
  value: Date = null;
  myLogs: Array<string> = [];

  onNgModelChange(value: Date): void {
    this.myLogs = [...this.myLogs, `onNgModelChange() value = ${value}`];
  }
}
