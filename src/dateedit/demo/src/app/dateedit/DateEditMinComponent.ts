import { Component } from '@angular/core';

@Component({
  templateUrl: './dateedit-min.html', // 指定组件模板
  styleUrls: ['./dateedit.less'] // 样式路径
})
export class DateEditMinComponent {
  value: Date = new Date(2015, 1, 23);
  min: Date = new Date(2017, 1, 23);
  value1: Date = new Date(2016, 10, 5);
  min1: Date = new Date(2010, 10, 12);
  value2: Date = new Date(2016, 10, 5);

  clickFn(): void {
    this.min1 = new Date(2006, 10, 12);
  }

  clickFn1(): void {
    this.min1 = new Date(2019, 10, 12);
  }
}
