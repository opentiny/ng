import { Component } from '@angular/core';

@Component({
  templateUrl: './date-max.html',
})
export class DateMaxComponent {
  value: Date = new Date(1992, 4, 12);
  value1: Date = new Date(1994, 2, 8);
  min: Date = new Date(1991, 6, 2);
  max: Date | undefined = undefined;
  maxValue1: Date = new Date(2014, 8, 27);

  maxValueClick(): void {
    this.maxValue1 = new Date(1995, 3, 5);
  }
  maxValueClick2(): void {
    this.maxValue1 = undefined;
  }
}
