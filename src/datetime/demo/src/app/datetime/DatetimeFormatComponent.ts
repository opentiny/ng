import { Component } from '@angular/core';
import { TiDatetimeFormat } from '@opentiny/ng';

@Component({
  templateUrl: './datetime-format.html'
})
export class DatetimeFormatComponent {
  secondValue: Date = null;
  minutevalue: Date = null;
  hourValue: Date = null;
  secondFormat: TiDatetimeFormat = {
    date: 'yyyy.MM.dd',
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
