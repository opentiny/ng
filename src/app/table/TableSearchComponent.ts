import { Component } from '@angular/core';
import { TiTableColumns } from '@opentiny/ng';

@Component({
  templateUrl: './table-search.html'
})
export class TableSearchComponent {
  oneWordSearchValue: string = 'p';
  moreThanOneWordSearchValue1: string = '';
  moreThanOneWordSearchValue2: string = '';
  noDadaInfo: string = '暂无数据';
  columns: Array<TiTableColumns> = [
    {
      title: 'First Name'
    },
    {
      title: 'Last Name'
    },
    {
      title: 'Age'
    },
    {
      title: 'Email Address'
    }
  ];
  oneWordSearch: any = {
    displayedData: [],
    srcData: {
      data: [
        {
          firstName: 'Pierre',
          lastName: 'Dupont',
          age: 20,
          email: 'Pierre@example.com'
        },
        {
          firstName: 'Jacques',
          lastName: 'Germain',
          age: 42,
          email: 'Jacques@example.com'
        },
        {
          firstName: 'Robert',
          lastName: 'Delcourt',
          age: 15,
          email: 'Robert@example.com'
        },
        {
          firstName: 'Elisa',
          lastName: 'Menez',
          age: 36,
          email: 'Elisa@example.com'
        }
      ],
      state: undefined
    },
    searchWords: [this.oneWordSearchValue],
    searchKeys: ['firstName', 'lastName', 'age'],
    searchStrictKeys: ['age']
  };
  moreThanOneWordSearch: any = {
    displayedData: [],
    srcData: {
        data: [
            {
              firstName: 'Pierre',
              lastName: 'Dupont',
              age: 20,
              email: 'Pierre@example.com'
            },
            {
              firstName: 'Jacques',
              lastName: 'Germain',
              age: 42,
              email: 'Jacques@example.com'
            },
            {
              firstName: 'Robert',
              lastName: 'Delcourt',
              age: 15,
              email: 'Robert@example.com'
            },
            {
              firstName: 'Elisa',
              lastName: 'Menez',
              age: 36,
              email: 'Elisa@example.com'
            }
          ],
        state: undefined
      },
    searchWords: [this.moreThanOneWordSearchValue1, this.moreThanOneWordSearchValue2],
    searchKeys: ['firstName', 'age']
  };

  setOneWordSearch(value: string): void {
    this.oneWordSearch.searchWords[0] = value;
  }

  setMoreThanOneWordSearch(value: string, index: number): void {
    this.moreThanOneWordSearch.searchWords[index] = value;
  }
}
