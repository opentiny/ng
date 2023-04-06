import { Component, OnInit, ViewChild } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-storage.html'
})
export class TableStorageComponent implements OnInit {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [],
    state: undefined
  };
  currentPage: number = 1;
  totalNumber: number = 126;
  pageSize: { options: Array<number>; size: number } = {
    options: [5, 10, 20, 40, 60],
    size: 10
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Id',
      width: '10%'
    },
    {
      title: 'First Name',
      width: '25%'
    },
    {
      title: 'Last Name',
      field: 'lastName',
      sortKey: 'lastName',
      width: '25%'
    },
    {
      title: 'Age',
      sortKey: 'age',
      width: '10%'
    },
    {
      title: 'email',
      width: '30%'
    }
  ];

  ngOnInit(): void {
    const data: Array<TiTableRowData> = [];
    for (let j: number = 0; j < this.totalNumber; j++) {
      data.push(this.createRandomItem(j));
    }
    this.srcData.data = data;
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 1) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;

    return {
      firstName,
      lastName,
      age,
      email,
      id
    };
  }
}
