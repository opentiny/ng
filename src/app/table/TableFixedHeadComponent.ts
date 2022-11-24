import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-fixed-head.html'
})
export class TableFixedHeadComponent {
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
      },
      {
        firstName: 'Pol',
        lastName: 'Dupont',
        age: 22,
        email: 'Pol@example.com'
      },
      {
        firstName: 'Adelina',
        lastName: 'Germain',
        age: 30,
        email: 'Adelina@example.com'
      },
      {
        firstName: 'Abner',
        lastName: 'Delcourt',
        age: 29,
        email: 'Abner@example.com'
      },
      {
        firstName: 'Emma',
        lastName: 'Menez',
        age: 48,
        email: 'Emma@example.com'
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
