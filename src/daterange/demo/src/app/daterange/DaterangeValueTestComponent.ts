import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-value-test.html'
})
export class DaterangeValueTestComponent {
  id: string = 'daterange';
  min: Date = new Date(1991, 6, 2);
  max: Date = new Date(2017, 11, 25);
  format: string = 'yyyy-MM-dd';
  value: string = '';

  value1: TiDateValue = {
    begin: new Date(2015, 8, 27),
    end: new Date(2016, 5, 6)
  };

  value2: TiDateValue = {
    begin: new Date(2017, 8, 27),
    end: new Date(2018, 5, 6)
  };

  valueClickFn(): void {
    this.value2 = {
      begin: new Date(2015, 10, 12),
      end: new Date()
    };
  }

  valueClickFn1(): void {
    this.value2.begin = new Date(2013, 11, 10);
    this.value2 = { ...this.value2 };
  }

  valueClickFn2(): void {
    this.value2.end = new Date(2020, 11, 16);
    this.value2 = { ...this.value2 };
  }

  valueClickFn3(): void {
    this.value1 = null;
  }

  ngModelChange(event: TiDateValue): void {
    console.log(event, 'ngModelChange');
  }
}
