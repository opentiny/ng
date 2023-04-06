import { Component } from '@angular/core';
import { TiCountryCode } from '@opentiny/ng';

@Component({
  templateUrl: './phonenumber-disabled.html'
})
export class PhonenumberDisabledComponent {
  value: string;
  selectDisabled: boolean = true;
  countryOptions: Array<TiCountryCode> = [
    {
      ISO2Code: 'MO',
      Name: '中国澳门特别行政区',
      CountryCode: '853'
    },
    {
      ISO2Code: 'CN',
      Name: '中国大陆',
      CountryCode: '86'
    },
    {
      ISO2Code: 'TW',
      Name: '中国台湾',
      CountryCode: '886'
    },
    {
      ISO2Code: 'HK',
      Name: '中国香港特别行政区',
      CountryCode: '852'
    }
  ];
}
