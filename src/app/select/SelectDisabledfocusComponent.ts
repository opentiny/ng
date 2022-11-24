import { Component } from '@angular/core';

@Component({
  templateUrl: './select-disabledfocus.html',
})
export class SelectDisabledfocusComponent {
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

  value: any;
  myDisabled: boolean = true;

  changeDisabled(): void {
    this.myDisabled = !this.myDisabled;
  }
}
