import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-columnfixed-fixedhead-colsresizable-pagination.html',
})
export class TableColumnfixedFixedheadColsresizablePaginationComponent
  implements OnInit
{
  elementId: string = 'table_test';
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  data: Array<TiTableRowData> = [];
  currentPage: number = 1;
  totalNumber: number = 112;
  pageSize: { options: Array<number>; size: number } = {
    options: [5, 10, 20, 50, 100],
    size: 10,
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      fixed: 'left',
    },
    {
      title: 'last name',
      fixed: 'left',
    },
    {
      title: 'birth date',
      fixed: 'left',
    },
    {
      title: 'balance',
    },
    {
      title: 'email',
    },
    {
      title: 'address',
    },
    {
      title: 'phone number',
    },
    {
      title: 'parents',
    },
    {
      title: 'school',
      fixed: 'right',
    },
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < this.totalNumber; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者没有设置分页、搜索和排序这些特性，因此tiny不会对数据进行进一步的处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false, // 源数据未进行分页处理
      },
    };
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
    const address: string = "Xi'an";
    const phone: string = '123 4567 8900';
    const parents: string = 'father and  mother';
    const school: string = 'high school';

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      address,
      phone,
      parents,
      school,
      id,
    };
  }
}
