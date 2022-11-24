import { Component } from '@angular/core';
import { TiIconComponent } from '@opentiny/ng';

@Component({
  templateUrl: './icon-setpath.html',
  styleUrls: ['./icon.less']
})
export class IconSetpathComponent {
    constructor() {
        // 设置下载地址，全局生效。
        TiIconComponent.setPath('https://unpkg.com/ionicons@5.5.2/dist/svg/');
    }
}
