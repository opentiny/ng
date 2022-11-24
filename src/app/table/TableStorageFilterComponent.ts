import { Component, OnInit, ViewChild } from '@angular/core';
import {
  TiTableColumns,
  TiTableComponent,
  TiTableRowData,
  TiTableSrcData,
} from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-storage-filter.html',
})
export class TableStorageFilterComponent implements OnInit {
  storageId: string = 'storage-filter';
  searchWords: Array<any> = ['', '', ''];
  searchKeys: Array<string> = ['firstName', 'lastName', 'age']; // 设置过滤字段
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '20%',
    },
    {
      title: 'last name',
      width: '20%',
      key: 'lastName',
      options: [
        {
          label: 'all',
        },
        {
          label: 'Dupont',
        },
        {
          label: 'Germain',
        },
        {
          label: 'Delcourt',
        },
        {
          label: 'bjip',
        },
        {
          label: 'Menez',
        },
        {
          label: 'Henry',
        },
        {
          label: 'Jeff',
        },
        {
          label: 'John',
        },
        {
          label: 'Elizabeth',
        },
      ],
    },
    {
      title: 'birth date',
      width: '10%',
    },
    {
      title: 'balance',
      width: '30%',
    },
    {
      title: 'email',
      width: '20%',
    },
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false, // 源数据未进行分页处理
      },
    };
    // 修复SSR报错：ERROR ReferenceError: window is not defined
    if (typeof window === 'undefined') {
      return;
    }
    // 检查缓存
    let storageSearchWords = window.sessionStorage.getItem(this.storageId);
    if (storageSearchWords) {
      let { searchWords } = JSON.parse(storageSearchWords);
      this.searchWords = [...searchWords];
      // 表格过滤选中项
      this.columns[1].selected = this.columns[1].options.find((option) => {
        return option.label === searchWords[1];
      });
    }
  }

  onSelect(item: any, column: TiTableColumns): void {
    const index: number = this.searchKeys.indexOf(column.key);
    this.searchWords[index] = item['label'] === 'all' ? '' : item['label'];
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = [
      'Pierre',
      'Pol',
      'Jacques',
      'Robert',
      'Elisa',
    ];
    const familyName: Array<string> = [
      'Dupont',
      'Germain',
      'Delcourt',
      'bjip',
      'Menez',
    ];
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
      id,
    };
  }
}
