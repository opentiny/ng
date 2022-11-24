import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TiValidators } from '@opentiny/ng';
import { TiCascaderItem } from '@opentiny/ng';

import { foodList } from './CascaderData';

@Component({
  templateUrl: './cascader-valid.html'
})

export class CascaderValidComponent {
  items: Array<TiCascaderItem> = foodList;
  mySelected: Array<TiCascaderItem> = [
    this.items[2].label, this.items[2].children[0].label, this.items[2].children[0].children[1].label
  ];

  cascaderControl: FormControl = new FormControl(this.mySelected, TiValidators.required);
}
