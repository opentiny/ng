import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-pageselectwidth.html'
})
export class PaginationPageselectwidthComponent {
  currentPage: number = 1;
  totalNumber: number = 60000;
  pageSelectVirtual: boolean = true;
}
