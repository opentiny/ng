import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './slider-limits.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderLimitsComponent {
  value: number = 6;
  value1: number = 2;
  value2: number = 10;
  singleValue: string = `${this.value}`;
  rangeValue: string = `${this.value1};${this.value2}`;
  min: number = 1;
  max: number = 12;
  scales: Array<string> = ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '1年', '2年', '3年'];
}
