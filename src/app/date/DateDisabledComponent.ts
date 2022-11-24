import { Component } from '@angular/core';

@Component({
  templateUrl: './date-disabled.html',
})
export class DateDisabledComponent {
  disabled: boolean = true;
  value: Date = new Date(2015, 8, 2);
}
