import { Component } from '@angular/core';

@Component({
  templateUrl: './text-events.html'
})
export class TextEventsComponent {
  myLogs: Array<string> = [];
  value: string = '长期艰苦奋斗';

  onClear(value: string): void {
    this.myLogs = [...this.myLogs, `clear：${value}`];
  }

  onFocus(value: string): void {
    this.myLogs = [...this.myLogs, `focus：${value}`];
  }

  onBlur(value: string): void {
    this.myLogs = [...this.myLogs, `blur：${value}`];
  }

  onNgModelChange(value: string): void {
    this.myLogs = [...this.myLogs, `modelChange：${value}`];
  }
}
