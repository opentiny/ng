import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkbox-disabled.html'
})
export class CheckboxDisabledComponent {
  checked = true;
  items: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      value: 'China',
      disabled: false
    },
    {
      id: '02',
      label: '美国',
      value: 'America',
      disabled: true
    },
    {
      id: '03',
      label: '英国',
      value: 'Britain'
    }
  ];
  value: Array<any> = [this.items[1]];
}
