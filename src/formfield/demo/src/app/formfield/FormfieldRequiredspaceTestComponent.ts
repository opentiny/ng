import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-requiredspace-test.html'
})
export class FormfieldRequiredspaceTestComponent {
  colsWidth: Array<string> = ['50%', '50%'];
  colsNumber: number = 2;
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@tiny.com';
  nickValue: string = 'tiny';
}
