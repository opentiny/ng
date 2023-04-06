import { Component } from '@angular/core';

@Component({
  templateUrl: './zoom-change-src.html'
})
export class ZoomChangeSrcComponent {
  srcArray: Array<string> = ['assets/image/1.jpg', 'assets/image/2.jpg', 'assets/image/3.jpg'];
  index: number = 0;
  count: number = 0;
  src: string = this.srcArray[this.index];
  // 循环切换
  changeSrc(event: any): void {
    if (!this.srcArray.length) {
      return;
    }
    this.count += 1;
    this.index = this.count % this.srcArray.length;
    this.src = this.srcArray[this.index];
  }
}
