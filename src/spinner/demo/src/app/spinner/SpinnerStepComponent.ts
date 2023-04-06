import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-step.html',
  styleUrls: ['./spinnerTest.less']
})
export class SpinnerStepComponent {
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = 1500.3624;
  step: number = 2;
}
