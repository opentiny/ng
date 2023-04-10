import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-tip.html'
})
export class SpinnerTipComponent {
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = 1500.3624;
}
