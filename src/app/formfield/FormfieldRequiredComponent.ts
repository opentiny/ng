import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-required.html',
})
export class FormfieldRequiredComponent {
  contryValue: string = '中国';
  sexValue: string = '男';
  IDValue: string = 'hello tiny';
  emailValue: string = 'hello@example.com';
  nickValue: string = 'tiny';
  nickRequired: boolean = true;

  changeState() :void {
    this.nickRequired = !this.nickRequired
  }
}
