import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-event.html'
})
export class DaterangeEventComponent {
  value: TiDateValue = null;
  myLogs: Array<string> = [];

  onNgModelChange(value: TiDateValue): void {
    this.myLogs = [...this.myLogs, `ngModelChange value = ${JSON.stringify(value)}`];
  }

  onDayClick(info: any): void {
    this.myLogs.push(`onDayClick() info = value: ${info.value}, focusedPosition: ${info.focusedPosition},
            beginValue: ${info.beginValue}, endValue: ${info.endValue}`);
  }

  onOkClick(value: Date): void {
    this.myLogs = [...this.myLogs, `onOkClick() value = ${value}`];
  }
}
