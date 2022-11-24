import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-value.html',
})
export class DaterangeValueComponent {
  value1: TiDateValue = null;
  value2: TiDateValue = {
    begin: new Date(2017, 8, 27),
    end: new Date(2018, 5, 6),
  };
}
