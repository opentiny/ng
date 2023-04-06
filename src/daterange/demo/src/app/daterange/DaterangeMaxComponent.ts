import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-max.html'
})
export class DaterangeMaxComponent {
  format: string = 'yyyy-MM-dd';
  value: TiDateValue = {
    begin: new Date(1994, 2, 8),
    end: new Date(2016, 5, 21)
  };

  value1: TiDateValue = {
    begin: new Date(1992, 2, 21),
    end: new Date(2016, 10, 15)
  };

  value2: TiDateValue;

  max: Date = new Date(2018, 10, 8);
  max1: Date = new Date(2018, 10, 8);

  maxValueClick(): void {
    this.max = new Date(2017, 2, 15);
  }
  maxValueClick2(): void {
    this.max = undefined;
  }

  onDayClick(obj: any): void {
    if ((obj.focusedPosition === 'end' && obj.endValue === null) || obj.focusedPosition === 'begin') {
      this.max1 = new Date(obj.beginValue?.getFullYear(), obj.beginValue?.getMonth() + 1, obj.beginValue?.getDate() + 6);
    }
  }
}
