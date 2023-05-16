import { Component } from '@angular/core';
import { TiDateCustomizeOptions } from '@opentiny/ng';
@Component({
  templateUrl: './datetime-customize.html'
})
export class DatetimeCustomizeComponent {
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  nowHours: number = this.nowTime.getHours();
  nowMinutes: number = this.nowTime.getMinutes();
  nowSeconds: number = this.nowTime.getSeconds();
  value: Date = new Date(2013, 3, 12, 12, 23, 45);
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '今天',
      value: {
        begin: this.nowTime
      }
    },
    {
      label: '明天',
      value: {
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate + 1, this.nowHours, this.nowMinutes, this.nowSeconds)
      }
    },
    {
      label: '一周前',
      value: {
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate - 6, this.nowHours, this.nowMinutes, this.nowSeconds)
      }
    }
  ];
  myLogs: Array<string> = [];

  onCustomizeOptionClick(model: Date): void {
    this.myLogs = [...this.myLogs, `customizeOptionClick() model = ${model}`];
  }
}
