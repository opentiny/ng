import { Component } from '@angular/core';

@Component({
    templateUrl: './rate-event.html'
})
export class RateEventComponent {
    myLogs: Array<string> = [];
    value: number = 0;

    onNgModelChange(value: Date): void {
        this.myLogs = [...this.myLogs, `onNgModelChange() value = ${value}`];
    }
}
