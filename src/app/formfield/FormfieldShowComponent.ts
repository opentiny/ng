import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-show.html',
})
export class FormfieldShowComponent {
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@example.com';
  nickValue: string = 'tiny';
  showInput: boolean = true;
  showButton: boolean = true;

  changeState(key) {
    this[`show${key}`] = !this[`show${key}`]
  }
}
