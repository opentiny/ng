import { Component } from '@angular/core';
@Component({
  templateUrl: './slider-hidden.html',
})
export class SliderHiddenComponent {
  value: number = 64;
  min: number = 0;
  max: number = 100;
  scales: Array<any> = [0, 20, 40, 60, 80, 100];
  hidden: boolean = true;

  number1: number = 300;
  number2: number = 650;
  value1: string = `${this.number1};${this.number2}`;
  min1: number = 100;
  max1: number = 2000;
  scales1: Array<number> = [100, 300, 650, 1250, 2000];
  ratios1: Array<number> = [0.4, 0.2, 0.2, 0.2];
  tipFormatterFn(value: number): number {
    return value;
  }
}
