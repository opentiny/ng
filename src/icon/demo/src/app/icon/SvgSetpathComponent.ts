import { Component } from '@angular/core';
import { TiSvgComponent } from '@opentiny/ng';

@Component({
  templateUrl: './svg-setpath.html',
  styleUrls: ['./icon.less']
})
export class SvgSetpathComponent {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  constructor() {
    TiSvgComponent.setPath(`${this.baseUrl}assets/ionicons/`);
  }
}
