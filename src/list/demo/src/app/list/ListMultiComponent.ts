import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: './list-multi.html'
})
export class ListMultiComponent {
  options: Array<any> = [];
  options1: Array<any> = [];
  selected: any;
  selected1: any;
  constructor() {
    for (let i: number = 0; i < 20; i++) {
      const option: any = {
        id: String(i),
        label: `很长很长很长很长很长很长很长很长很长很长很长很长myemail${i}@example.com很长很长`,
        pic: `pic${i}.png'`,
        disabled: i % 2 === 0
      };
      this.options.push(option);
    }
    for (let i: number = 0; i < 20000; i++) {
      const option: any = {
        id: String(i),
        label: `myemail${i}@example.com很长很长`,
        pic: `pic${i}.png'`,
        disabled: i % 6 === 0
      };
      this.options1.push(option);
    }
    this.selected = [this.options[0]];
  }
}
