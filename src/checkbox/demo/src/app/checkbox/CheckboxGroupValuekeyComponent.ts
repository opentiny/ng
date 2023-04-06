import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkbox-group-valuekey.html'
})
export class CheckboxGroupValuekeyComponent {
  data: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' }
  ];
  checked: Array<any> = [1, 2];

  items: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      value: 'China'
    },
    {
      id: '02',
      label: '美国',
      value: 'America'
    },
    {
      id: '03',
      label: '英国',
      value: 'Britain'
    }
  ];
  value: Array<any> = [];
}
