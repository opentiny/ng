import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-single-column.html',
})
export class FormfieldSingleColumnComponent {
  title: string = '单列表单';
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@example.com';
  nickValue: string = 'tiny';
}
