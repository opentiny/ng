/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Component,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare let global: any;

@Component({
  templateUrl: './select-leak.html',
})
export class SelectLeakComponent {
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
      disabled: true,
    },
    {
      label: '巴西',
      englishname: 'Brazil',
      disabled: false,
    },
    {
      label: '加拿大',
      englishname: 'Canada',
      disabled: true,
    },
    {
      label: '中国',
      englishname: 'China',
      disabled: false,
    },
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

  mySelected: any;

  show: boolean = true;

  dropLen: number = 0;
  // 修复SSR报错：ERROR ReferenceError: document is not defined
  constructor(@Inject(DOCUMENT) private document) {
    // 修复SSR问题：打开页面白屏一直转圈
    if (typeof global !== 'undefined') {
      return;
    }
  }

  dropCount(): void {
    setTimeout(() => {
      this.dropLen = this.document.body.getElementsByTagName('ti-drop').length;
    }, 0);
}

  ngOnInit(): void {
    this.dropCount();
}

  toggle(): void {
    this.show = !this.show;
    this.dropCount();
  }
}

