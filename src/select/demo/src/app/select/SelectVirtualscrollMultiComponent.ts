import { Component } from '@angular/core';

@Component({
  templateUrl: './select-virtualscroll-multi.html'
})
export class SelectVirtualscrollMultiComponent {
  private data: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
      primary: '子网 (192.168.0.1/24)',
      secondary: '可用IP数278',
      disabled: false
    },
    {
      label: '巴西',
      englishname: 'Brazil',
      primary: '子网 (192.168.0.1/25)',
      secondary: '可用IP数312',
      disabled: false
    },
    {
      label: '加拿大',
      englishname: 'Canada',
      primary: '子网 (192.168.0.1/26)',
      secondary: '可用IP数225',
      disabled: true
    },
    {
      label: '中国',
      englishname: 'China',
      primary: '子网 (192.168.0.1/27)',
      secondary: '可用IP数300',
      disabled: false
    },
    {
      label: '法国',
      englishname: 'France',
      primary: '子网 (192.168.0.1/28)',
      secondary: '可用IP数278',
      disabled: true
    },
    {
      label: '德国',
      englishname: 'Germany',
      primary: '子网 (192.168.0.1/29)',
      secondary: '可用IP数312',
      disabled: false
    },
    {
      label: '日本',
      englishname: 'Japan',
      primary: '子网 (192.168.0.1/30)',
      secondary: '可用IP数225'
    },
    {
      label: '韩国',
      englishname: 'South Korea',
      primary: '子网 (192.168.0.1/31)',
      secondary: '可用IP数300'
    },
    {
      label: '土耳其',
      englishname: 'Turkey',
      primary: '子网 (192.168.0.1/31)',
      secondary: '可用IP数300'
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom',
      primary: '子网 (192.168.0.1/31)',
      secondary: '可用IP数300'
    }
  ];

  private dataA: Array<any> = [];
  private dataB: Array<any> = [];
  myOptions1: Array<any>;
  myOptions2: Array<any>;
  myOptions3: Array<any>;
  myOptions4: Array<any>;
  myOptions5: Array<any>;
  mySelected1: any;
  mySelected2: any;
  mySelected3: any;
  mySelected4: any;
  mySelected5: any;

  constructor() {
    for (let i: number = 0; i < 10000; i++) {
      const item: any = this.data[i % 10];
      this.dataA.push({ ...item, label: i + item.label });
    }
    for (let i: number = 0; i < 5; i++) {
      const item: any = this.data[i % 10];
      this.dataB.push({ ...item, label: i + item.label });
    }

    this.myOptions1 = [];
    this.myOptions2 = [].concat(this.dataA);
    this.myOptions3 = this.dataA.slice(0, 1000);
    this.myOptions5 = [].concat(this.dataA);
  }

  changeEmpty1(): void {
    if (this.mySelected1) {
      this.mySelected1 = undefined;
    }
    this.myOptions1 = [];
  }
  changeMany1(): void {
    if (this.mySelected1) {
      this.mySelected1 = undefined;
    }
    this.myOptions1 = [].concat(this.dataA);
  }
  changeFew1(): void {
    if (this.mySelected1) {
      this.mySelected1 = undefined;
    }
    this.myOptions1 = [].concat(this.dataB);
  }
  changeEmpty2(): void {
    if (this.mySelected2) {
      this.mySelected2 = undefined;
    }
    this.myOptions2 = [];
  }
  changeMany2(): void {
    if (this.mySelected2) {
      this.mySelected2 = undefined;
    }
    this.myOptions2 = [].concat(this.dataA);
  }
  changeFew2(): void {
    if (this.mySelected2) {
      this.mySelected2 = undefined;
    }
    this.myOptions2 = [].concat(this.dataB);
  }

  changeEmpty3(): void {
    if (this.mySelected3) {
      this.mySelected3 = undefined;
    }
    this.myOptions3 = [];
  }
  changeMany3(): void {
    if (this.mySelected3) {
      this.mySelected3 = undefined;
    }
    this.myOptions3 = this.dataA.slice(0, 1000);
  }
  changeFew3(): void {
    if (this.mySelected3) {
      this.mySelected3 = undefined;
    }
    this.myOptions3 = [].concat(this.dataB);
  }

  changeEmpty4(): void {
    if (this.mySelected4) {
      this.mySelected4 = undefined;
    }
    this.myOptions4 = [];
  }
  changeMany4(): void {
    if (this.mySelected4) {
      this.mySelected4 = undefined;
    }
    this.myOptions4 = this.dataA.slice(0, 1000);
  }
  changeFew4(): void {
    if (this.mySelected4) {
      this.mySelected4 = undefined;
    }
    this.myOptions4 = [].concat(this.dataB);
  }

  changeEmpty5(): void {
    if (this.mySelected5) {
      this.mySelected5 = undefined;
    }
    this.myOptions5 = [];
  }
  changeMany5(): void {
    if (this.mySelected5) {
      this.mySelected5 = undefined;
    }
    this.myOptions5 = [].concat(this.dataA);
  }
  changeFew5(): void {
    if (this.mySelected5) {
      this.mySelected5 = undefined;
    }
    this.myOptions5 = [].concat(this.dataB);
  }
  mousedown(): void {
    console.log('footer is clicked');
  }
}
