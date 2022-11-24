import { Component } from '@angular/core';
import { TiDatetimeFormat, TiDateValue } from '@opentiny/ng';

@Component({
    templateUrl: './datetime-maxmin-test.html'
})

export class DatetimeMaxminTestComponent {
    nowTime: Date = new Date();
    delayTime: number = 10 * 60 * 1000; // 10分钟
    min: Date = new Date();
    max: Date = new Date();
    min1: Date = new Date();
    max1: Date = new Date();
    min2: Date = new Date();
    max2: Date = new Date();
    value: Date;
    value1: Date;
    value2: Date;
    value3: Date;
    format: TiDatetimeFormat;

    onMaxClick(): void {
        this.max = new Date(this.nowTime.getTime() - this.delayTime);
    }

    onMinClick(): void {
        this.min = new Date(this.nowTime.getTime() + this.delayTime);
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

    onMaxAndMinClick(): void {
        this.max1 = new Date(this.nowTime.getTime() - this.delayTime);
        this.min1 = new Date(this.nowTime.getTime() + this.delayTime);
    }

    onMaxAndMinClick1(): void {
        this.max2 = new Date(this.nowTime.getTime() + this.delayTime);
        this.min2 = new Date(this.nowTime.getTime() - this.delayTime);
    }
}
