import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

declare let global: any;

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-fixhead-scroll.html'
})
export class TableFixheadScrollComponent implements OnInit {
  // 列表数据
  items: Array<any> = [];
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  noDadaInfo: string = '暂无表格数据';

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

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
      this.items.push((j * 113) % 29);
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };
  }

  addItems(): void {
    this.items.push(333);
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 37) % 4];
    const lastName: string = familyName[((id + 3) * 17) % 4];
    const age: number = Math.floor(((id + 3) * 73) % 100);
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 100) * 181) % 10000;

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
