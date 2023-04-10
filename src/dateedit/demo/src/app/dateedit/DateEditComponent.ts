import { Component } from '@angular/core';

@Component({
  templateUrl: './dateedit.html', // 指定组件模板
  styleUrls: ['./dateedit.less'] // 样式路径
})
export class DateEditComponent {
  value: Date = new Date(2015, 1, 4);
  format: string = 'yyyy-MM-dd';
  value1: Date = new Date(2017, 1, 23);
  format1: string = 'yyyy.MM.dd';

  blurFn(e: any): void {
    console.log(e);
  }

  ngModelChange(e: any): void {
    console.log(e, 'change');
  }
}
