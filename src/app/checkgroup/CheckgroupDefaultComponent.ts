import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-default.html',
})
export class CheckgroupDefaultComponent {
  // 数据列表
  dataArray1: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];

  dataArray2: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];

  dataArray3: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];

  dataArray4: Array<any> = [];

  checkedArray1: Array<any> = [
    this.dataArray1[0],
    this.dataArray1[3],
    this.dataArray1[1],
    this.dataArray1[2],
  ];
  checkedArray2: Array<any> = [];
  checkedArray3: Array<any> = [this.dataArray3[0], this.dataArray3[2]];
  checkedArray4: Array<any> = [];
}
