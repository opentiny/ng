import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-maxmin.html'
})
export class DatetimeMaxminComponent {
  max: Date = new Date(2023, 1, 14);
  min: Date = new Date(2021, 11, 25, 10, 12, 12);
  value1: Date = null;
  value2: Date = null;
  value3: Date = null;
}
