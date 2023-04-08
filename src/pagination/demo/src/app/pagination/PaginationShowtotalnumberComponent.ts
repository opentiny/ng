import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-showtotalnumber.html'
})
export class PaginationShowtotalnumberComponent {
  currentPage: number = 1;
  totalNumber: number = 400;
}
