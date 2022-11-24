import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-sort.html'
})
export class TableSortComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        firstName: 'Pierre',
        lastName: 'Dupont',
        age: 20,
        email: 'Pierre@example.com',
        poetry: '但愿人长久，千里共婵娟。'
      },
      {
        firstName: 'Jacques',
        lastName: 'Germain',
        age: 42,
        email: 'Jacques@example.com',
        poetry: '天生我材必有用，千金散尽还复来。'
      },
      {
        firstName: 'Robert',
        lastName: 'Delcourt',
        age: 15,
        email: 'Robert@example.com',
        poetry: '人生得意须尽欢，莫使金樽空对月。'
      },
      {
        firstName: 'Elisa',
        lastName: 'Menez',
        age: 36,
        email: 'Elisa@example.com',
        poetry: '明月几时有，把酒问青天，不知天上宫阙，今夕是何年。'
      }
    ],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'First Name',
      sortKey: 'firstName',
      asc: true
    },
    {
      title: 'Last Name',
      sortKey: 'lastName',
      compareFn: (a: TiTableRowData, b: TiTableRowData, sortKey: string): number => {
        return a[sortKey].length - b[sortKey].length;
      }
    },
    {
      title: 'Age',
      sortKey: 'age'
    },
    {
      title: 'Favorite Chinese Poetry',
      sortKey: 'poetry',
      compareFn: (a: TiTableRowData, b: TiTableRowData, sortKey: string): number => {
        const language: string = 'zh-CN';

        return a[sortKey].localeCompare(b[sortKey], language);
      }
    },
    {
      title: 'Email Address'
    }
  ];
}
