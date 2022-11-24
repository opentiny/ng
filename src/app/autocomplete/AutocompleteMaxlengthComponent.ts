import { Component } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-maxlength.html',
})
export class AutocompleteMaxlengthComponent {
  value: string = '';
  options: Array<object> = [
    {
      label: '华北',
    },
    {
      label: '华南',
    },
    {
      label: '西北',
    },
    {
      label: '西南',
    },
  ];
}
