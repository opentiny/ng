import { Component } from '@angular/core';

@Component({
  templateUrl: './date-maxmin.html'
})
export class DateMaxminComponent {
  min: Date = new Date(2021, 11, 25);
  max: Date = new Date(2023, 1, 14);
  value1: Date = null;
  value2: Date = null;
  value3: Date = null;
}
