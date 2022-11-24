import { Component } from '@angular/core';

@Component({
  templateUrl: './tab-lazy-load.html'
})
export class TabLazyLoadComponent {
  tabs: any = [
    {
      title: 'Tab1',
      active: true
    },
    {
      title: 'Tab2'
    },
    {
      title: 'Tab3'
    }
  ];
}
