import { Component, ViewEncapsulation } from '@angular/core';
const STEP: number = 10;

@Component({
  templateUrl: './progressbar-class.html',
  styleUrls: ['./progressbar-class.less'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressbarClassComponent {
  value: number = 80;
  value1: number = 50;
  max: number = 200;

  _progressClass: string;
  get progressClass(): string {
    if (this.value <= 150) {
      return 'custom-progress-warn-bg';
    } else {
      return 'success-bg';
    }
  }

  up(): void {
    if (this.value + STEP <= this.max) {
      this.value += STEP;
    } else {
      this.value = this.max;
    }
  }
  down(): void {
    if (this.value - STEP > 0) {
      this.value -= STEP;
    } else {
      this.value = 0;
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.value1 += 100;
    }, 500);
  }
}
