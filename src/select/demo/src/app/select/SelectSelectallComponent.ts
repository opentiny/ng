import { Component } from '@angular/core';

@Component({
  templateUrl: './select-selectall.html'
})
export class SelectSelectallComponent {
  options: Array<any> = [
    {
      label: '中国'
    },
    {
      label: '巴西'
    },
    {
      label: '加拿大'
    }
  ];

  value: any = [this.options[1]];
}
