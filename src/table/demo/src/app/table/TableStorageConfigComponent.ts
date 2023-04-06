import { Component, OnInit, ViewChild } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData, TiTableStorageConfig } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-storage-config.html'
})
export class TableStorageConfigComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      field: 'firstName',
      width: '10%'
    },
    {
      title: 'last name',
      field: 'lastName',
      show: true,
      width: '25%'
    },
    {
      title: 'birthday',
      sortKey: 'birthday',
      field: 'birthday',
      show: true,
      asc: false,
      width: '20%'
    },
    {
      title: 'balance',
      field: 'balance',
      show: true,
      sortKey: 'balance',
      width: '30%'
    },
    {
      title: 'email',
      field: 'email',
      show: true
    }
  ];
  @ViewChild(TiTableComponent, { static: true }) tableCom: TiTableComponent;

  currentPage: number = 1;
  totalNumber: number = 100;
  pageSize: { options: Array<number>; size: number } = {
    options: [5, 10, 20, 40, 60],
    size: 5
  };

  storageConfig: TiTableStorageConfig = {
    sort: false,
    // pagination设置为false，表示当前页和每页个数都不记忆
    // pagination设置为true，表示当前页和每页个数都要记忆
    // 10.1.2版本支持只记忆当前页或只记忆每页个数
    pagination: {
      currentPage: false,
      itemsPerPage: true
    },
    colsWidth: false
  };

  ngOnInit(): void {
    for (let j: number = 0; j < 100; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 1) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;
    const birthday: string = new Date(1600657756626 - age * 3600 * 24 * 365 * 1000).toISOString().substring(0, 10);

    return {
      firstName,
      lastName,
      age,
      birthday,
      email,
      balance,
      id
    };
  }
}
