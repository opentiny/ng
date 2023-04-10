import { Component } from '@angular/core';
import { TiRadioItem } from '@opentiny/ng';

@Component({
  templateUrl: './radio-disabled.html'
})
export class RadioDisabledComponent {
  countries: Array<{ key: string; id: string; disable?: boolean }> = [
    {
      key: '中国',
      id: 'China'
    },
    {
      key: '美国',
      id: 'America',
      disable: true
    },
    {
      key: '英国',
      id: 'England',
      disable: false
    }
  ];

  radioList: Array<TiRadioItem> = [
    {
      id: '1',
      label: '中国',
      value: 'China',
      disabled: true
    },
    {
      id: '2',
      label: '美国',
      value: 'America',
      disabled: false
    },
    {
      id: '3',
      label: '英国',
      value: 'Britain'
    }
  ];

  selectedGroup: string = 'China';
  disabled: boolean = true;
  selected: string = 'beijing';
  selectedCountry: string;
}
