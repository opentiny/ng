import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

import { foodList } from './CascaderData';

@Component({
  templateUrl: './cascader-search.html'
})
export class CascaderSearchComponent {
  items: Array<TiCascaderItem> = foodList;
  selected: Array<TiCascaderItem> = [];
  selected1: Array<TiCascaderItem> = [foodList[1], foodList[1].children[0]];
}
