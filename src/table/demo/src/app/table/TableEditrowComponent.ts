import { Component } from '@angular/core';
import { TiActionmenuItem, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-editrow.html'
})
export class TableEditrowComponent {
  editingRow: TiTableRowData;
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

  items: Array<TiActionmenuItem> = [
    {
      label: '编辑'
    },
    {
      label: '删除'
    }
  ];

  editingItems: Array<TiActionmenuItem> = [
    {
      label: '保存'
    },
    {
      label: '取消'
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

  onSelect(item: any, row: TiTableRowData): void {
    if (item.label === '编辑') {
      this.editingRow = { ...row };
      this.editableRows(false);
    } else {
      this.srcData.data = this.srcData.data.filter((current: TiTableRowData): boolean => {
        return current.id !== row.id;
      });
    }
  }

  onSelectEditing(item: any, row: TiTableRowData): void {
    if (item.label === '保存') {
      this.srcData.data = this.srcData.data.map((current: TiTableRowData) => {
        if (current.id === row.id) {
          current = this.editingRow;
        }

        return current;
      });
    }

    this.editingRow = undefined;
    this.editableRows(true);
  }

  trackByFn(index: number, item: any): string {
    return item.id;
  }

  private editableRows(editable: boolean): void {
    this.items = this.items.map((item: TiActionmenuItem): TiActionmenuItem => {
      return {
        ...item,
        disabled: !editable,
        tip: editable ? '' : '请先保存处于编辑状态的行'
      };
    });
  }
}
