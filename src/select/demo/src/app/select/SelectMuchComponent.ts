import { Component } from '@angular/core';

@Component({
  templateUrl: './select-much.html'
})
export class SelectMuchComponent {
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
      disabled: true
    },
    {
      label: '巴西',
      englishname: 'Brazil',
      disabled: false
    },
    {
      label: '加拿大',
      englishname: 'Canada',
      disabled: true
    },
    {
      label: '中国',
      englishname: 'China',
      disabled: false
    },
    {
      label: '法国',
      englishname: 'France',
      disabled: true
    },
    {
      label: '德国',
      englishname: 'Germany',
      disabled: false
    },
    {
      label: '日本',
      englishname: 'Japan'
    },
    {
      label: '韩国',
      englishname: 'South Korea'
    },
    {
      label: '土耳其',
      englishname: 'Turkey'
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom'
    }
  ];

  items: Array<any> = [];

  ngOnInit(): void {
    for (let i: number = 0; i < 300; i++) {
      this.items.push({ value: undefined });
    }
  }
}
