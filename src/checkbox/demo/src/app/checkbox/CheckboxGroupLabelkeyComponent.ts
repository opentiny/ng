import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkbox-group-labelkey.html'
})
export class CheckboxGroupLabelkeyComponent {
  items: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      englishName: 'China'
    },
    {
      id: '02',
      label: '美国',
      englishName: 'America'
    },
    {
      id: '03',
      label: '英国',
      englishName: 'Britain'
    }
  ];
  value: Array<any> = [];
}
