import { Component } from '@angular/core';
@Component({
  templateUrl: './time-option-disabled.html'
})
export class TimeOptionDisabledComponent {
  timeValue: string = '';
  timeValue1: string = '';
  timeValue2: string = '';
  timeValue3: string = '';
  timeValue4: string = '';
  timeValue5: string = '';
  min: string = '8:23:27';
  max: string = '21:56:47';
  min1: string = '8:23:27';
  max1: string = '8:56:47';
  min2: string = '8:23:27';
  max2: string = '8:23:47';

  changeMaxMinValue(): void {
    this.max2 = '23:59:59';
    this.min2 = '00:00:00';
  }
}
