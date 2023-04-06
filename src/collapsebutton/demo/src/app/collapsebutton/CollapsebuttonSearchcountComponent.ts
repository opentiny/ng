import { Component } from '@angular/core';

@Component({
  templateUrl: './collapsebutton-searchcount.html'
})
export class CollapsebuttonSearchcountComponent {
  collapsed: boolean = true;
  text1: string = '服务名称:';
  text2: string = '状态:';
  colsNumber: number = 5;
  fieldVerticalAlign: string = 'middle';
  collapseButtonSearch: string = '搜索';
  collapseButtonReset: string = '重置';
  advancedSearch: any = {
    serviceName: '',
    status: ''
  };
  searchCount: number = 0;

  onSearchClick(): void {
    this.calcSearchCount();
  }

  onResetButtonClick(): void {
    this.advancedSearch.serviceName = '';
    this.advancedSearch.status = '';
    this.calcSearchCount();
  }

  private calcSearchCount(): void {
    this.searchCount = 0;
    for (let key in this.advancedSearch) {
      if (this.advancedSearch[key]) {
        this.searchCount++;
      }
    }
  }
}
