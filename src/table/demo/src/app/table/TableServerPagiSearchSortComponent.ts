import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-server-pagi-search-sort.html'
})
export class TableServerPagiSearchSortComponent implements OnInit {
  value: string = '';
  loading: boolean = true;
  displayedData: Array<TiTableRowData> = [];
  searchWords: Array<string> = [this.value];
  searchKeys: Array<string> = ['firstName', 'lastName', 'email'];
  currentPage: number = 1;
  totalNumber: number = 0;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10
  };
  srcData: TiTableSrcData = {
    data: [],
    state: {
      searched: true, // 源数据已进行过搜索处理
      sorted: true, // 源数据已进行过排序处理
      paginated: true // 源数据已进行过分页处理
    }
  };
  columns: TiTableColumns = [
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
      title: 'Age',
      sortKey: 'age'
    },
    {
      title: 'Email Address'
    }
  ];
  private baseData: Array<TiTableRowData> = [];

  ngOnInit(): void {
    for (let j: number = 0; j < 226; j++) {
      this.baseData.push(this.createRandomItem(j));
    }

    this.getCurrentPageData(this.currentPage, this.pageSize.size, this.searchWords, this.searchKeys, this.columns[2].sortKey, null).then(
      (response: any) => {
        this.loading = false;
        this.srcData.data = response.data;
        this.totalNumber = response.totalNumber;
      }
    );
  }

  // 点击搜索时，将搜索的值通过 tiTable 提供的 searchWords 接口传进表格，
  // 然后表格的搜索数据状态就会改变，从而触发 stateUpdate的 事件的执行。
  onSearch(value: string): void {
    this.searchWords[0] = value;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  // 表格的数据状态(分页，排序，搜索)发生改变时，此方法会被触发
  onStateUpdate(tiTable: TiTableComponent): void {
    const dataState: TiTableDataState = tiTable.getDataState();
    this.loading = true;
    this.getCurrentPageData(
      dataState.pagination.currentPage,
      dataState.pagination.itemsPerPage,
      dataState.search.searchWords,
      dataState.search.searchKeys,
      dataState.sort.sortKey,
      dataState.sort.asc
    ).then((response: any) => {
      this.loading = false;
      this.srcData.data = response.data;
      this.totalNumber = response.totalNumber;
    });
  }

  // 模拟异步远程请求返回的数据
  private getCurrentPageData(
    currentPage: number,
    itemsPerPage: number,
    searchWords: Array<string>,
    searchKeys: Array<string>,
    sortKey: string,
    asc: boolean
  ): Promise<any> {
    let output: Array<TiTableRowData> = [].concat(this.baseData);

    output = this.search(output, searchWords, searchKeys);
    const totalNumber: number = output.length;

    if (sortKey && asc !== null) {
      output.sort((a: any, b: any): number => {
        return (a[sortKey] - b[sortKey]) * (asc ? 1 : -1);
      });
    }

    const start: number = (currentPage - 1) * itemsPerPage;
    output = output.slice(start, start + parseInt(itemsPerPage.toString(), 10));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: output, totalNumber });
      }, 1000);
    });
  }

  private search(src: Array<TiTableRowData>, searchWords: Array<string>, searchKeys: Array<string>): Array<TiTableRowData> {
    const output: Array<TiTableRowData> = [];
    src.forEach((item: TiTableRowData) => {
      let isMatched: boolean = false;
      for (let i: number = 0; i < searchKeys.length; i++) {
        if (item[searchKeys[i]].toLowerCase().indexOf(searchWords[0].toLowerCase()) > -1) {
          isMatched = true;
          break;
        }
      }
      if (isMatched) {
        output.push(item);
      }
    });

    return output;
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
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
