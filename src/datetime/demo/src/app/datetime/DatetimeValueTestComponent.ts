import { Component } from '@angular/core';
import { TiDatetimeFormat } from '@opentiny/ng';

@Component({
  templateUrl: './datetime-value-test.html'
})
export class DatetimeValueTestComponent {
  id: string = 'datetime';
  value: string = '';
  value1: Date = null;
  value2: Date = new Date(2013, 2, 12, 10, 23, 45);
  value3: Date = new Date(2020, 10, 30, 2, 15, 12);
  value4: Date = new Date(2015, 3, 20);

  format: TiDatetimeFormat = {
    date: 'yyyy.MM.dd',
    time: 'HH:mm:ss'
  };
  min: Date = new Date(2013, 2, 12, 10, 23, 45);
  max: Date = new Date(2020, 10, 30, 2, 15, 12);

  onValueClick(): void {
    this.value4 = new Date(2015, 3, 12);
  }

  onValueClick1(): void {
    this.value4 = new Date(2050, 5, 20);
  }

  ngModelChange(model: Date): void {
    console.log(model);
  }
}
