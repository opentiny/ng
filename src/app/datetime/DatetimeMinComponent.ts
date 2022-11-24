import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-min.html',
})
export class DatetimeMinComponent {
  value: Date = new Date(2016, 2, 12, 10, 23, 45);
  min: string = '';

  value1: Date = new Date(2013, 2, 12, 10, 23, 45);
  min1: Date = new Date(2015, 6, 30);

  value2: Date = new Date(2018, 2, 12, 10, 23, 45);
  min2: Date = new Date(2016, 5, 4);

  onMinClick(): void {
    this.min2 = new Date(2013, 5, 20);
  }
  onMinClick2(): void {
    this.min2 = undefined;
  }
}
