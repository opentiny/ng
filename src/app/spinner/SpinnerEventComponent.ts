import { Component, } from '@angular/core';

@Component({
  templateUrl: './spinner-event.html'
})
export class SpinnerEventComponent {
  myLogs: Array<string> = [];
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = 1500.3624;

  onModelChange(value: any): void {
    this.myLogs = [...this.myLogs, `onModelChange value=${value} type=${typeof value}`];
  }
}
