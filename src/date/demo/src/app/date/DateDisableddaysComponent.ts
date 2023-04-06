import { Component } from '@angular/core';

@Component({
  templateUrl: './date-disableddays.html'
})
export class DateDisableddaysComponent {
  value: Date = null;
  nowTime: Date = new Date();
  nowYear: number = this.nowTime.getFullYear();
  nowMonth: number = this.nowTime.getMonth();
  nowDate: number = this.nowTime.getDate();
  disabledDays: Array<Date> = [
    new Date(this.nowYear, this.nowMonth, this.nowDate),
    new Date(this.nowYear, this.nowMonth + 1, this.nowDate)
  ];
}
