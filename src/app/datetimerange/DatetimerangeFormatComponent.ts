import { Component } from '@angular/core';
import { TiDatetimeFormat, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-format.html',
})
export class DatetimerangeFormatComponent {
  secondValue: TiDateValue = null;
  minutevalue: TiDateValue = null;
  hourValue: TiDateValue = null;
  secondFormat: TiDatetimeFormat = {
    date: 'yyyy/MM/dd',
    time: 'HH:mm:ss'
  };

  minuteFormat: TiDatetimeFormat = {
    date: 'yyyy.MM.dd',
    time: 'HH:mm'
  };

  hourFormat: TiDatetimeFormat = {
    date: 'yyyy/MM/dd',
    time: 'HH'
  };
}
