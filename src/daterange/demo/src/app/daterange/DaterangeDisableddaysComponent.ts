import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-disableddays.html'
})
export class DaterangeDisableddaysComponent {
  value: TiDateValue = null;
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  disabledDays: Array<Date> = [
    new Date(this.nowYear, this.nowMonth, this.nowDate - 6),
    new Date(this.nowYear, this.nowMonth, this.nowDate),
    new Date(this.nowYear, this.nowMonth, this.nowDate + 6),
    new Date(this.nowYear, this.nowMonth + 2, this.nowDate)
  ];
}
