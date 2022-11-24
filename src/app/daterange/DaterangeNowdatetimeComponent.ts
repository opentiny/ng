import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-nowdatetime.html',
})
export class DaterangeNowdatetimeComponent {
  nowDateTime: Date = new Date(2022, 5, 20);
  value: TiDateValue = null;
}
