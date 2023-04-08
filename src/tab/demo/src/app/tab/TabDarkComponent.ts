import { Component } from '@angular/core';
@Component({
  templateUrl: './tab-dark.html'
})
export class TabDarkComponent {
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
