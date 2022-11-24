import { Component } from '@angular/core';
import { TiSearchboxComponent } from '@opentiny/ng';

@Component({
  templateUrl: './searchbox-options.html'
})
export class SearchboxOptionsComponent {
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
