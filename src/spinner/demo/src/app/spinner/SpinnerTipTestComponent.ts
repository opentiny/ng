import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-tip-test.html'
})
export class SpinnerTipTestComponent {
  max: number = 10000;
  min: number = -400;
  spinnerValue: number;
  spinnerValue1: number = 180;
  spinnerValue2: number = 900;
  spinnerValue3: number = 900;
  spinnerValue4: number = 900;
  spinnerValue5: number = 800;

  changeRange(): void {
    this.max = 200;
    this.min = 100;
  }

  changeMaxValue(): void {
    this.max = 800;
  }

  changeMinValue(): void {
    this.min = 200;
  }
}
