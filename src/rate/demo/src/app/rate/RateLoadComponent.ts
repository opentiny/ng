import { Component } from '@angular/core';

@Component({
  templateUrl: './rate-load.html'
})
export class RateLoadComponent {
  value: any;

  public myLogs: Array<string> = [];

  onChange(event: any): void {
    this.myLogs = [...this.myLogs, `onNgModelChange() value=${event}`];
  }

  changeUndefined(): void {
    this.value = undefined;
  }
  changeNull(): void {
    this.value = null;
  }

  changeText(): void {
    this.value = '';
  }

  changeZero(): void {
    this.value = 0;
  }

  changeNegativeNumber(): void {
    this.value = -10;
  }

  changeMoreThanFive(): void {
    this.value = 10;
  }

  changeFour(): void {
    this.value = 4;
  }

  changeTwo(): void {
    this.value = 2;
  }
}
