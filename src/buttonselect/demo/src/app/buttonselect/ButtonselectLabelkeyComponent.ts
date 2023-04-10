import { Component } from '@angular/core';

@Component({
  templateUrl: './buttonselect-labelkey.html'
})
export class ButtonselectLabelkeyComponent {
  options: Array<any> = [{ text: '手机壳' }, { text: '移动电源' }, { text: '蓝牙耳机' }];

  selected: any = this.options[1];
}
