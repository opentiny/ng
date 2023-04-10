import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-clearicon.html'
})
export class DatetimerangeCleariconComponent {
  value: TiDateValue = {
    begin: new Date(2013, 10, 10, 23, 8, 45),
    end: new Date(2015, 5, 6, 4, 51, 12)
  };
}
