import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-server-pagi.html'
})
export class TableServerPagiComponent implements OnInit {
  myLogs: Array<any> = [];

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
  currentPage: number = 2;
  totalNumber: number;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10
  };
  constructor(private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: [], // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者设置了分页特性，且对源数据已进行了分页处理，因此tiny不会对数据进行进一步的处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: true // 后台分页，源数据已进行了分页处理
      }
    };

    // 初始时向后台发送请求获取数据
    this.getCurrentPageData(this.currentPage, this.pageSize.size).then((data: Array<TiTableRowData>) => {
      this.myLogs = [...this.myLogs, '获取数据成功！'];
      this.srcData.data = data;
      this.totalNumber = 256;
    });
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
