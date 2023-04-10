import { Component } from '@angular/core';

@Component({
  templateUrl: './date-value-test.html'
})
export class DateValueTestComponent {
  id: string = 'date';
  min: Date = new Date(1991, 6, 2);
  max: Date = new Date(2017, 8, 27);
  format: string = 'yyyy.M.d';
  value: string = '';

  value1: any = null;
  format1: string = 'yyyy-M-d';
  value2: Date = this.min;
  format2: string = 'yyyy/M/d';
  value3: Date = this.max;
  format3: string = 'yyyy-MM-dd';

  ngModelChange(model: Date): void {
    console.log(model, 'model');
  }
}
