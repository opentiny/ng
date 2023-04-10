import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-radio.html'
})
export class TableRadioComponent {
  displayedData: Array<TiTableRowData> = [];
  selectedValue: string;
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
        email: 'Jacques@example.com',
        disabled: true
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
      title: ''
    },
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

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
