import { Component } from '@angular/core';

@Component({
  templateUrl: './switch-event.html'
})
export class SwitchEventComponent {
  switchState: boolean = true;
  myLogs: Array<string> = [];
  onNgModelChange(state: boolean): void {
    this.myLogs = [...this.myLogs, `onNgModelChange,state= ${state}`];
  }
  onFocus(event: FocusEvent): void {
    this.myLogs = [...this.myLogs, 'onFocus'];
  }
  onBlur(event: FocusEvent): void {
    this.myLogs = [...this.myLogs, 'onBlur'];
  }
  onChange(state: boolean): void {
    this.myLogs = [...this.myLogs, `onChange,state= ${state}`];
  }
}
