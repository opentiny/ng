import { Component } from '@angular/core';
@Component({
  templateUrl: './slider-ratios.html',
})
export class SliderRatiosComponent {
  singleValue1: number = 300;
  singleValue2: number = 650;
  singleValue: number = 1250;
  rangeValue: string = `${this.singleValue1};${this.singleValue2}`;
  min: number = 100;
  max: number = 2000;
  scales: Array<number> = [100, 300, 650, 1250, 2000];
  ratios: Array<number> = [0.4, 0.2, 0.2, 0.2];
}
