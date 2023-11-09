import { Component, ViewEncapsulation } from '@angular/core';
import { TiPaginationEvent } from '@opentiny/ng';

@Component({
  templateUrl: './pagination-event.html',
  encapsulation: ViewEncapsulation.None
})
export class PaginationEventComponent {
  myLogs: Array<string> = [];
  currentPage: number = 10;
  totalNumber: number = 400;

  onPageNumChange(event: TiPaginationEvent): void {
    const str: string = `onPageNumChange data=${JSON.stringify(event)}`;
    this.myLogs = [...this.myLogs, str];
  }

  onCurrentPageChange(event: number): void {
    const str: string = `onCurrentPageChange data=${event}`;
    this.myLogs = [...this.myLogs, str];
  }

  onPageUpdate(event: TiPaginationEvent): void {
    const str: string = `onPageUpdate data=${JSON.stringify(event)}`;
    this.myLogs = [...this.myLogs, str];
  }

  onTotalNumberChange(event: number): void {
    const str: string = `onTotalNumberChange data=${JSON.stringify(event)}`;
    this.myLogs = [...this.myLogs, str];
  }
}
