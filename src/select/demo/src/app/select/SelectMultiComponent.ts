import { Component } from '@angular/core';

@Component({
  templateUrl: './select-multi.html'
})
export class SelectMultiComponent {
  public options: Array<any> = [
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

  public value: any = [this.options[1]];
}
