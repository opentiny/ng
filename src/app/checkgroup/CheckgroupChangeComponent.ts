import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-change.html',
})
export class CheckgroupChangeComponent {
  private items: Array<any> = new Array(200);
  private items1: Array<any> = new Array(100);
  private checkeds11: Array<any> = new Array(10);

  dataArray: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];
  checkedArray: Array<any> = [this.dataArray[0]];

  constructor() {
    for (let i: number = 0; i < this.items.length; i++) {
      this.items[i] = { id: i, text: i };
    }
    for (let i: number = 0; i < this.items1.length; i++) {
      this.items1[i] = this.items[i];
    }
    for (let i: number = 0; i < this.checkeds11.length; i++) {
      this.checkeds11[i] = this.items1[i];
    }
  }

  newItems(): void {
    this.dataArray = [
      { id: 1, text: 'guest' },
      { id: 2, text: 'user' },
      { id: 3, text: 'customer' },
    ];
  }
  changeItems(): void {
    this.dataArray.pop();
  }
  newCheckeds(): void {
    this.checkedArray = [this.dataArray[1]];
  }
  changeCheckeds(): void {
    this.checkedArray.push(this.dataArray[2]);
  }
  newItemsAndCheckeds(): void {
    this.dataArray = this.items1;
    this.checkedArray = this.checkeds11;
  }
  changeItemsAndCheckeds(): void {
    this.dataArray.pop();
    this.checkedArray.pop();
  }
  onMyChange(checkeds: Array<any>): void {
    console.log('onMyChange checkeds.length=' + checkeds.length);
  }
}
