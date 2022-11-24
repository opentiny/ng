import { Component } from '@angular/core';

@Component({
  templateUrl: './select-small.html',
})
export class SelectSmallComponent {
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
}
