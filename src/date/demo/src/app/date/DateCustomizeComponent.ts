import { Component } from '@angular/core';
import { TiDateCustomizeOptions } from '@opentiny/ng';

@Component({
  templateUrl: './date-customize.html'
})
export class DateCustomizeComponent {
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  value: Date = null;
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '今天',
      value: {
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate)
      }
    },
    {
      label: '明天',
      value: {
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate + 1)
      }
    },
    {
      label: '一周前',
      value: {
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate - 6)
      }
    }
  ];
  myLogs: Array<string> = [];

  onCustomizeOptionClick(model: Date): void {
    this.myLogs = [...this.myLogs, `customizeOptionClick() model = ${model}`];
  }
}
