import { Component } from '@angular/core';
@Component({
  templateUrl: './slider-event.html'
})
export class SliderEventComponent {
  myLogs: Array<string> = [];
  singleValue: number = 64;
  rangeValue: string = '30;85';
  min: number = 0;
  max: number = 100;
  scales: Array<any> = [0, '', 40, '', 80, 100];

  changeStop(value: number | string): void {
    this.myLogs = [...this.myLogs, `changeStop event = ${value}`];
  }
}
