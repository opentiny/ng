import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-disabled.html'
})
export class PaginationDisabledComponent {
  currentPage: number = 2;
  totalNumber: number = 300;
  disabled: boolean = true;
}
