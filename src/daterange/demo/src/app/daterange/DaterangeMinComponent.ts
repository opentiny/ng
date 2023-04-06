import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-min.html'
})
export class DaterangeMinComponent {
  min: string = '';
  min1: Date = new Date(2016, 5, 21);
  value: TiDateValue = {
    begin: new Date(1994, 2, 8),
    end: new Date(2016, 5, 21)
  };

  value1: TiDateValue = {
    begin: new Date(2017, 4, 2),
    end: new Date(2018, 4, 16)
  };

  value2: TiDateValue;
  min2: Date = new Date(2021, 5, 21);

  minValueClick(): void {
    this.min1 = new Date(2017, 2, 23);
  }
  minValueClick2(): void {
    this.min1 = undefined;
  }

  onDayClick(obj: any): void {
    if ((obj.focusedPosition === 'begin' && obj.beginValue === null) || obj.focusedPosition === 'end') {
      this.min2 = new Date(obj.endValue?.getFullYear(), obj.endValue?.getMonth() - 1, obj.endValue?.getDate());
    }
  }
}
