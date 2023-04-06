import { Component } from '@angular/core';
@Component({
  templateUrl: './tab-basic.html'
})
export class TabBasicComponent {
  tabs: any = [
    {
      title: 'Tab1',
      active: true
    },
    {
      title: 'Tab2',
      disabled: true
    },
    {
      title: 'Tab3',
      active: false
    }
  ];
}
