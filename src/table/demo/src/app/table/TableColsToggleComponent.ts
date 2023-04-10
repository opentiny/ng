import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-cols-toggle.html'
})
export class TableColsToggleComponent {
  displayedData: Array<TiTableRowData> = [];
  searchable: boolean = true;
  selectAll: boolean = true;
  srcData: TiTableSrcData = {
    data: [
      {
        id: '1',
        firstName: 'Pierre',
        lastName: 'Dupont',
        age: 20,
        email: 'Pierre@example.com'
      },
      {
        id: '2',
        firstName: 'Jacques',
        lastName: 'Germain',
        age: 42,
        email: 'Jacques@example.com'
      },
      {
        id: '3',
        firstName: 'Robert',
        lastName: 'Delcourt',
        age: 15,
        email: 'Robert@example.com'
      },
      {
        id: '4',
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
      title: 'Id'
    },
    {
      title: 'First Name',
      show: true
    },
    {
      title: 'Last Name',
      show: false
    },
    {
      title: 'Age',
      show: true
    },
    {
      title: 'Email Address',
      show: true
    }
  ];
}
