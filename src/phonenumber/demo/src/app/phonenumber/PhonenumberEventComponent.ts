import { Component } from '@angular/core';
import { CountryCode } from 'libphonenumber-js/max';
import { TiCountryCode } from '@opentiny/ng';

@Component({
  templateUrl: './phonenumber-event.html'
})
export class PhonenumberEventComponent {
  value: string;
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
  myLogs: Array<string> = [];
  countrySelect(event: CountryCode): void {
    this.myLogs = [...this.myLogs, `countrySelect： ${JSON.stringify(event)}`];
  }
  countryChange(event: string): void {
    this.myLogs = [...this.myLogs, `countryChange： ${JSON.stringify(event)}`];
  }
}
