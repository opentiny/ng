import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-basic.html'
})
export class SpinnerBasicComponent {
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = undefined;
}
