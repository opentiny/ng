import { Component, Input, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-details-nesttable.html'
})
export class TableDetailsNesttableComponent {
  displayedData: Array<TiTableRowData> = [];
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
  srcData: TiTableSrcData = {
    data: [
      {
        firstName: 'Pierre',
        lastName: 'Dupont',
        age: 20,
        email: 'Pierre@example.com',
        data: [
          {
            friend: 'Jack',
            birthday: new Date(2000, 5, 6),
            address: 'London, Park Lane no. 1'
          },
          {
            friend: 'Edward',
            birthday: new Date(2001, 9, 6),
            address: 'London, Park Lane no. 0'
          }
        ]
      },
      {
        firstName: 'Jacques',
        lastName: 'Germain',
        age: 42,
        email: 'Jacques@example.com',
        data: [
          {
            friend: 'Joe Black',
            birthday: new Date(1976, 5, 6),
            address: 'New York No. 1 Lake Park'
          },
          {
            friend: 'John Brown',
            birthday: new Date(1975, 9, 6),
            address: 'Sidney No. 1 Lake Park'
          }
        ]
      },
      {
        firstName: 'Robert',
        lastName: 'Delcourt',
        age: 15,
        email: 'Robert@example.com',
        data: [
          {
            friend: 'Elisa',
            birthday: new Date(2004, 11, 6),
            address: 'New York No. 1 Lake Park'
          },
          {
            friend: 'Jim Red',
            birthday: new Date(2005, 6, 16),
            address: 'London No. 1 Lake Park'
          }
        ]
      }
    ],
    state: undefined
  };
}

@Component({
  selector: 'nested-table',
  styleUrls: ['./tableTest.less'],
  template: ` <ti-table class="ti3-table-nest" [(displayedData)]="displayedData" [srcData]="srcData">
    <table>
      <thead>
        <tr>
          <th *ngFor="let column of columns">{{ column.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of displayedData">
          <td>{{ row.friend }}</td>
          <td>{{ row.birthday | date }}</td>
          <td>{{ row.address }}</td>
        </tr>
      </tbody>
    </table>
  </ti-table>`
})
export class NestedTableComponent implements OnInit {
  @Input() data: Array<TiTableRowData>;
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Friend Name'
    },
    {
      title: 'Friend Age'
    },
    {
      title: 'Friend Address'
    }
  ];

  ngOnInit(): void {
    this.srcData.data = this.data;
  }
}
