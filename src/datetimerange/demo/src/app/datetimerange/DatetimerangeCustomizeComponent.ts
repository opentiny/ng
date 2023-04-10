import { Component } from '@angular/core';
import { TiDateCustomizeOptions, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-customize.html'
})
export class DatetimerangeCustomizeComponent {
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  nowHours: number = this.nowTime.getHours();
  nowMinutes: number = this.nowTime.getMinutes();
  nowSeconds: number = this.nowTime.getSeconds();
  value: TiDateValue = {
    begin: new Date(2016, 9, 27, 10, 20, 12),
    end: new Date(2018, 5, 6, 15, 12, 12)
  };
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
  myLogs: Array<string> = [];

  onCustomizeOptionClick(model: TiDateValue): void {
    this.myLogs = [...this.myLogs, `customizeOptionClick() model = ${JSON.stringify(model)}`];
  }
}
