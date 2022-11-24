import { Component } from '@angular/core';

@Component({
  templateUrl: './dateedit-format.html', // 指定组件模板
  styleUrls: ['./dateedit.less'], // 样式路径
})
export class DateEditFormatComponent {
  value: Date = new Date(2015, 1, 12);
  value1: Date = new Date(2017, 1, 23);
  value2: Date = new Date(2016, 12, 5);
  value3: Date = new Date(2015, 1, 12);
  format: string = '';
  format1: string = 'dd/MM/yyyy';

  clickFn(): void {
    this.format1 = 'yyyy/MM/dd';
  }

  clickFn1(): void {
    this.format1 = 'yyyy.MM.dd';
  }
}
