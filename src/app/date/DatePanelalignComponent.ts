import { Component } from '@angular/core';

@Component({
  templateUrl: './date-panelalign.html',
})
export class DatePanelalignComponent {
  panelAlign: string = 'right';
  value: Date = new Date(2015, 8, 2);
}
