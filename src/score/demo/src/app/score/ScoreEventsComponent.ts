import { Component } from '@angular/core';

@Component({
  templateUrl: './score-events.html'
})
export class ScoreEventsComponent {
  value: number = 10;
  myLogs: Array<string> = [];
  onChange(value: number): void {
    this.myLogs = [...this.myLogs, `当前评分值：${value}`];
  }
}
