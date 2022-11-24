import { Component } from '@angular/core';
import { TiDateCustomizeOptions, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-customize.html'
})
export class DatetimerangeCustomizeComponent {
  value: TiDateValue = {
    begin: new Date(2016, 9, 27, 10, 20, 12),
    end: new Date(2018, 5, 6, 15, 12, 12)
  };
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '最近一周',
      value: {
        end: new Date(),
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 6
        )
      }
    },
    {
      label: '最近一个月',
      value: {
        end: new Date(),
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date().getDate()
        )
      }
    },
    {
      label: '最近三个月',
      value: {
        end: new Date(),
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 3,
          new Date().getDate()
        )
      }
    }
  ];
}
