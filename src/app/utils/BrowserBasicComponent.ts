import { Component } from '@angular/core';
import { TiBrowser } from '@opentiny/ng';

@Component({
  templateUrl: './browser-basic.html',
})
export class BrowserBasicComponent {
  browser: string = TiBrowser.browser();
  version: number = TiBrowser.version();

  isEdge: boolean = TiBrowser.isEdge();
  isIE: boolean = TiBrowser.isIE();
  isFirefox: boolean = TiBrowser.isFirefox();
  isChrome: boolean = TiBrowser.isChrome();
  isOpera: boolean = TiBrowser.isOpera();
  isSafari: boolean = TiBrowser.isSafari();
  isOther: boolean = TiBrowser.isOther();
}
