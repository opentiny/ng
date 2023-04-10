import { Component } from '@angular/core';
import { TiDateCustomizeOptions, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-customize.html'
})
export class DaterangeCustomizeComponent {
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  value: TiDateValue = {
    begin: new Date(2022, 5, 1),
    end: new Date(2023, 1, 4)
  };
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '最近一周',
      value: {
        begin: new Date(this.nowYear, this.nowMonth, this.nowDate - 6),
        end: this.nowTime
      }
    },
    {
      label: '最近一个月',
      value: {
        begin: new Date(this.nowYear, this.nowMonth - 1, this.nowDate),
        end: this.nowTime
      }
    },
    {
      label: '最近三个月',
      value: {
        begin: new Date(this.nowYear, this.nowMonth - 3, this.nowDate),
        end: this.nowTime
      }
    }
  ];
  myLogs: Array<string> = [];

  onCustomizeOptionClick(model: TiDateValue): void {
    this.myLogs = [...this.myLogs, `customizeOptionClick() model = ${JSON.stringify(model)}`];
  }
}
