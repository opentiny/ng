import { Component } from '@angular/core';

@Component({
  templateUrl: './select-valuekey-test.html'
})
export class SelectValuekeyTestComponent {
  myOptions: Array<any> = [
    { label: '美国', englishname: 'America' },
    { label: '巴西', englishname: 'Brazil' },
    { label: '加拿大', englishname: 'Canada' },
    { label: '中国', englishname: 'China' },
    { label: '法国', englishname: 'France' },
    { label: '德国', englishname: 'Germany' },
    { label: '日本', englishname: 'Japan' },
    { label: '韩国', englishname: 'South Korea' },
    { label: '土耳其', englishname: 'Turkey' },
    { label: '大不列颠和北爱兰联合王国', englishname: 'United Kingdom' }
  ];
  myOptions2: Array<any> = [
    {
      label: '北美洲',
      children: [
        {
          label: '美国',
          englishname: 'America',
          disabled: true
        },
        {
          label: '加拿大',
          englishname: 'Canada',
          disabled: true
        }
      ]
    },
    {
      label: '南美洲',
      children: [
        {
          label: '巴西',
          englishname: 'Brazil',
          disabled: false
        }
      ]
    },
    {
      label: '亚洲',
      children: [
        {
          label: '中国',
          englishname: 'China',
          disabled: false
        },
        {
          label: '日本',
          englishname: 'Japan'
        },
        {
          label: '韩国',
          englishname: 'South Korea'
        }
      ]
    },
    {
      label: '欧洲',
      children: [
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
          label: '土耳其',
          englishname: 'Turkey'
        },
        {
          label: '大不列颠和北爱兰联合王国',
          englishname: 'United Kingdom'
        }
      ]
    }
  ];
  myOptions3: Array<any>;
  mySelected1: string = 'China';
  mySelecteds: any = ['China', 'Japan'];
  mySelecteds2: any = ['China', 'Japan'];

  changeOptions(): void {
    this.myOptions = [
      { label: '美国', englishname: 'America' },
      { label: '巴西', englishname: 'Brazil' },
      { label: '加拿大', englishname: 'Canada' },
      { label: '中国', englishname: 'China' },
      { label: '法国', englishname: 'France' },
      { label: '德国', englishname: 'Germany' },
      { label: '日本', englishname: 'Japan' },
      { label: '韩国', englishname: 'South Korea' },
      { label: '土耳其', englishname: 'Turkey' },
      { label: '大不列颠和北爱兰联合王国', englishname: 'United Kingdom' },
      { label: '俄罗斯', englishname: 'Russia' }
    ];
  }

  addOptions(): void {
    this.myOptions3 = this.myOptions2;
  }
}
