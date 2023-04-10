import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-rowspan.html'
})
export class TableRowspanComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        firstName: 'Pierre',
        lastName: 'Dupont',
        age: 20,
        email: 'Pierre@example.com',
        rowSpan: 3,
        colSpan: 1
      },
      {
        firstName: 'Jacques',
        age: 42,
        email: 'Jacques@example.com',
        rowHide: true,
        colSpan: 1
      },
      {
        firstName: 'Robert',
        age: 15,
        email: 'Robert@example.com',
        rowHide: true,
        colSpan: 1
      },
      {
        firstName: 'Elisa',
        lastName: 'Menez',
        age: 'no data',
        rowSpan: 1,
        colSpan: 2,
        colHide: true
      }
    ],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'First Name'
    },
    {
      title: 'Last Name'
    },
    {
      title: 'Age'
    },
    {
      title: 'Email Address'
    }
  ];
}
