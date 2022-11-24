import { Component } from '@angular/core';
@Component({
  templateUrl: './slider-tip.html',
})
export class SliderTipComponent {
  value1: number = 8;
  value2: number = 12;
  value3: number = 2;
  value4: number = 12;
  rangeValue: string = `${this.value1};${this.value2}`;
  rangeValue1: string = `${this.value3};${this.value4}`;
  min: number = 1;
  max: number = 12;
  scales: Array<string> = [
    '1个月',
    '2个月',
    '3个月',
    '4个月',
    '5个月',
    '6个月',
    '7个月',
    '8个月',
    '9个月',
    '1年',
    '2年',
    '3年',
  ];
  tipMode: string = 'always';
  tipFormatterFn(value: number): string {
    if (value === 10) {
      return '付10个月费用，享1年优惠';
    } else if (value === 11) {
      return '2年';
    } else if (value === 12) {
      return '3年';
    } else {
      return `${value}个月`;
    }
  }
}
