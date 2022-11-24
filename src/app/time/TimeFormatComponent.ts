import { Component } from '@angular/core';
@Component({
  templateUrl: './time-format.html',
})
export class TimeFormatComponent {
  timeValue: string = '8:23:27';
  timeValue1: string = '8:23:27';
  timeValue2: string = '8:23:27';
  format: string = 'HH:mm:ss';
  format1: string = 'HH:mm';
  format2: string = 'HH';
}
