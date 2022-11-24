import { Component } from '@angular/core';

@Component({
  templateUrl: './dateedit-value.html', // 指定组件模板
  styleUrls: ['./dateedit.less'], // 样式路径
})
export class DateEditValueComponent {
  value: Date = null;
  value1: Date = new Date(2016, 7, 9);
  value2: Date = new Date(2016, 7, 9);

  min1: Date = new Date(2010, 3, 1);
  max1: Date = new Date(2021, 6, 30);

  min2: Date = new Date(1992, 5, 30);
  max2: Date = new Date(2099, 11, 6);

  clickFn(): void {
    this.value2 = new Date(2099, 3, 1);
  }

  clickFn1(): void {
    this.value2 = new Date(2017, 9, 12);
  }
}
