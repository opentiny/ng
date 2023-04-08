import { Component } from '@angular/core';

@Component({
  templateUrl: './select-many.html'
})
export class SelectManyComponent {
  private dataA: Array<any> = [
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

  private dataB: Array<any> = [
    { label: '水调歌头' },
    { label: '苏轼' },
    { label: '明月几时有？把酒问青天' },
    { label: '不知天上宫阙，今夕是何年。' },
    { label: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。' },
    { label: '起舞弄清影，何似在人间？' },
    { label: '转朱阁，低绮户，照无眠。' },
    { label: '不应有恨，何事长向别时圆？' },
    { label: '人有悲欢离合，月有阴晴圆缺，此事古难全。' },
    { label: '但愿人长久，千里共婵娟。' }
  ];

  myOptions: Array<any>;

  mySelected: any;

  mySelecteds: any;

  constructor() {
    for (let i: number = 0; i < 5; i++) {
      // 5次为32倍，320条
      this.dataA = this.dataA.concat(this.dataA);
    }
    for (let i: number = 0; i < 7; i++) {
      // 8次为256倍，2560条
      this.dataB = this.dataB.concat(this.dataB);
    }
  }
  changeDataA(): void {
    this.myOptions = this.dataA;
    this.mySelected = this.myOptions[0];
    this.mySelecteds = [this.myOptions[0], this.myOptions[1]];
  }
  changeDataB(): void {
    this.myOptions = this.dataB;
    this.mySelected = this.myOptions[0];
    this.mySelecteds = [this.myOptions[0], this.myOptions[1]];
  }
}
