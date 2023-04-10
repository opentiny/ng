import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-row-drag2.html'
})
export class TableRowDrag2Component {
  displayedData: Array<TiTableRowData> = [];
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
  private startIndex: number = 0;

  trackByFn(index: number, item: any): string {
    return item.id;
  }

  dragstart(index: number): void {
    this.startIndex = index;
  }

  dragover(event: any): void {
    event.preventDefault();
  }

  drop(endIndex: number): void {
    const current: TiTableRowData = this.displayedData.splice(this.startIndex, 1);
    this.displayedData.splice(endIndex, 0, current[0]);
  }
}
