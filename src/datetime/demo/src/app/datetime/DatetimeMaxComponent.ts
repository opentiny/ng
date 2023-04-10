import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-max.html'
})
export class DatetimeMaxComponent {
  value: Date = new Date(2016, 2, 12, 10, 23, 45);
  max: string = '';

  value1: Date = new Date(2013, 2, 12, 10, 23, 45);
  max1: Date = new Date(2010, 6, 30);

  value2: Date = new Date(2013, 2, 12, 10, 23, 45);
  max2: Date = new Date(2016, 6, 30);

  onMaxClick(): void {
    this.max2 = new Date(2019, 6, 30);
  }
  onMaxClick2(): void {
    this.max2 = undefined;
  }
}
