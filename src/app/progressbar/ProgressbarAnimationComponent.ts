import { Component } from '@angular/core';
const STEP: number = 10;
@Component({
  templateUrl: 'progressbar-animation.html',
})
export class ProgressbarAnimationComponent {
  value: number = 40;
  max: number = 200;
  isAnimation: boolean = false;
  up(): void {
    if (this.value + STEP <= this.max) {
      this.value += STEP;
    } else {
      this.value = this.max
    }
  }
  down(): void {
    if (this.value - STEP > 0) {
      this.value -= STEP;
    } else {
      this.value = 0
    }
  }
  switchState(): void {
    this.isAnimation = !this.isAnimation
  }
}
