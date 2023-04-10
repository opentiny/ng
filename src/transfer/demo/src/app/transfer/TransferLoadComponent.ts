import { Component } from '@angular/core';
import { myOptions } from './data.js';
@Component({
  templateUrl: './transfer-load.html',
  styleUrls: ['./transfer.less']
})
export class TransferLoadComponent {
  private dataA: Array<any> = JSON.parse(JSON.stringify(myOptions));

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

  private dataC: Array<any> = [
    {
      label: '三阳开泰'
    },
    {
      label: '四季发财'
    },
    {
      label: '五福临门'
    },
    {
      label: '六六大顺'
    },
    {
      label: '七星高照'
    },
    {
      label: '八面来风'
    },
    {
      label: '九九归一'
    },
    {
      label: '十全十美'
    }
  ];

  // 设置穿梭框源数据
  myOptions: Array<any>;
  // 设置穿梭框初始选中项，选中项会移动到右侧面板
  mySelecteds: Array<any>;

  // 每个组件都用下面六个函数，只改变函数内容
  changeUndefined(): void {
    this.myOptions = undefined;
  }
  changeNull(): void {
    this.myOptions = null;
  }
  changeWrongType(): void {
    const temp: any = 5;
    this.myOptions = temp;
  }
  changeZeroData(): void {
    this.myOptions = [];
  }
  changeDataA(): void {
    this.myOptions = this.dataA;
    this.mySelecteds = [this.myOptions[0], this.myOptions[1]];
  }
  changeDataB(): void {
    this.myOptions = this.dataB;
    this.mySelecteds = [this.myOptions[0], this.myOptions[1]];
  }
  changeDataC(): void {
    this.myOptions = this.dataC;
  }

  // 改变选中项
  changeSelects(): void {
    this.mySelecteds = [this.myOptions[2], this.myOptions[3]];
  }
}
