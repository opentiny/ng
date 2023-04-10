import { Component } from '@angular/core';

@Component({
  templateUrl: './datetimerange-many-test.html'
})
export class DatetimerangeManyTestComponent {
  items: Array<any> = [];

  ngOnInit(): void {
    for (let i: number = 0; i < 100; i++) {
      this.items.push({ value: null });
    }
  }
}
