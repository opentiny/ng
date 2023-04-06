import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tab-scroll.html'
})
export class TabScrollComponent implements OnInit {
  items: Array<any> = [];

  tabs: Array<any> = [
    {
      title: 'Libary'
    },
    {
      title: 'Company',
      active: true
    },
    {
      title: 'Concert1'
    }
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 15; j++) {
      this.items.push((j * 113) % 29);
    }
  }

  addItems(): void {
    this.items.push(333);
  }
}
