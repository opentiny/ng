import { Component } from '@angular/core';
import { TiDateCustomizeOptions } from '@opentiny/ng';

@Component({
  templateUrl: './datetime-timezoneable.html'
})
export class DatetimeTimezoneableComponent {
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  nowHours: number = this.nowTime.getHours();
  nowMinutes: number = this.nowTime.getMinutes();
  nowSeconds: number = this.nowTime.getSeconds();
  value: Date = null;
  value1: Date = new Date(2021, 4, 2, 1, 2, 12);
  value2: Date = null;
  timeZone: string;
  timeZone1: string = 'UTC/GMT';
  timeZone2: string;
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

  getCurrentTimeZone(timeZone: string): void {
    this.timeZone = timeZone;
  }

  getCurrentTimeZone2(timeZone) {
    this.timeZone2 = timeZone;
  }
}
