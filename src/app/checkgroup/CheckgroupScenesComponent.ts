import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-scenes.html',
})
export class CheckgroupScenesComponent {
  dataArray1: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user', disabled: true },
    { id: 3, text: 'customer', disabled: true },
    { id: 4, text: 'admin', disabled: true },
  ];

  dataArray2: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin', disabled: true },
    { id: 5, text: 'developer', disabled: true },
  ];

  data3: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer', disabled: true },
    { id: 4, text: 'admin', disabled: true },
    { id: 5, text: 'developer', disabled: true },
    { id: 6, text: 'guest1', disabled: true },
    { id: 7, text: 'user1', disabled: true },
    { id: 8, text: 'customer1', disabled: true },
    { id: 9, text: 'admin1', disabled: true },
    { id: 10, text: 'developer1', disabled: true },
  ];
  dataArray3: Array<any> = [].concat(this.data3);

  checkedArray1: Array<any> = [this.dataArray1[0].id];
  checkedArray2: Array<any> = [];
  checkedArray3: Array<any> = [];

  showCheckedData(): void {
    this.dataArray1 = this.dataArray1.filter((item: any): boolean => {
      return this.checkedArray1.includes(item.id);
    });
  }

  next(): void {
    this.dataArray2 = [
      { id: 6, text: 'teacher', disabled: true },
      { id: 7, text: 'student', disabled: true },
      { id: 8, text: 'worker', disabled: true },
      { id: 9, text: 'manager', disabled: true },
      { id: 10, text: 'boss', disabled: true },
    ];
  }

  back(): void {
    this.dataArray2 = [
      { id: 1, text: 'guest' },
      { id: 2, text: 'user' },
      { id: 3, text: 'customer' },
      { id: 4, text: 'admin', disabled: true },
      { id: 5, text: 'developer', disabled: true },
    ];
  }

  filter(): void {
    this.dataArray3 = this.data3.filter((item: any): boolean => {
      return item.id < 9;
    });
  }

  reset(): void {
    this.dataArray3 = [].concat(this.data3);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
