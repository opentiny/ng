import { Component } from '@angular/core';
import { TiKeymap } from '@opentiny/ng';
@Component({
  templateUrl: './keymap-usage.html'
})
export class KeymapUsageComponent {
  charCode: string;
  charStr: string;
  keyCode: string;
  keypressStr: string;

  onKeypress(event: KeyboardEvent): void {
    const charCode: number = event.charCode;
    this.charCode = `字符编码为--${charCode}`;
    this.charStr = `字符为--'${String.fromCharCode(charCode)}'`;
    this.keyCode = `键值为--${event.keyCode}`;
    // 此处示例，是为了展示keymap的用法
    if (charCode === TiKeymap.KEY_ENTER) {
      this.keypressStr = '此时回车键用TiKeymap表示为: TiKeymap.KEY_ENTER';
    } else {
      this.keypressStr = '';
    }
  }
}
