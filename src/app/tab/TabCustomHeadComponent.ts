import { Component } from "@angular/core";
@Component({
  templateUrl: './tab-custom-head.html',
  styles: [
    `
      .sum-color {
        color: red;
      }
    `
  ]
})
export class TabCustomHeadComponent {
  tabs: any = [
    {
      title: 'Tab1',
      active: false
    },
    {
      title: 'Tab2',
      active: true
    },
    {
      title: 'Tab3',
      active: false
    }
  ];
}
