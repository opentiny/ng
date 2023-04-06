import { Component } from '@angular/core';
import { TiPageSizeConfig } from '@opentiny/ng-pagination';

@Component({
  templateUrl: './pagination-loading.html',
})
export class PaginationLoadingComponent {
  pageSize: TiPageSizeConfig = {
    size: 10,
    options: [10, 20, 50],
  };
  loading: boolean = false;

  switch(): void {
    this.loading = !this.loading;
  }
}
