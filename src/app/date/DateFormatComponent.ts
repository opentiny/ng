import { Component } from '@angular/core';

@Component({
  templateUrl: './date-format.html',
})
export class DateFormatComponent {
  dayFormat: string = 'yyyy-MM-dd';
  monthFormat: string = 'yyyy/M';
  seasonFormat: string = 'YYYY/QQ';
  yearFormat: string = 'yyyy';

  dayValue: Date = null;
  monthValue: Date = null;
  seasonValue: Date = null;
  yearValue: Date = null;
}
