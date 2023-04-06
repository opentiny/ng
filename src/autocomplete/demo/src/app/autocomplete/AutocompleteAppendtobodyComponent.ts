import { Component } from '@angular/core';

@Component({
  templateUrl: './autocomplete-appendtobody.html'
})
export class AutocompleteAppendtobodyComponent {
  value: string = '';
  options: Array<object> = [
    {
      label: '华北'
    },
    {
      label: '华南'
    },
    {
      label: '西北'
    },
    {
      label: '西南'
    }
  ];
}
