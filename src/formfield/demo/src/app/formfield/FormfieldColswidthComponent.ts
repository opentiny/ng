import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-colswidth.html'
})
export class FormfieldColswidthComponent {
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@example.com';
  nickValue: string = 'tiny';

  colsNumber: number = 3;
  colsGap: Array<string> = ['100px', '120px'];
  colsWidth: Array<string> = ['33.33%', '33.33%', '33.33%'];

  changeCols(n: number): void {
    this.colsNumber = n;
    this.colsWidth = new Array(n);
    this.colsWidth.fill(`${String((100 / n).toFixed(2))}%`);
  }
}
