import { Component } from '@angular/core';

@Component({
  templateUrl: './select-labelkey.html',
})
export class SelectLabelkeyComponent {
  options: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
    },
    {
      label: '巴西',
      englishname: 'Brazil',
    },
    {
      label: '加拿大',
      englishname: 'Canada',
    },
    {
      label: '中国',
      englishname: 'China',
    },
    {
      label: '法国',
      englishname: 'France',
    },
    {
      label: '德国',
      englishname: 'Germany',
    },
    {
      label: '日本',
      englishname: 'Japan',
    },
    {
      label: '韩国',
      englishname: 'South Korea',
    },
    {
      label: '土耳其',
      englishname: 'Turkey',
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom',
    },
  ];

  value: any;
}
