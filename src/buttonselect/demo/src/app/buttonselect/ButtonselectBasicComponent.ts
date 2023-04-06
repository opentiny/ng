import { Component } from '@angular/core';

@Component({
  templateUrl: './buttonselect-basic.html'
})
export class ButtonselectBasicComponent {
  options: Array<any> = [
    { label: '1年原厂换修￥79.00 ' },
    { label: '2年全保修￥139.00' },
    { label: '3年全保修￥189.00 ' },
    { label: '2年全保修+1年免费更换原厂屏幕一次￥159.00' }
  ];

  selected: any = this.options[1];
}
