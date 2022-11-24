import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkboxgroup-labelkey.html',
})
export class CheckboxgroupLabelkeyComponent {
  items: Array<TiCheckboxItem> = [
    {
      id: '01',
      label: '中国',
      englishName: 'China',
      disabled: false,
    },
    {
      id: '02',
      label: '美国',
      englishName: 'America',
      disabled: true,
    },
    {
      id: '03',
      label: '英国',
      englishName: 'Britain',
    },
  ];
  value: Array<any> = [];
}
