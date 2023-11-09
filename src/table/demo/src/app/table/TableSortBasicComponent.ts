import { Component, OnInit, ViewChild } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-sort-basic.html'
})
export class TableSortBasicComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      sortKey: 'firstName', // 设置排序时按照源数据中的哪一个属性进行排序，
      width: '10%'
    },
    {
      title: 'last name',
      sortKey: 'lastName',
      width: '25%'
    },
    {
      title: 'birthday',
      sortKey: 'birthday',
      asc: false, // 默认排序，且为降序
      width: '20%'
    },
    {
      title: 'balance',
      sortKey: 'balance',
      width: '30%'
    },
    {
      title: 'email'
    }
  ];
  @ViewChild(TiTableComponent, { static: true }) tableCom: TiTableComponent;

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者设置了排序特性，且对源数据未进行排序处理，因此tiny会对数据进行排序处理
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

  clearSort(): void {
    const dataState: TiTableDataState = this.tableCom.getDataState();
    dataState.sort.sortKey = undefined;
    dataState.sort.asc = null;
  }

  // 支持手动修改表格排序状态
  changeSort(): void {
    const dataState: TiTableDataState = this.tableCom.getDataState();
    dataState.sort.sortKey = 'firstName';
    dataState.sort.asc = false;
  }
}
