import { Component } from '@angular/core';
import { TiPageSizeConfig } from '@opentiny/ng';

@Component({
  templateUrl: './pagination-pagesize.html'
})
export class PaginationPagesizeComponent {
  currentPage: number = 2;
  totalNumber: number = 300;
  currentPage1: number = 3;
  totalNumber1: number = 40000;
  currentPage2: number = 3;
  totalNumber2: number = 400;
  currentPage3: number = 2;
  totalNumber3: number = 300;
  pageSize: TiPageSizeConfig = {
    options: [200, 400, 600, 800],
    size: 200
  };
  pageSize1: TiPageSizeConfig = {
    options: [10, 20, 50],
    size: 10,
    width: '100px'
  };
  pageSize2: TiPageSizeConfig = {
    options: [20, 40, 60, 80],
    size: 20,
    hide: true
  };
  pageSize3: TiPageSizeConfig = {
    options: [20, 50, 100],
    size: 20
  };
}
