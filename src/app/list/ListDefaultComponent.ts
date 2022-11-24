import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: './list-default.html',
})
export class ListDefaultComponent {
  options: Array<any> = [];
  selected: any;
  options1: Array<any> = [];
  selected1: any;
  constructor() {
    for (let i: number = 0; i < 20; i++) {
      const option: any = {
        id: i + '',
        label: `很长很长很长很长很长很长很长很长很长很长很长很长myemail${i}@example.com很长很长`,
        pic: `pic${i}.png'`,
        disabled: i % 2 === 0,
      };
      this.options.push(option);
    }
    this.selected = this.options[0];
    for (let i: number = 0; i < 20000; i++) {
      const option: any = {
        id: i + '',
        label: `myemail${i}@example.com很长很长`,
        pic: `pic${i}.png'`,
        disabled: i % 2 === 0,
      };
      this.options1.push(option);
    }
  }
}
