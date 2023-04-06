import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkbox-event.html'
})
export class CheckboxEventComponent {
  myValue: boolean = true;
  myLogs: Array<any> = [];
  items: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      value: 'China'
    },
    {
      id: '02',
      label: '美国',
      value: 'America'
    },
    {
      id: '03',
      label: '英国',
      value: 'Britain'
    }
  ];
  value: Array<any> = [];

  onNgModelChange(model: boolean): void {
    this.myLogs = [...this.myLogs, `ngModelChange: ${JSON.stringify(model)}`];
  }

  onNgModelChange1(model: any): void {
    this.myLogs = [...this.myLogs, `ngModelChange1：${JSON.stringify(model)}`];
  }
}
