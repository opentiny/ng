import { Component } from '@angular/core';
@Component({
  templateUrl: './time-maxmin.html',
})
export class TimeMaxminComponent {
  timeValue: string;
  max: string = '21:45:00';
  min: string = '21:45:00';
  format: string = 'HH:mm:ss';
}
