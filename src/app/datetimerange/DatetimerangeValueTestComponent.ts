import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-value-test.html',
})
export class DatetimerangeValueTestComponent {
  id: string = 'datetimerange';
  value: string = '';
  value1: TiDateValue = {
    begin: new Date(2017, 8, 27, 11, 20, 12),
    end: new Date(2018, 5, 6, 4, 12, 12),
  };

  valueClickFn(): void {
    this.value1 = {
      begin: new Date(2016, 2, 15),
      end: new Date(2017, 3, 15),
    };
  }

  valueClickFn1(): void {
    if (this.value1 === null) {
      return;
    }
    this.value1.begin = new Date(2015, 4, 12);
    this.value1 = { ...this.value1 };
  }

  valueClickFn2(): void {
    if (this.value1 === null) {
      return;
    }
    this.value1.end = new Date(2020, 6, 12, 12, 10, 30);
    this.value1 = { ...this.value1 };
  }
}
