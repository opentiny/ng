import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-max-min.html',
  styleUrls: ['./spinnerTest.less']
})
export class SpinnerMaxMinComponent {
  max: any = 20;
  min: number = 0;
  spinnerValue: number = 30;

  max1: any = 20;
  min1: number = 0;
  spinnerValue1: number = 30;

  max2: any = 20;
  min2: any = 10;
  spinnerValue2: number = 8;

  changeMax(): void {
    this.max = 40;
  }
  changeInvalid(): void {
    this.max = 'werq';
  }
  changeMax1(): void {
    this.max1 = 15;
  }
  changeInvalid1(): void {
    this.max1 = 'wewe';
  }
  changeMin2(): void {
    this.min2 = 12;
  }
  changeInvalid2(): void {
    this.min2 = 'werq';
  }
}
