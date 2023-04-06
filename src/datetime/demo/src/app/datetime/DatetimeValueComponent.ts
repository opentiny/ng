import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-value.html'
})
export class DatetimeValueComponent {
  value1: Date = null;
  value2: Date = new Date();
}
