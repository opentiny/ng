import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

import { foodList } from './CascaderData';

@Component({
  templateUrl: './cascader-trigger.html'
})
export class CascaderTriggerComponent {
  items: Array<TiCascaderItem> = foodList;
  selected: TiCascaderItem = [];
}
