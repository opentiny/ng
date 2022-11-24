import { Component } from '@angular/core';

@Component({
  templateUrl: './date-disableddays.html',
})
export class DateDisableddaysComponent {
  value: Date = null;
  disabledDays: Array<Date> = [new Date(2022, 4, 1), new Date(2022, 4, 19)];
}
