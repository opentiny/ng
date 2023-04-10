import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-maxmin.html'
})
export class DaterangeMaxminComponent {
  min: Date = new Date(2021, 11, 25);
  max: Date = new Date(2023, 1, 14);
  value1: TiDateValue = null;
  value2: TiDateValue = null;
  value3: TiDateValue = null;
}
