import { Component } from '@angular/core';

@Component({
  templateUrl: './searchbox-panelsize.html'
})
export class SearchboxPanelsizeComponent {
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
    },
    {
      label: '东南'
    },
    {
      label: '东北'
    }
  ];
}
