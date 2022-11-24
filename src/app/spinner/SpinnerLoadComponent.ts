import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-load.html',
})
export class SpinnerLoadComponent {
  max: number = 10000;
  min: number = -400;
  spinnerValue: any;
  max1: number = 100;
  min1: number = 0;
  spinnerValue1: number = 40;
  max2: number = 100;
  min2: number = 0;
  spinnerValue2: number = 40;
  myLogs: Array<string> = [];
  changeLegal(): void {
    this.spinnerValue = 1234.66666;
  }
  changeIllegal(): void {
    this.spinnerValue = 'werty3452';
  }
  changeMax(): void {
    this.spinnerValue1 = 120;
  }
  changeMin(): void {
    this.spinnerValue1 = -100;
  }
  changeMiddle(): void {
    this.spinnerValue1 = 50;
  }
  onModelChange(value: any): void {
    this.myLogs = [...this.myLogs, `onModelChange value=${value}`];
  }

  onModelChange1(value: any): void {
    this.myLogs = [...this.myLogs, `onModelChange1 value=${value}`];
  }
}
