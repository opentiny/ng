import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-requiredspace.html'
})
export class FormfieldRequiredspaceComponent {
  colsWidth: Array<string> = ['50%', '50%'];
  colsNumber: number = 2;
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@tiny.com';
  nickValue: string = 'tiny';
}
