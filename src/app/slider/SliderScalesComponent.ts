import { Component } from '@angular/core';
@Component({
  templateUrl: './slider-scales.html',
})
export class SliderScalesComponent {
  singleValue1: number = 200;
  max1: number = 1000;
  min1: number = 100;
  scales1: Array<number> = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  rangeValue: string = '200;600';
  max2: number = 1000;
  min2: number = 100;
  scales2: Array<number> = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  singleValue: string = '4;8';
  min: number = 1;
  max: number = 11;

  scales(value: number, min: number, max: number): string {
    if (value === min || value === max) {
      return undefined; // 为undefined或null情况下，不显示断点且不显示文本
    } else if ((value - min) % 2 === 0) {
      return `<span style=font-weight:bold;>${value}个月</span>`;
    } else {
      return ''; // 为""情况下，显示断点但不显示文本
    }
  }
}
