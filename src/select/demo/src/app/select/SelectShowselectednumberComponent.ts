import { Component } from '@angular/core';

@Component({
  templateUrl: './select-showselectednumber.html'
})
export class SelectShowselectednumberComponent {
  options: Array<any> = [
    { label: '美国' },
    { label: '巴西' },
    { label: '加拿大' },
    { label: '中国' },
    { label: '法国' },
    { label: '德国' },
    { label: '日本' },
    { label: '韩国' },
    { label: '土耳其' },
    { label: '大不列颠和北爱兰联合王国' }
  ];

  value: any = [this.options[3]];
}
