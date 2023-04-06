import { Component } from '@angular/core';

@Component({
  templateUrl: './overflow-tipcontent.html'
})
export class OverflowTipcontentComponent {
  textContent: string = '明月几时有，把酒问青天。明月几时有，把酒问青天。明月几时有，把酒问青天。明月几时有，把酒问青天。';
  textContent1: string = '设置为空，文本超长没有提示信息，仅有溢出样式';
}
