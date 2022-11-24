import { Component } from '@angular/core';
import { TiDateCustomizeOptions, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-timezoneable.html',
})
export class DatetimerangeTimezoneableComponent {
  value1: TiDateValue = null;
  value2: TiDateValue = {
    begin: new Date(2021, 4, 2, 1, 2, 12),
    end: new Date(2023, 10, 15, 10, 20, 30),
    timeZone: 'UTC/GMT'
  };
}
