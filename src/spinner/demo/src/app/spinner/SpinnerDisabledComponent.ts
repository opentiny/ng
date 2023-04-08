import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-disabled.html'
})
export class SpinnerDisabledComponent {
  spinnerValue: number = 1500.3624;
  max: number = 2000;
  min: number = -20;
}
