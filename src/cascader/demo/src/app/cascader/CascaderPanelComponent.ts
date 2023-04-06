import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

import { foodList } from './CascaderData';
@Component({
  templateUrl: './cascader-panel.html'
})
export class CascaderPanelComponent {
  items: Array<TiCascaderItem> = foodList;
}
