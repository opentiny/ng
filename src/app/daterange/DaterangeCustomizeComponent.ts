import { Component } from '@angular/core';
import { TiDateCustomizeOptions, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-customize.html',
})
export class DaterangeCustomizeComponent {
  value: TiDateValue = {
    begin: new Date(2022, 5, 1),
    end: new Date(2023, 1, 4),
  };
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '最近一周',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 6
        ),
        end: new Date(),
      },
    },
    {
      label: '最近一个月',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date().getDate() - 1
        ),
        end: new Date(),
      },
    },
    {
      label: '最近三个月',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 3,
          new Date().getDate() - 1
        ),
        end: new Date(),
      },
    },
  ];
}
