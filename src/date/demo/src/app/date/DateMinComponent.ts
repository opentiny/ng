import { Component } from '@angular/core';

@Component({
  templateUrl: './date-min.html'
})
export class DateMinComponent {
  min: Date | undefined = undefined;
  value: Date = new Date(1992, 4, 12);

  value1: Date = new Date(1994, 2, 8);
  min1: Date = new Date(1996, 7, 1);

  value2: Date = new Date(1994, 2, 8);
  min2: Date = new Date(1991, 6, 2);
  max: Date = new Date(2015, 2, 6);

  minValueClick(): void {
    this.min2 = new Date(1990, 3, 5);
  }
  minValueClick2(): void {
    this.min2 = undefined;
  }
}
