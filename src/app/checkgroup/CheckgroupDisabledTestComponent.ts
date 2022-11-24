import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-disabled.html',
})
export class CheckgroupDisabledComponent {
  // 数据列表
  dataArray1: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];

  dataArray2: Array<any> = [
    { id: 1, text: 'guest', disabled: true },
    { id: 2, text: 'user', disabled: true },
    { id: 3, text: 'customer', disabled: true },
    { id: 4, text: 'admin', disabled: true },
  ];

  dataArray3: Array<any> = [
    { myId: 'a', text: 'guest', disabled: true },
    { myId: 'b', text: 'user' },
    { myId: 'c', text: 'customer' },
    { myId: 'd', text: 'admin', disabled: true },
  ];

  dataArray4: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin', disabled: true },
  ];

  dataArray5: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];

  dataArray6: Array<any> = [
    { id: 1, text: 'guest', disabled: true },
    { id: 2, text: 'user', disabled: false },
    { id: 3, text: 'customer', disabled: false },
    { id: 4, text: 'admin', disabled: false },
  ];

  checkedArray1: Array<any> = [this.dataArray1[0], this.dataArray1[2]];
  checkedArray2: Array<any> = [this.dataArray2[0], this.dataArray2[2]];
  checkedArray3: Array<any> = [this.dataArray3[0], this.dataArray3[2]];
  checkedArray4: Array<any> = [this.dataArray4[0], this.dataArray4[2]];
  checkedArray5: Array<any> = [this.dataArray5[0], this.dataArray5[2]];
  checkedArray6: Array<any> = [
    this.dataArray6[2],
    this.dataArray6[1],
    this.dataArray6[3],
  ];

  item: any = this.dataArray6[0];
  changeDisabled(): void {
    this.item.disabled = !this.item.disabled;
  }
}
