import { Component } from '@angular/core';

@Component({
  templateUrl: './inputnumber-event.html'
})
export class InputnumberEventComponent {
  myLogs: Array<string> = [];
  value: number = 189.421;

  onModelChange(value: any): void {
    this.myLogs = [...this.myLogs, `modelChange：${value}`];
  }

  onFocus(value: any): void {
    this.myLogs = [...this.myLogs, `focus：${value}`];
  }

  onBlur(value: any): void {
    this.myLogs = [...this.myLogs, `blur：${value}`];
  }
}
