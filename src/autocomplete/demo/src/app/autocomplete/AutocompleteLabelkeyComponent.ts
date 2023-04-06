import { Component } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-labelkey.html'
})
export class AutocompleteLabelkeyComponent {
  value: string = '';
  options: Array<object> = [
    {
      label: '华北',
      english: 'North China'
    },
    {
      label: '华南',
      english: 'South China'
    },
    {
      label: '西北',
      english: 'Northwest China'
    },
    {
      label: '西南',
      english: 'Southwest China'
    }
  ];
}
