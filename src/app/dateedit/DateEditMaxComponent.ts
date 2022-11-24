import { Component } from '@angular/core';

@Component({
  templateUrl: './dateedit-max.html', // 指定组件模板
  styleUrls: ['./dateedit.less'], // 样式路径
})
export class DateEditMaxComponent {
  value: Date = new Date(2015, 1, 23);
  max: Date = new Date(2016, 1, 23);
  value1: Date = new Date(2016, 10, 5);
  max1: Date = new Date(2020, 10, 12);
  value2: Date = new Date(2016, 10, 5);

  clickFn(): void {
    this.max1 = new Date(2060, 10, 12);
  }

  clickFn1(): void {
    this.max1 = new Date(2019, 10, 12);
  }
}
