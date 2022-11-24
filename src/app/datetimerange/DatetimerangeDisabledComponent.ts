import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-disabled.html'
})
export class DatetimerangeDisabledComponent {
  value: TiDateValue = {
    begin: new Date(2013, 10, 10, 23, 8, 45),
    end: new Date(2015, 5, 6, 4, 51, 12)
  };
  disabled: boolean = true;
}
