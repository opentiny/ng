import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-disabled.html',
})
export class CheckgroupDisabledComponent {
  data: Array<any> = [
    { id: 'a', text: 'guest', disabled: true },
    { id: 'b', text: 'user' },
    { id: 'c', text: 'customer' },
    { id: 'd', text: 'admin', disabled: true },
  ];
  seasons: Array<any> = [
    { id: '1', text: 'April', disabled: true },
    { id: '2', text: 'Summer' },
    { id: '3', text: 'Autumn' },
    { id: '4', text: 'Winter', disabled: true },
  ]

  checked: Array<any> = [this.data[0], this.data[2]];
  checkedSeasons: Array<any> = [this.seasons[0], this.seasons[1]];
}
