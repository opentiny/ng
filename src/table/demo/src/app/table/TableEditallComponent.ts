import { Component } from '@angular/core';
import { TiActionmenuItem, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-editall.html'
})
export class TableEditallComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        id: 'row_1',
        sourceName: 's2.small.2',
        level: '一级',
        unsubscribe: '3',
        createTime: new Date(2019, 11, 5)
      },
      {
        id: 'row_2',
        sourceName: 's2.medium.2',
        level: '三级',
        unsubscribe: '1',
        createTime: new Date(2022, 1, 15)
      },
      {
        id: 'row_3',
        sourceName: 's2.xlarge.2',
        level: '二级',
        unsubscribe: '0',
        createTime: new Date(2021, 5, 25)
      }
    ],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: '名称/ID'
    },
    {
      title: '客户等级'
    },
    {
      title: '退订次数'
    },
    {
      title: '创建时间'
    },
    {
      title: '操作'
    }
  ];

  levelOptions: Array<any> = [
    {
      label: '一级'
    },
    {
      label: '二级'
    },
    {
      label: '三级'
    }
  ];

  items: Array<TiActionmenuItem> = [
    {
      label: '删除'
    }
  ];

  onDetele(item: any, row: TiTableRowData): void {
    this.srcData.data = this.srcData.data.filter((current: TiTableRowData): boolean => {
      return current.id !== row.id;
    });
  }

  trackByFn(index: number, item: any): string {
    return item.id;
  }
}
