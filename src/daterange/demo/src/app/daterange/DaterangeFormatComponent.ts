import { Component, ViewChild } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-format.html'
})
export class DaterangeFormatComponent {
  dayFormat: string = 'yyyy-MM-d';
  monthFormat: string = 'yyyy/M';
  seasonFormat: string = 'YYYY/QQ';
  yearFormat: string = 'yyyy';

  dayValue: TiDateValue = null;
  monthValue: TiDateValue = null;
  seasonValue: TiDateValue = null;
  yearValue: TiDateValue = null;
}
