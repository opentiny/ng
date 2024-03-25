import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-type.html'
})
export class PaginationTypeComponent {
  currentPage: number = 10;
  totalNumber: number = 400;

  typeSimple: 'default' | 'simple' | 'mini' = 'simple';
  currentPageSimple: number = 2;
  totalNumberSimple: number = 1600;

  typeMini: 'default' | 'simple' | 'mini' = 'mini';
  currentPageMini: number = 2;
  totalNumberMini: number = 300;
}
