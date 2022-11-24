import { Component } from '@angular/core';

@Component({
  templateUrl: './date-nowdatetime.html',
})
export class DateNowdatetimeComponent {
  nowDateTime: Date = new Date(2022, 1, 12);
  value: Date = null;
}
