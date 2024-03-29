import { Component } from '@angular/core';
@Component({
  templateUrl: './time-event.html'
})
export class TimeEventComponent {
  myLogs: Array<string> = [];
  timeValue: string = '';

  ngModelChangeFn($event: any): void {
    this.myLogs = [...this.myLogs, `ngModelChange model=${$event}`];
  }
}
