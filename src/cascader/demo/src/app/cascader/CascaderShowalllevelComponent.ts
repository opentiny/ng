import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

import { foodList } from './CascaderData';

@Component({
  templateUrl: './cascader-showalllevel.html'
})
export class CascaderShowalllevelComponent {
  items: Array<TiCascaderItem> = foodList;
  selected: Array<TiCascaderItem> = [this.items[2].label, this.items[2].children[0].label, this.items[2].children[0].children[1].label];
}
