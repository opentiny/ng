import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-colsresizable-sort-headfilter.html',
})
export class TableColsresizableSortHeadfilterComponent implements OnInit {
  // 初始化时，searchWords 的长度和searchKeys相同，无搜索时设置为空字符串
  searchWords: Array<any> = ['', ''];
  searchKeys: Array<string> = ['firstName', 'lastName']; // 设置过滤字段
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '20%',
      key: 'firstName',
      selected: null,
      options: [
        {
          label: 'all',
        },
        {
          label: 'Pierre',
        },
        {
          label: 'Jacques',
        },
        {
          label: 'Robert',
        },
      ],
    },
    {
      title: 'last name',
      width: '10%',
      key: 'lastName',
      selected: null,
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
      ],
    },
    {
      title: 'birth date',
      width: '10%',
      key: 'age',
      asc: false, // 默认排序，且为降序
    },
    {
      title: 'balance',
      key: 'balance',
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
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者设置了排序特性，且对源数据未进行排序处理，因此tiny会对数据进行排序处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false, // 源数据未进行分页处理
      },
    };
  }

  // 使 headfilter 和表格搜索联动。根据 headfilter 选中项给表格的搜索接口传入对应的搜索值，进行表格数据搜索。
  // 此示例是利用表格提供的搜索功能来搜索，也可在此事件中来自己实现搜索。
  onSelect(item: any, column: TiTableColumns): void {
    const index: number = this.searchKeys.indexOf(column.key);
    this.searchWords[index] = item.label === 'all' ? '' : item.label;
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
