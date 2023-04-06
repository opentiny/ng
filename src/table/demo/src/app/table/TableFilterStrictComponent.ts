import { Component, OnInit, ViewChild } from '@angular/core';
import { TiTableColumns, TiTableComponent, TiTableRowData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-filter-strict.html'
})
export class TableFilterStrictComponent implements OnInit {
  inputValue1: string = 'p';
  inputValue21: string = '';
  inputValue22: string = '';
  oneWordSearch: any;
  moreThanOneWordSearch: any;
  data: Array<TiTableRowData> = [];
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
  searchedData: Array<TiTableRowData> = [];
  @ViewChild('table1', { static: true }) table1: TiTableComponent;

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.oneWordSearch = {
      displayed: [], // 表示表格实际呈现的数据（开发者默认设置为[]即可）
      srcData: {
        // 表格源数据，开发者对表格的数据设置请在这里进行
        data: this.data, // 源数据
        // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
        // 已经做过的，tiny就不再做了
        // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
        // 本示例中，开发者设置了搜索特性，且对源数据未进行搜索处理，因此tiny会对数据进行搜索处理
        state: {
          searched: false, // 源数据未进行搜索处理
          sorted: false, // 源数据未进行排序处理
          paginated: false // 源数据未进行分页处理
        }
      },
      searchWords: [this.inputValue1],
      searchKeys: ['firstName', 'lastName', 'age'],
      searchStrictKeys: ['firstName'] // 指定精确匹配的字段
    };

    this.moreThanOneWordSearch = {
      displayed: [], // 表示表格实际呈现的数据（开发者默认设置为[]即可）
      srcData: {
        // 表格源数据，开发者对表格的数据设置请在这里进行
        data: this.data, // 源数据
        // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
        // 已经做过的，tiny就不再做了
        // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
        // 本示例中，开发者没有设置分页、搜索和排序这些特性，因此tiny不会对数据进行进一步的处理
        state: {
          searched: false, // 源数据未进行搜索处理
          sorted: false, // 源数据未进行排序处理
          paginated: false // 源数据未进行分页处理
        }
      },
      // 多列多条件搜索时， searchWords,searchKeys 长度相同， searchWords无搜索时设置为空字符串如['', '']
      searchWords: [this.inputValue21, this.inputValue22],
      searchKeys: ['firstName', 'age'],
      searchStrictKeys: ['age'] // 指定精确匹配的字段
    };
  }

  setOneWordSearch(value: string): void {
    this.oneWordSearch.searchWords[0] = value;
  }

  setMoreThanOneWordSearch(value: string, index: number): void {
    this.moreThanOneWordSearch.searchWords[index] = value;
  }

  getSearchedResult(): void {
    // TiTableComponent提供了getSearchedResult方法，可通过此方法获取到搜索的数据结果。
    this.searchedData = this.table1.getSearchedResult();
    console.log('searchedData', this.searchedData);
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'pol', 'Jacques', 'Robert', 'Elisa', 'bjip'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'Bjipuie', 'Polst', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 6];
    const lastName: string = familyName[((id + 3) * 29) % 6];
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
      test: {
        a: 'hello',
        b: 'welcome'
      }
    };
  }

  changeData(): void {
    const temp: TiTableRowData = {
      firstName: 'slkdfjsadf',
      lastName: 'weiorui',
      age: 23,
      email: 'sdlfk@example.com',
      balance: (this.data.length * 761) % 10000,
      id: 'weoiriow'
    };
    this.oneWordSearch['srcData']['data'].push(temp);
    this.moreThanOneWordSearch['srcData']['data'].push(temp);
  }

  changeSearchKeys(): void {
    this.oneWordSearch['searchKeys'] = [];
  }
}
