import { Component } from '@angular/core';

@Component({
  templateUrl: './radio-disabled.html',
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
  disabled: boolean = true;
  selected: string = 'beijing';
  selectedCountry: string;

}
