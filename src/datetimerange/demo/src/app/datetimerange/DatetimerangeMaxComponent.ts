import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-max.html'
})
export class DatetimerangeMaxComponent {
  nowTime: Date = new Date();
  value: TiDateValue = {
    begin: new Date(1994, 2, 8),
    end: new Date(2016, 5, 21)
  };
  max: Date = null;

  value1: TiDateValue = {
    begin: new Date(1992, 2, 21),
    end: new Date(2016, 10, 15)
  };

  max1: Date = new Date(2018, 10, 15, 10, 20, 30);

  value2: TiDateValue = {
    begin: new Date(1994, 2, 8),
    end: new Date(2016, 6, 5)
  };

  value3: TiDateValue = {
    begin: new Date(new Date().getTime() - 6 * 60 * 60 * 1000),
    end: this.nowTime
  };
  max3: Date = this.nowTime;

  max2: Date = new Date(2020, 6, 12, 2, 12, 23);

  value4: TiDateValue = null;

  max4: Date = new Date(2020, 6, 12, 2, 12, 23);

  maxValueClick(): void {
    this.max2 = new Date(2030, 2, 15);
  }
  maxValueClick2(): void {
    this.max2 = undefined;
  }

  onDayClick(obj: any): void {
    if ((obj.focusedPosition === 'end' && obj.endValue === null) || obj.focusedPosition === 'begin') {
      this.max4 = new Date(obj.beginValue?.getFullYear(), obj.beginValue?.getMonth(), obj.beginValue?.getDate() + 6);
    }
  }
}
