import { Component } from '@angular/core';

import { TiKeymap } from '@opentiny/ng';

@Component({
  templateUrl: './keymap-basic.html',
})
export class KeymapBasicComponent {
  keydownString: string;
  keypressString: string;
  keyupString: string;
  mousedownString: string;
  onKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case TiKeymap.KEY_A:
        this.keydownString = 'TiKeymap.KEY_A';
        break;
      case TiKeymap.KEY_SEMICOLON:
        this.keydownString = 'TiKeymap.KEY_SEMICOLON';
        break;
      case TiKeymap.KEY_NUMPAD_0:
        this.keydownString = 'TiKeymap.KEY_NUMPAD_0';
        break;
      case TiKeymap.KEY_0:
        this.keydownString = 'TiKeymap.KEY_0';
        break;
      case TiKeymap.KEY_ARROW_UP:
        this.keydownString = 'TiKeymap.KEY_ARROW_UP';
        break;
      case TiKeymap.KEY_F1:
        this.keydownString = 'TiKeymap.KEY_F1';
        break;
      case TiKeymap.KEY_COMMA:
        this.keydownString = 'TiKeymap.KEY_COMMA';
        break;
      default:
        break;
    }
  }

  onKeypress(event: KeyboardEvent): void {
    const charCode: number = event.charCode;
    this.keypressString = `字符编码为: ${charCode} 字符为: ${String.fromCharCode(
      charCode
    )}`;
  }
  onKeyup(event: KeyboardEvent): void {
    this.keyupString = ' 键值为: ' + event.keyCode;
  }

  onMousedown(event: MouseEvent): void {
    this.mousedownString = ' mousebutton键值为: ' + event.button;
  }
}
