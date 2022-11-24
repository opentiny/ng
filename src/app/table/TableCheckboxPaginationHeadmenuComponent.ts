import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData } from '@opentiny/ng';

@Component({
  templateUrl: './table-checkbox-pagination-headmenu.html'
})
export class TableCheckboxPaginationHeadmenuComponent implements OnInit {
  default: any = {
    checkedList: [],
    displayedData: [],
    srcData: {
      data: [],
      state: undefined
    },
    currentPage: 1,
    totalNumber: 56
  }

  custom: any = {
    checkedList: [],
    displayedData: [],
    srcData: {
      data: [],
      state: undefined
    },
    currentPage: 1,
    totalNumber: 68,
    options: [
      {
        key: 'all',
        label: '选择所有数据',
      },
      {
        key: 'age',
        label: '选择所有年龄不小于60岁的',
      },
      {
        key: 'clear',
        label: '清空',
      },
    ]
  }
  columns: Array<TiTableColumns> = [
    {
      title: ''
    },
    {
      title: 'Id'
    },
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
  pageSize: { options: Array<number>; size: number } = {
    options: [5, 10, 50],
    size: 5,
  }

  ngOnInit(): void {
    this.default.srcData.data = this.getData(this.default.totalNumber);
    this.custom.srcData.data = this.getData(this.custom.totalNumber);
  }

  onDefaultHeadmenuSelect(option: any): void {
    if (option.key === 'checkAll') {
      this.default.checkedList = this.default.srcData.data.filter((row: TiTableRowData) => {
        return !row.disabled || this.default.checkedList.includes(row);
      });
    } else {
      this.default.checkedList = this.default.srcData.data.filter((row: TiTableRowData) => {
        return row.disabled && this.default.checkedList.includes(row);
      });;
    }
  }

  onCustomHeadmenuSelect(option: any): void {
    if (option.key === 'all') {
      this.custom.checkedList = this.custom.srcData.data.filter((row: TiTableRowData) => {
        return !row.disabled || this.custom.checkedList.includes(row);
      });
    } else if (option.key === 'age') {
      this.custom.checkedList = this.custom.srcData.data.filter(
        (row: TiTableRowData, index: number) => {
          const isMatched: boolean = row.age >= 60;
          return (
            (isMatched && !row.disabled) ||
            (row.disabled && this.custom.checkedList.includes(row))
          );
        }
      );
    } else {
      this.custom.checkedList = this.custom.srcData.data.filter((row: TiTableRowData) => {
        return row.disabled && this.custom.checkedList.includes(row);
      });
    }
  }

  trackByFn(index: number, item: TiTableRowData): number {
    return item.id;
  }

  private getData(totalNumber: number): Array<TiTableRowData> {
    const data: Array<TiTableRowData>= [];
    for (let j: number = 0; j < totalNumber; j++) {
      data.push(this.createRandomItem(j));
    }

    return data;
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
    const disabled: boolean = id % 5 === 1;

    return {
      firstName,
      lastName,
      age,
      email,
      disabled,
      id,
    };
  }
}
