import { Component } from '@angular/core';

@Component({
  templateUrl: './switch-load.html',
})
export class SwitchLoadComponent {
  switchState: boolean = false;

  // 每个组件都用下面六个函数，只改变函数内容
  changeUndefined(): void {
    this.switchState = undefined;
  }
  changeNull(): void {
    this.switchState = null;
  }
  changeWrongType(): void {
    const temp: any = 5;
    this.switchState = temp;
  }
  changeZeroData(): void {
    this.switchState = false;
  }
  changeDataA(): void {
    this.switchState = false;
  }
  changeDataB(): void {
    this.switchState = true;
  }
}
