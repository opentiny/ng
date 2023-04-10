import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-nowdatetime.html'
})
export class DatetimerangeNowdatetimeComponent {
  nowDateTime: Date = new Date(2018, 10, 20);
  value: TiDateValue = null;
}
