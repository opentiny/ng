import { Component } from '@angular/core';

@Component({
  templateUrl: './datetime-disabled.html'
})
export class DatetimeDisabledComponent {
  value: Date = new Date(2015, 8, 2, 12, 2, 35);
  disabled: boolean = true;
}
