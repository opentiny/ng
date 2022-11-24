import { Component } from '@angular/core';

@Component({
  templateUrl: './select-clearable.html',
})
export class SelectClearableComponent {
  options: Array<any> = [
    {
      label: '巴西',
    },
    {
      label: '加拿大',
    },
    {
      label: '中国',
    },
  ];

  value: any = this.options[1];
  multiValue: Array<any> = this.options[1];
  myLogs: Array<string> = [];
  onClear(): void {
    this.myLogs = [...this.myLogs, `onClear()`];
  }
}
