import { Component } from '@angular/core';

@Component({
  templateUrl: 'progressbar-basic.html'
})
export class ProgressbarBasicComponent {
  value: number = 40;
  value1: number = 200;
  value2: number = 0;
  max: number = 200;
}
