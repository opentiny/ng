import { Component, ViewChild } from '@angular/core';
import { TiTableComponent, TiTableColumns, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-sort-reset.html'
})
export class TableSortResetComponent {
  @ViewChild(TiTableComponent, { static: true }) tableInstance: TiTableComponent;
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        firstName: 'Pierre',
        lastName: 'Dupont',
        age: 20,
        email: 'Pierre@example.com'
      },
      {
        firstName: 'Jacques',
        lastName: 'Germain',
        age: 42,
        email: 'Jacques@example.com'
      },
      {
        firstName: 'Robert',
        lastName: 'Delcourt',
        age: 15,
        email: 'Robert@example.com'
      },
      {
        firstName: 'Elisa',
        lastName: 'Menez',
        age: 36,
        email: 'Elisa@example.com'
      }
    ],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'First Name',
      sortKey: 'firstName'
    },
    {
      title: 'Last Name',
      sortKey: 'lastName',
      compareFn: (a: TiTableRowData, b: TiTableRowData, sortKey: string): number => {
        return a[sortKey].length - b[sortKey].length;
      }
    },
    {
      title: 'Age',
      sortKey: 'age'
    },
    {
      title: 'Email Address'
    }
  ];

  sortByAge(): void {
    const dataState: TiTableDataState = this.tableInstance.getDataState();
    dataState.sort.sortKey = 'age';
    dataState.sort.asc = false;
  }

  clearSorters(): void {
    const dataState: TiTableDataState = this.tableInstance.getDataState();
    dataState.sort.sortKey = undefined;
    dataState.sort.asc = null;
  }
}
