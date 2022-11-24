import { Component } from '@angular/core';
import { TiDateCustomizeOptions } from '@opentiny/ng';
@Component({
  templateUrl: './datetime-customize.html'
})
export class DatetimeCustomizeComponent {
  value: Date = new Date(2013, 3, 12, 12, 23, 45);
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '今天',
      value: {
        begin: new Date()
      },
    },
    {
      label: '明天',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        )
      },
    },
    {
      label: '一周前',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 6
        )
      },
    },
  ];
}
