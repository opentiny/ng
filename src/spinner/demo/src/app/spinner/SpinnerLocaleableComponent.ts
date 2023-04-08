import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-localeable.html'
})
export class SpinnerLocaleableComponent {
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = 1500.3624;
}
