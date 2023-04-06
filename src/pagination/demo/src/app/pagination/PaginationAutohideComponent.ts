import { Component } from '@angular/core';
import { TiPageSizeConfig } from '@opentiny/ng';

@Component({
  templateUrl: './pagination-autohide.html'
})
export class PaginationAutohideComponent {
  currentPage: number = 1;
  totalNumber: number = 400;
  pageSize: TiPageSizeConfig = {
    options: [20, 40, 80],
    size: 40
  };
  onClick(): void {
    this.totalNumber = this.totalNumber > 20 ? 12 : 400;
  }
}
