import { Component } from '@angular/core';

@Component({
  templateUrl: './date-maxmin-test.html'
})
export class DateMaxminTestComponent {
  nowTime: Date = new Date();
  delayTime: number = 60 * 60 * 1000 * 24 * 10; // 10天
  min: Date = new Date();
  max: Date = new Date();
  min1: Date = new Date();
  max1: Date = new Date();
  min2: Date = new Date();
  max2: Date = new Date();
  min3: Date = new Date();
  max3: Date = new Date();
  min4: Date = new Date(2029, 9, 30);
  max4: Date = new Date(2020, 9, 30);
  format: string;
  format1: string = 'yyyy';
  value: Date;
  value1: Date;
  value2: Date;
  value3: Date;
  value4: Date = new Date();
  value5: Date = this.min4;
  value6: Date = this.max4;

  changeFormat(): void {
    this.format = 'yyyy';
  }

  changeFormat1(): void {
    this.format = 'yyyy/MM';
  }

  changeFormat2(): void {
    this.format = 'YYYY/QQ';
  }

  changeFormat3(): void {
    this.format = 'yyyy/MM/dd';
  }

  onMaxAndMinClick(): void {
    this.max1 = new Date(this.nowTime.getTime() - this.delayTime);
    this.min1 = new Date(this.nowTime.getTime() + this.delayTime);
  }

  onMaxAndMinClick1(): void {
    this.max2 = new Date(this.nowTime.getTime() + this.delayTime);
    this.min2 = new Date(this.nowTime.getTime() - this.delayTime);
  }
}
