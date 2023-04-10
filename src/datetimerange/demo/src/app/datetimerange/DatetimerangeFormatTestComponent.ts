import { Component } from '@angular/core';
import { TiDatetimeFormat, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-format-test.html'
})
export class DatetimerangeFormatTestComponent {
  value: TiDateValue = {
    begin: new Date(2017, 8, 27, 11, 12, 45),
    end: new Date(2018, 5, 6, 4, 51, 12)
  };

  format: TiDatetimeFormat = {
    date: 'yyyy/MM/dd',
    time: 'HH:mm'
  };

  format1: TiDatetimeFormat = {
    date: 'yyyy.MM.dd',
    time: 'HH'
  };

  value1: TiDateValue = {
    begin: new Date(2013, 10, 10, 23, 8, 45),
    end: new Date(2015, 5, 6, 4, 51, 12)
  };

  value2: TiDateValue = {
    begin: new Date(2016, 2, 25, 23, 12, 45),
    end: new Date(2018, 10, 16, 4, 51, 12)
  };

  value3: TiDateValue = {
    begin: new Date(2016, 2, 25, 23, 12, 45),
    end: new Date(2018, 10, 16, 4, 51, 12)
  };

  onFormatClick(): void {
    this.format1 = {
      date: 'yyyy-MM-dd',
      time: 'HH:mm:ss'
    };
  }

  onFormatClick1(): void {
    this.format1 = {
      date: 'yyyy.MM.dd',
      time: 'HH:mm'
    };
  }

  okClick(event: TiDateValue): void {
    console.log(event);
  }
}
