import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-value.html',
})
export class DatetimerangeValueComponent {
  value1: TiDateValue = null;
  value2: TiDateValue = {
    begin: new Date(2017, 8, 27, 11, 20, 12),
    end: new Date(2018, 5, 6, 4, 12, 12)
  };
}
