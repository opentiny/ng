import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

import { foodList } from './CascaderData';

@Component({
  templateUrl: './cascader-onlyselectleaf.html'
})

export class CascaderOnlyselectleafComponent {
  selected: TiCascaderItem = [];
  items: Array<TiCascaderItem> = foodList;
}
