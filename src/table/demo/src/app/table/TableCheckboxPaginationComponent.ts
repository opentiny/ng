import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';
@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-checkbox-pagination.html'
})
export class TableCheckboxPaginationComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef) {}

  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  checkedList: Array<any> = []; // 默认选中项
  currentPage: number = 1;
  totalNumber: number = 56;
  show: boolean = false;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10
  };
  columns: Array<TiTableColumns> = [
    {
      title: ''
    },
    {
      title: 'last name'
    },
    {
      title: 'birth date'
    },
    {
      title: 'balance'
    },
    {
      title: 'email'
    }
  ];

  displayed1: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData1: TiTableSrcData;
  private data1: Array<TiTableRowData> = [];
  checkedList1: Array<any> = []; // 默认选中项
  currentPage1: number = 1;
  totalNumber1: number = 0;
  pageSize1: { options: Array<number>; size: number } = {
    options: [5, 10, 20, 50],
    size: 10
  };
  columns1: Array<TiTableColumns> = [
    {
      title: ''
    },
    {
      title: 'last name'
    },
    {
      title: 'birth date'
    },
    {
      title: 'balance'
    },
    {
      title: 'email'
    }
  ];
  show1: boolean = false;

  ngOnInit(): void {
    for (let j: number = 0; j < this.totalNumber; j++) {
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };

    this.srcData1 = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: [], // 源数据
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: true // 源数据已进行分页处理
      }
    };
    // 初始时向后台发送请求获取数据
    this.getCurrentPageData(this.currentPage1, this.pageSize1.size).then((data: Array<TiTableRowData>) => {
      this.srcData1.data = data;
      this.totalNumber1 = 256;
    });
  }

  // 模拟后台异步请求返回的数据
  private getCurrentPageData(currentPage: number, itemsPerPage: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data: Array<TiTableRowData> = [];
        for (let j: number = (currentPage - 1) * itemsPerPage; j < currentPage * itemsPerPage; j++) {
          data.push(this.createRandomItem(j));
        }
        resolve(data);
        // 在onpush模式下，异步场景需要手动触发变更，default模式下不用写该行代码
        this.ref.markForCheck();
      }, 500);
    });
  }

  // 表格的数据状态(分页，排序，搜索)发生改变时，此方法会被触发；
  // 多用于后台分页、排序和搜索
  stateUpdate(tiTable: TiTableComponent): void {
    const dataState: TiTableDataState = tiTable.getDataState();
    this.getCurrentPageData(dataState.pagination.currentPage, dataState.pagination.itemsPerPage).then((data: Array<TiTableRowData>) => {
      this.srcData1.data = data;
    });
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;
    const disabled: boolean = id % 8 === 0;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      disabled,
      id
    };
  }
}
