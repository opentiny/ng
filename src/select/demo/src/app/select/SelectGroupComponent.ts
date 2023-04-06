import { Component } from '@angular/core';

@Component({
  templateUrl: './select-group.html'
})
export class SelectGroupComponent {
  options: Array<any> = [
    {
      label: '北美洲',
      children: [
        {
          label: '美国',
          disabled: true
        },
        {
          label: '加拿大'
        }
      ]
    },
    {
      label: '南美洲',
      children: [
        {
          label: '巴西'
        }
      ]
    },
    {
      label: '亚洲',
      children: [
        {
          label: '中国'
        },
        {
          label: '日本'
        },
        {
          label: '韩国'
        }
      ]
    },
    {
      label: '欧洲',
      children: [
        {
          label: '法国',
          disabled: true
        },
        {
          label: '德国'
        },
        {
          label: '土耳其'
        },
        {
          label: '大不列颠和北爱兰联合王国'
        }
      ]
    }
  ];

  value: any;
}
