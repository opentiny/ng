import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-fixed.html',
})
export class PaginationFixedComponent {
  totalNumber: number = 300;
  currentPage: number = 10;
  isShow: boolean = false;
  onClick(): void {
    this.isShow = !this.isShow;
  }
}
