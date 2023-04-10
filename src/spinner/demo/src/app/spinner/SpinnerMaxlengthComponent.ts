import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-maxlength.html'
})
export class SpinnerMaxlengthComponent {
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = 1500.3624;
  maxlength: number = 10;
}
