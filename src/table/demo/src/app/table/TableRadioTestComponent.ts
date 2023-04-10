import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-radio-test.html'
})
export class TableRadioTestComponent implements OnInit {
  currentPage: number = 1;
  totalNumber: number = 256;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10
  };
  selectedValue: number; // 选中项
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
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
  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: [], // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，模拟了后台分页场景
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: true // 源数据已进行分页处理
      }
    };

    // 初始时向后台发送请求获取数据
    this.getCurrentPageData(this.currentPage, this.pageSize.size).then((data: Array<TiTableRowData>) => {
      this.srcData.data = data;
      this.totalNumber = 256;
      this.selectedValue = data[2].id;
    });
  }

  // 表格的数据状态(分页，排序，搜索)发生改变时，此方法会被触发；
  // 多用于后台分页、排序和搜索
  stateUpdate(tiTable: TiTableComponent): void {
    const dataState: TiTableDataState = tiTable.getDataState();
    this.getCurrentPageData(dataState.pagination.currentPage, dataState.pagination.itemsPerPage).then((data: Array<TiTableRowData>) => {
      this.srcData.data = data;
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
      }, 1000);
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
    const disabled: boolean = id % 4 === 0;

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
