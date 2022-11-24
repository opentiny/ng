import { Component } from '@angular/core';

@Component({
  templateUrl: './checkbox-event.html',
})
export class CheckboxEventComponent {
  myValue: boolean = true;
  myLogs: Array<any> = [];

  onNgModelChange(model: boolean): void {
    this.myLogs = [...this.myLogs, 'onNgModelChange(), model=' + model];
  }
}
