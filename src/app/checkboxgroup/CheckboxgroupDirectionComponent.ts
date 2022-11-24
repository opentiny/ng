import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkboxgroup-direction.html',
})
export class CheckboxgroupDirectionComponent {
  items: Array<TiCheckboxItem> = [
    { label: '中国', disabled: false },
    { label: '美国', disabled: true },
    { label: '英国' },
  ];
  value: Array<any> = [];
}
