import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-min.html',
})
export class DatetimerangeMinComponent {
  nowTime: Date = new Date();
  min: Date = null;
  value: TiDateValue = {
    begin: new Date(1994, 2, 8, 1, 1, 1),
    end: new Date(2016, 5, 21),
  };

  value1: TiDateValue = null;
  min1: Date = new Date(2010, 10, 15, 10, 20, 30);

  value2: TiDateValue = {
    begin: new Date(2017, 4, 2, 1, 2, 12),
    end: new Date(20, 4, 16, 1, 12, 20),
  };
  min2: Date = new Date(2010, 10, 15, 10, 20, 30);

  minValueClick(): void {
    this.min1 = new Date(2013, 11, 23);
  }
  minValueClick2(): void {
    this.min1 = undefined;
  }

  onDayClick(obj: any): void {
    if (
      (obj.focusedPosition === 'begin' && obj.beginValue === null) ||
      obj.focusedPosition === 'end'
    ) {
      this.min2 = new Date(
        obj.endValue?.getFullYear(),
        obj.endValue?.getMonth(),
        obj.endValue?.getDate() - 6
      );
    }
  }
}
