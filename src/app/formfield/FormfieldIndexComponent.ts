import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-index.html',
})
export class FormfieldIndexComponent {
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@example.com';
  nickValue: string = 'tiny';
  order: Array<number> = [6,5,4,3,2];
}
