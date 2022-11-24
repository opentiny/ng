import { Component, OnInit } from '@angular/core';
import {
  TiLeftmenuItem,
  TiTableColumns,
  TiTableRowData,
  TiTableSrcData,
} from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-columnfixed-leftmenu.html',
})
export class TableColumnfixedLeftmenuComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '200px',
      fixed: 'left',
    },
    {
      title: 'last name',
      width: '160px',
      fixed: 'left',
    },
    {
      title: 'birth date',
      width: '240px',
      fixed: 'left',
    },
    {
      title: 'balance',
      width: '200px',
    },
    {
      title: 'email',
      width: '120px',
    },
    {
      title: 'address',
      width: '280px',
    },
    {
      title: 'phone number',
      width: '100px',
    },
    {
      title: 'parents',
      width: '300px',
    },
    {
      title: 'school',
      width: '200px',
      fixed: 'right',
    },
  ];
  headLabel: string = '头部区域（可定制）';
  marginLeft: string = '192px';
  collapsed: boolean = false; // 默认展开，当设置为true时会收起
  reloadState: boolean = true; // 初始设置为true
  items: Array<TiLeftmenuItem> = [
    {
      label: '一级菜单',
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

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  toggleClick(isHide: boolean): void {
    // 需要业务侧在菜单收起\展开时，控制右侧内容的位置
    this.marginLeft = isHide ? '0' : '192px';
  }
}
