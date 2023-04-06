import { Component } from '@angular/core';
import { TiTheme } from '@opentiny/ng';

@Component({
  templateUrl: './theme-basic.html'
})
export class ThemeBasicComponent {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'] ? window['DEPLOY_URL'] + window['PUBLIC_URL'] : '';
  switchState: boolean = true;

  blue(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/themes/theme-blue.css`, 'tiny3theme');
  }
  green(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/themes/theme-green.css`, 'tiny3theme');
  }
  purple(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/themes/theme-purple.css`, 'tiny3theme');
  }
  red(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/themes/theme-red.css`, 'tiny3theme');
  }
  default(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/themes/theme-default.css`, 'tiny3theme');
  }
}
