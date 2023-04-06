import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './pagination-showgotolink.html',
  encapsulation: ViewEncapsulation.None
})
export class PaginationShowgotolinkComponent {
  currentPage: number = 10;
  totalNumber: number = 400;
}
