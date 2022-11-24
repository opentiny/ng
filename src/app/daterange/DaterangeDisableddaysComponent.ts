import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-disableddays.html',
})
export class DaterangeDisableddaysComponent {
  value: TiDateValue = null;
  disabledDays: Array<Date> = [
    new Date(2022, 4, 1),
    new Date(2022, 4, 19),
    new Date(2022, 5, 12),
    new Date(2022, 11, 24),
  ];
}
