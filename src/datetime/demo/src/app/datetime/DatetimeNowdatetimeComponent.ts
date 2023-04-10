import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-nowdatetime.html'
})
export class DatetimeNowdatetimeComponent {
  nowDateTime: Date = new Date(2018, 10, 20);
  value: Date = null;
}
