import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-sort-comparefn-locale.html'
})
export class TableSortComparefnLocaleComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      sortKey: 'firstName', // 设置排序时按照源数据中的哪一个属性进行排序，
      asc: true // 默认排序，且为升序
    },
    {
      title: 'last name',
      sortKey: 'lastName'
    },
    {
      title: 'birth date',
      sortKey: 'age'
    },
    {
      title: 'balance',
      sortKey: 'balance'
    },
    {
      title: 'email'
    }
  ];

  // 表格组件提供的排序中字符串比较是使用基于标准字典的 Unicode 值来进行比较的。如果开发者需要本地化的排序，
  // 可使用tiHeadSort组件的compareFn接口来自定义所在列的本地化排序规则。本地化排序规则可利用 localeCompare 方法。
  compareFn = (a: TiTableRowData, b: TiTableRowData, sortKey: string): number => {
    console.log('Params', a, b, sortKey);
    const language: string = 'zh-CN'; // 根据实际情况设置当前语言种类

    return a[sortKey].localeCompare(b[sortKey], language); // localeCompare方法还有更多配置，可在网上查阅。
  };

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
        paginated: false // 源数据未进行分页处理
      }
    };
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['内存状态', '网口状态', '文件状态', '磁盘寿命', 'CPU状态', 'I/O状态'];
    const familyName: Array<string> = ['主机信息统计', '网络统计', '文件系统统计', 'CPU统计', 'I/O统计'];
    const firstName: string = nameList[((id + 3) * 19) % 6];
    const lastName: string = familyName[((id + 3) * 29) % 5];
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
