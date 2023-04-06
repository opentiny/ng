import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-multi-column.html'
})
export class FormfieldMultiColumnComponent {
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@example.com';
  nickValue: string = 'tiny';
  colsNumber: number = 3;
}
