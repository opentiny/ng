import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './datetimerange-event.html'
})
export class DatetimerangeEventComponent {
  value: TiDateValue = null;
  myLogs: Array<string> = [];

  onNgModelChange(value: TiDateValue): void {
    this.myLogs = [...this.myLogs, `onNgModelChange() value = ${JSON.stringify(value)}`];
  }

  onDayClick(info: any): void {
    this.myLogs = [...this.myLogs, `onDayClick() info = value: ${info.value}, focusedPosition: ${info.focusedPosition},
            beginValue: ${info.beginValue}, endValue: ${info.endValue}`];
  }

  onOkClick(value: Date): void {
    this.myLogs = [...this.myLogs, `onOkClick() value = ${JSON.stringify(value)}`];
  }
}
