import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-basic.html',
})
export class CheckgroupBasicComponent {
  data: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];

  checked: Array<any> = [
    this.data[0],
    this.data[2],
  ];
}
