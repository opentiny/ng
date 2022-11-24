import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-refresh.html',
})
export class CheckgroupRefreshComponent {
  dataArray: Array<any> = [
    { id: 1, text: 'guest', disabled: true },
    { id: 2, text: 'user', disabled: false },
    { id: 3, text: 'customer', disabled: true },
    { id: 4, text: 'admin', disabled: false },
  ];
  dataArray2: Array<any> = [
    { id: 1, text: 'guest', disabled: true },
    { id: 2, text: 'user', disabled: false },
    { id: 3, text: 'customer', disabled: true },
    { id: 4, text: 'admin', disabled: false },
  ];
  checkedArray: Array<any> = [this.dataArray[0]];
  item1: any = this.dataArray[0];
  item2: any = this.dataArray[1];
  item3: any = this.dataArray[2];
  item4: any = this.dataArray[3];

  refresh(): void {
    this.dataArray = this.dataArray2;
    this.checkedArray = [this.dataArray2[0]];
    this.item1 = this.dataArray2[0];
    this.item2 = this.dataArray2[1];
    this.item3 = this.dataArray2[2];
    this.item4 = this.dataArray2[3];
  }
  onMyChange(checkeds: Array<any>): void {
    console.log('onMyChange checkeds.length=' + checkeds.length);
  }
  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
