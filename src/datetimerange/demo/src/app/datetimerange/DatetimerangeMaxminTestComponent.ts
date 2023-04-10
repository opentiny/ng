import { Component } from '@angular/core';
import { TiDatetimeFormat, TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-maxmin-test.html'
})
export class DatetimerangeMaxminTestComponent {
  nowTime: Date = new Date();
  delayTime: number = 10 * 60 * 1000; // 10分钟
  min: Date = new Date();
  max: Date = new Date();
  min1: Date = new Date();
  max1: Date = new Date();
  min2: Date = new Date();
  max2: Date = new Date();
  value: TiDateValue;
  value1: TiDateValue;
  value2: TiDateValue;
  value3: TiDateValue;
  format: TiDatetimeFormat;

  onMaxClick(): void {
    this.max = new Date(this.nowTime.getTime() - this.delayTime);
  }

  onMinClick(): void {
    this.min = new Date(this.nowTime.getTime() + this.delayTime);
  }

  onMaxAndMinClick(): void {
    this.max1 = new Date(this.nowTime.getTime() - this.delayTime);
    this.min1 = new Date(this.nowTime.getTime() + this.delayTime);
  }

  onMaxAndMinClick1(): void {
    this.max2 = new Date(this.nowTime.getTime() + this.delayTime);
    this.min2 = new Date(this.nowTime.getTime() - this.delayTime);
  }

  changeFormat(): void {
    this.format = {
      date: 'yyyy.MM.dd',
      time: 'HH'
    };
  }

  changeFormat1(): void {
    this.format = {
      date: 'yyyy.MM.dd',
      time: 'HH:mm'
    };
  }

  changeFormat2(): void {
    this.format = {
      date: 'yyyy.MM.dd',
      time: 'HH:mm:ss'
    };
  }
}
