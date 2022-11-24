import { Component } from '@angular/core';

@Component({
  templateUrl: './select-basic.html',
})
export class SelectBasicComponent {
   options: Array<any> = [
    {
      label: '中国',
    },
    {
      label: '巴西',
    },
    {
      label: '加拿大',
    },
  ];

   value: any = this.options[0];
}
