import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-virtualscroll.html'
})
export class TableVirtualscrollComponent implements OnInit {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Id',
      width: '10%'
    },
    {
      title: 'First Name',
      width: '20%'
    },
    {
      title: 'Last Name',
      width: '20%'
    },
    {
      title: 'Age',
      width: '10%'
    },
    {
      title: 'Email Address',
      width: '40%'
    }
  ];

  ngOnInit(): void {
    const data: Array<TiTableRowData> = [];
    for (let i: number = 0; i < 1000; i++) {
      data.push(this.createRandomItem(i));
    }
    this.srcData.data = data;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'Bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
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
