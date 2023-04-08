import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-cols-resizable.html'
})
export class TableColsResizableComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        firstName: 'Pierre',
        lastName: 'Dupont',
        age: 20,
        email: 'Pierre@example.com',
        address: 'New York No. 1 Lake Park'
      },
      {
        firstName: 'Jacques',
        lastName: 'Germain',
        age: 42,
        email: 'Jacques@example.com',
        address: 'Sidney No. 1 Lake Park'
      },
      {
        firstName: 'Robert',
        lastName: 'Delcourt',
        age: 15,
        email: 'Robert@example.com',
        address: 'London No. 1 Lake Park'
      },
      {
        firstName: 'Elisa',
        lastName: 'Menez',
        age: 36,
        email: 'Elisa@example.com',
        address: 'Los Angeles No. 1 Lake Park'
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
      title: 'Address'
    },
    {
      title: 'Email Address'
    },
    {
      title: 'Age'
    }
  ];
}
