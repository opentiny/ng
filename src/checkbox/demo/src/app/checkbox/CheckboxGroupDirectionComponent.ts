import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkbox-group-direction.html'
})
export class CheckboxGroupDirectionComponent {
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
