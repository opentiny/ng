import { Component } from '@angular/core';

@Component({
  templateUrl: './date-value.html'
})
export class DateValueComponent {
  value1: Date = null;
  value2: Date = new Date(2008, 7, 8);
}
