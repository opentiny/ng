import { Component } from '@angular/core';
import { TiDateValue, TiDateCustomizeOptions } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-timezoneable.html'
})
export class DatetimerangeTimezoneableComponent {
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  nowHours: number = this.nowTime.getHours();
  nowMinutes: number = this.nowTime.getMinutes();
  nowSeconds: number = this.nowTime.getSeconds();
  value1: TiDateValue = null;
  value2: TiDateValue = {
    begin: new Date(2021, 4, 2, 1, 2, 12),
    end: new Date(2023, 10, 15, 10, 20, 30),
    timeZone: 'UTC/GMT'
  };
  value3: TiDateValue = null;
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '最近一周',
      value: {
        end: this.nowTime,
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate - 6, this.nowHours, this.nowMinutes, this.nowSeconds)
      }
    },
    {
      label: '最近一个月',
      value: {
        end: this.nowTime,
        begin: new Date(this.nowYear, this.nowMonth - 1, this.nowDate, this.nowHours, this.nowMinutes, this.nowSeconds)
      }
    },
    {
      label: '最近三个月',
      value: {
        end: this.nowTime,
        begin: new Date(this.nowYear, this.nowMonth - 3, this.nowDate, this.nowHours, this.nowMinutes, this.nowSeconds)
      }
    }
  ];
}
