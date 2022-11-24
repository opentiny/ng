import { Component } from '@angular/core';

@Component({
  templateUrl: './list-selectall.html',
})
export class ListSelectallComponent {
  myOptions: Array<any> = [
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

  myOptions1: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
    },
    {
      label: '巴西',
      englishname: 'Brazil',
      disabled: true,
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
      disabled: true,
    },
    {
      label: '德国',
      englishname: 'Germany',
      disabled: true,
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
      disabled: true,
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom',
    },
  ];

  myOptions2: Array<any> = [
    {
      label: '北美洲',
      children: [
        {
          label: '美国',
          englishname: 'America',
          disabled: true,
        },
        {
          label: '加拿大',
          englishname: 'Canada',
          disabled: true,
        },
      ],
    },
    {
      label: '南美洲',
      children: [
        {
          label: '巴西',
          englishname: 'Brazil',
          disabled: false,
        },
      ],
    },
    {
      label: '亚洲',
      children: [
        {
          label: '中国',
          englishname: 'China',
          disabled: false,
        },
        {
          label: '日本',
          englishname: 'Japan',
        },
        {
          label: '韩国',
          englishname: 'South Korea',
        },
      ],
    },
    {
      label: '欧洲',
      children: [
        {
          label: '法国',
          englishname: 'France',
          disabled: true,
        },
        {
          label: '德国',
          englishname: 'Germany',
          disabled: false,
        },
        {
          label: '土耳其',
          englishname: 'Turkey',
        },
        {
          label: '大不列颠和北爱兰联合王国',
          englishname: 'United Kingdom',
        },
      ],
    },
  ];
  myOptions3: Array<any> = [];

  mySelecteds1: any = [this.myOptions[3]];
  mySelecteds2: any = [this.myOptions1[1], this.myOptions1[7]];
  mySelecteds3: any = [
    this.myOptions2[0].children[0],
    this.myOptions2[3].children[3],
  ];
  mySelecteds4: any;
  ngOnInit(): void {
    for (let i: number = 0; i < 1000; i++) {
      const option: any = {
        id: i + '',
        label: 'label_' + i,
        pic: `pic${i}.png`,
      };
      this.myOptions3.push(option);
    }
  }
}
