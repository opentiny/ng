import { Component } from '@angular/core';

@Component({
  templateUrl: './select-virtualscroll.html',
})
export class SelectVirtualscrollComponent {
  private data: Array<any> = [
    {
      label: '美国',
    },
    {
      label: '巴西',
    },
    {
      label: '加拿大',
    },
    {
      label: '中国',
    },
    {
      label: '法国',
    },
    {
      label: '德国',
    },
    {
      label: '日本',
    },
    {
      label: '韩国',
    },
    {
      label: '土耳其',
    },
    {
      label: '大不列颠和北爱兰联合王国',
    },
  ];

  private dataA: Array<any> = [];
  options: Array<any> = [];
  value: any;

  constructor() {
    for (let i: number = 0; i < 10000; i++) {
      const item: any = this.data[i % 10];
      this.dataA.push({ ...item, label: i + item.label });
    }
    this.options = [].concat(this.dataA);
  }
}
