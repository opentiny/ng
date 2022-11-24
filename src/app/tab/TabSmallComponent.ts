import { Component } from '@angular/core';
@Component({
  templateUrl: './tab-small.html'
})
export class TabSmallComponent {
  tabs: any = [
    {
      title: "Tab1",
      active: true
    },
    {
      title: "Tab2"
    },
    {
      title: "Tab3"
    }
  ];
}
