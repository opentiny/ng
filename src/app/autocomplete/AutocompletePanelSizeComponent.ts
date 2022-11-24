import { Component } from '@angular/core';

@Component({
  templateUrl: './autocomplete-panel-size.html',
})
export class AutocompletePanelSizeComponent {
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
