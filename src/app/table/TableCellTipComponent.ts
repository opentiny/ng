import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-cell-tip.html'
})
export class TableCellTipComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        name: 'Pierre Dupont',
        age: 20,
        email: 'PierreLong@example.com',
        address: 'New York No. 1 Lake Park',
        tipContent: 'address: New York No. 1 Lake Park'
      },
      {
        name: 'Jacques Germain',
        age: 42,
        email: 'JacquesLong@example.com',
        address: 'Sidney No. 1 Lake Park',
        tipContent: 'address: Sidney No. 1 Lake Park'
      },
      {
        name: 'Robert Delcourt',
        age: 15,
        email: 'RobertLong@example.com',
        address: 'London No. 1 Lake Park',
        tipContent: 'address: London No. 1 Lake Park'
      },
      {
        name: 'Elisa Menez',
        age: 36,
        email: 'ElisaLong@example.com',
        address: 'Los Angeles No. 1 Lake Park',
        tipContent: 'address: Los Angeles No. 1 Lake Park'
      }
    ],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Name'
    },
    {
      title: 'Age'
    },
    {
      title: 'Long Email Address'
    },
    {
      title: 'Address'
    },
  ];
}
