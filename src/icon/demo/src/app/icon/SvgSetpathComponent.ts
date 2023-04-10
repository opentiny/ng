import { Component } from '@angular/core';
import { TiSvgComponent } from '@opentiny/ng';

@Component({
  templateUrl: './svg-setpath.html',
  styleUrls: ['./icon.less']
})
export class SvgSetpathComponent {
  constructor() {
    TiSvgComponent.setPath('/assets/ionicons/');
  }
}
