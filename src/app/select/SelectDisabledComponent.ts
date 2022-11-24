import { Component } from '@angular/core';

@Component({
  templateUrl: './select-disabled.html',
})
export class SelectDisabledComponent {
  options: Array<any> = [
    {
      label: '巴西',
    },
    {
      label: '加拿大',
      disabled: true,
    },
    {
      label: '中国',
    },
    {
      label: '法国',
    },
  ];
  myOptions: Array<any> = JSON.parse(JSON.stringify(this.options));
  value: any;
  myValue: any = this.myOptions[2];
}
