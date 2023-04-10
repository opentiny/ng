import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-storage-serve.html'
})
export class TableStorageServeComponent implements OnInit {
  myLogs: Array<any> = [];
  storageId: string = 'table-storage-pagation-serve';
  storageConfig = {
    sort: false,
    pagination: true,
    colsWidth: false
  };
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '20%'
    },
    {
      title: 'last name',
      width: '20%'
    },
    {
      title: 'birth date',
      width: '10%'
    },
    {
      title: 'balance',
      width: '30%'
    },
    {
      title: 'email',
      width: '20%'
    }
  ];
  currentPage: number = 1;
  totalNumber: number = 222;
  pageSize: { options: Array<number>; size: number } = {
    options: [5, 10, 20, 50, 100],
    size: 5
  };
  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.srcData = {
      data: [],
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: true // 后台分页，源数据已进行了分页处理
      }
    };
    // 修复SSR报错：ERROR ReferenceError: window is not defined
    // 处理用户第一次访问页面，没有记忆状态，不会触发stateUpdate
    let storageState = typeof window !== 'undefined' ? window.localStorage.getItem('this.storageId') : undefined;
    if (!storageState) {
      this.getCurrentPageData(this.currentPage, this.pageSize.size).then((data: Array<TiTableRowData>) => {
        this.myLogs = [...this.myLogs, '初始化化成功'];
        this.srcData.data = data;
        this.totalNumber = 256;
      });
    }
  }

  // 表格的数据状态(分页，排序，搜索)发生改变时，此方法会被触发；
  // 多用于后台分页、排序和搜索
  stateUpdate(tiTable: TiTableComponent): void {
    this.myLogs = [...this.myLogs, `dataState=> ${JSON.stringify(tiTable.getDataState())}`];
    this.myLogs = [...this.myLogs, `triggerEvent=> ${tiTable.getTriggerEvent()}`];
    const dataState: TiTableDataState = tiTable.getDataState();
    this.getCurrentPageData(dataState.pagination.currentPage, dataState.pagination.itemsPerPage).then((data: Array<TiTableRowData>) => {
      this.myLogs = [...this.myLogs, '获取数据成功！'];
      this.srcData.data = data;
      this.totalNumber = 256;
    });
  }

  // 模拟后台异步请求返回的数据
  private getCurrentPageData(currentPage: number, itemsPerPage: number): Promise<any> {
    this.myLogs = [...this.myLogs, '模拟向后台发送请求'];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data: Array<TiTableRowData> = [];
        for (let j: number = (currentPage - 1) * itemsPerPage; j < currentPage * itemsPerPage; j++) {
          data.push(this.createRandomItem(j));
        }
        resolve(data);
        // 在onpush模式下，异步场景需要手动触发变更，default模式下不用写该行代码
        this.ref.markForCheck();
      }, 1000);
    });
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      id
    };
  }
}
