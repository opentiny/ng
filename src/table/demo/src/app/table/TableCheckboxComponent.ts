import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-checkbox.html'
})
export class TableCheckboxComponent {
  checkedList: Array<TiTableRowData> = [];
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
        email: 'Jacques@example.com',
        disabled: true
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

  ngOnInit(): void {
    // this.checkedList.push(this.srcData.data[6]); // 设置初始选中项
  }

  trackByFn(index: number, item: any): number {
    return item.firstName;
  }
}
