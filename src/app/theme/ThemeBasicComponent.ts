import { Component } from '@angular/core';
import { TiTheme } from '@opentiny/ng';

@Component({
  templateUrl: './theme-basic.html',
})
export class ThemeBasicComponent {
  baseUrl: string = (window["DEPLOY_URL"] + window["PUBLIC_URL"]) ? (window["DEPLOY_URL"] + window["PUBLIC_URL"]) : '' ;
  switchState: boolean = true;

  blue(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/tiny3/themes/theme-blue.css`, 'tiny3theme');
  }
  green(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/tiny3/themes/theme-green.css`, 'tiny3theme');
  }
  purple(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/tiny3/themes/theme-purple.css`, 'tiny3theme');
  }
  red(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/tiny3/themes/theme-red.css`, 'tiny3theme');
  }
  default(): void {
    TiTheme.loadCss(`${this.baseUrl}assets/tiny3/themes/theme-default.css`, 'tiny3theme');
  }
}
