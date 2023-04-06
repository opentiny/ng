import { Component } from '@angular/core';

@Component({
  templateUrl: './autocomplete-template.html'
})
export class AutocompleteTemplateComponent {
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
