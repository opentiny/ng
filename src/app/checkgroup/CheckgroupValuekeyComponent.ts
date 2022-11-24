import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-valuekey.html',
})
export class CheckgroupValuekeyComponent {
  data: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];
  checked: Array<any> = [1, 2];
}
