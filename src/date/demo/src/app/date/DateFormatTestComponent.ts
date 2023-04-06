import { Component } from '@angular/core';

@Component({
  templateUrl: './date-format-test.html'
})
export class DateFormatTestComponent {
  value: Date = new Date(2015, 8, 2);
  value1: Date = new Date();
  format1: string = 'yyyy';
  value2: Date = new Date(1991, 6, 2);
  format2: string = 'yyyy/M';
  value3: Date = new Date(2017, 8, 27);
  format3: string = 'yyyy.MM.d';
  value4: Date = new Date(2021, 6, 1);
  format4: string = 'YYYY/QQ';

  clickFn(): void {
    this.format3 = 'yyyy/MM/d';
  }
  changeQuarterVal(): void {
    this.value4 = new Date(2021, 9, 1);
  }
}
