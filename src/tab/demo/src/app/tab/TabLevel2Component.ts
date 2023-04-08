import { Component } from '@angular/core';
@Component({
  templateUrl: './tab-level2.html'
})
export class TabLevel2Component {
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
