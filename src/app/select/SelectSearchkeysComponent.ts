import { Component } from '@angular/core';

@Component({
  templateUrl: './select-searchkeys.html',
})
export class SelectSearchkeysComponent {
  options: Array<any> = [
    {
      label: '美国',
      yomi: 'meiguo',
      initial: 'mg',
    },
    {
      label: '巴西',
      yomi: 'baxi',
      initial: 'bx',
    },
    {
      label: '加拿大',
      yomi: 'jianada',
      initial: 'jnd',
      disabled: true,
    },
    {
      label: '中国',
      yomi: 'zhongguo',
      initial: 'zg',
    },
    {
      label: '法国',
      yomi: 'faguo',
      initial: 'fg',
    },
    {
      label: '德国',
      yomi: 'deguo',
      initial: 'dg',
      disabled: true,
    },
    {
      label: '日本',
      yomi: 'riben',
      initial: 'rb',
    },
    {
      label: '韩国',
      yomi: 'hanguo',
      initial: 'hg',
    },
    {
      label: '土耳其',
      yomi: 'tuerqi',
      initial: 'teq',
    },
    {
      label: '大不列颠和北爱兰联合王国',
      yomi: 'dabuliedianhebeiaierlanlianhewangguo',
      initial: 'dbldhbaellhwg',
    },
  ];

  value: any;
}
