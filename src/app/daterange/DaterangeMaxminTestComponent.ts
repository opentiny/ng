import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
    templateUrl: './daterange-maxmin-test.html'
})

export class DaterangeMaxminTestComponent {
    nowTime: Date = new Date();
    delayTime: number = 60 * 60 * 1000 * 24 * 10; // 10天
    min: Date = new Date();
    max: Date = new Date();
    min1: Date = new Date();
    max1: Date = new Date();
    min2: Date = new Date();
    max2: Date = new Date();
    format: string;
    value: TiDateValue;
    value1: TiDateValue;
    value2: TiDateValue;
    value3: TiDateValue;

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
