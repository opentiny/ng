import { Component } from '@angular/core';
import { TiDateCustomizeOptions } from '@opentiny/ng';

@Component({
  templateUrl: './date-customize.html',
})
export class DateCustomizeComponent {
  value: Date = null;
  customizeOptions: Array<TiDateCustomizeOptions> = [
    {
      label: '今天',
      value: {
        begin: new Date(),
      },
    },
    {
      label: '明天',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ),
      },
    },
    {
      label: '一周前',
      value: {
        begin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 6
        ),
      },
    },
  ];
}
