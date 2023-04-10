import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-maxmin.html'
})
export class DatetimerangeMaxminComponent {
  max: Date = new Date(2025, 10, 15, 10, 20, 30);
  min: Date = new Date(2020, 10, 15, 10, 20, 30);
  value1: TiDateValue = null;
  value2: TiDateValue = null;
  value3: TiDateValue = null;
}
