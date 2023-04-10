import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-showlastpage.html'
})
export class PaginationShowlastpageComponent {
  currentPage: number = 1;
  totalNumber: number = 400;
  showLastPage: boolean = false;
}
