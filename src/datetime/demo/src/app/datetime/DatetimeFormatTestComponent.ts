import { Component } from '@angular/core';
import { TiDatetimeFormat } from '@opentiny/ng';

@Component({
  templateUrl: './datetime-format-test.html'
})
export class DatetimeFormatTestComponent {
  value: Date = new Date();
  value1: Date = new Date(2016, 2, 12, 10, 23, 45);
  value2: Date = new Date(2016, 2, 12, 10, 23, 45);
  value3: Date = new Date(2016, 2, 12, 10, 23, 45);
  format: TiDatetimeFormat = {
    date: 'yyyy.MM.dd',
    time: 'HH:mm'
  };

  format1: TiDatetimeFormat = {
    date: 'yyyy.MM.dd',
    time: 'HH'
  };

  format2: TiDatetimeFormat = {
    date: 'yyyy/MM/dd',
    time: 'HH:mm:ss'
  };

  onFormatClick(): void {
    this.format2 = {
      date: 'yyyy.MM.dd',
      time: 'HH:mm'
    };
  }
}
