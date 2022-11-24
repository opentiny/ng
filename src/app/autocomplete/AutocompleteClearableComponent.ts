import { Component } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-clearable.html',
})
export class AutocompleteClearableComponent {
  value: string = '华西';
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
