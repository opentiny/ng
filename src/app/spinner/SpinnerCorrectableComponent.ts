import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-correctable.html',
  // styleUrls: ['./spinnerTest.less']
})
export class SpinnerCorrectableComponent {
  max: number = 200;
  min: number = -20;
  spinnerValue: number = 23837.4545;
  format: string = 'N2';
  correctable: boolean = true;

  changeCorrect(): void {
    this.spinnerValue = 23837.4545;
    this.correctable = false;
  }
}
