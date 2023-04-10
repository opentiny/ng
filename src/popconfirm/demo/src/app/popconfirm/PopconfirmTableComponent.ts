import { Component } from '@angular/core';
import { TiActionmenuItem, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './popconfirm-table.html'
})
export class PopconfirmTableComponent {
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  myLogs: any = [];
  columns: Array<TiTableColumns> = [
    {
      label: 'first name',
      width: '25%'
    },
    {
      label: 'last name',
      width: '20%'
    },
    {
      label: 'age',
      width: '20%'
    },
    {
      label: 'state',
      width: '15%'
    },
    {
      label: 'options',
      width: '20%'
    }
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 4; j++) {
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false,
        sorted: false,
        paginated: false
      }
    };
  }

  onSelect(item: any): void {
    this.myLogs = [...this.myLogs, item.label];
  }
  dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    let items: Array<TiActionmenuItem> = [
      {
        label: '删除',
        popConfig: {
          content: '确定要删除该项吗？',
          yesPrimary: true,
          close: (): void => {
            const index = this.srcData.data.findIndex((current: TiTableRowData): boolean => {
              return current.rowId === data.rowId;
            });
            this.srcData.data.splice(index, 1);
            this.myLogs = [...this.myLogs, '确认删除'];
          },
          dismiss: (): void => {
            this.myLogs = [...this.myLogs, '否认删除'];
          }
        }
      },
      {
        label: '禁用',
        popConfig: {
          content: '确定要禁用该项吗？',
          close: (): void => {
            this.myLogs = [...this.myLogs, '确认禁用'];
          },
          dismiss: (): void => {
            this.myLogs = [...this.myLogs, '否认禁用'];
          }
        }
      },
      {
        label: '制作镜像'
      },
      {
        label: '这是一个很长的选项'
      },
      {
        label: '制作镜像2',
        disabled: true
      }
    ];
    if (data.state === '已停止') {
      items[0].disabled = false;
      items[1].disabled = true;
      items = [items[0], items[1]];
    }
    return items;
  };

  private createRandomItem(id: number): any {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip'];
    const firstName: string = nameList[Math.floor(Math.random() * 4)];
    const lastName: string = familyName[Math.floor(Math.random() * 4)];
    const age: number = Math.floor(Math.random() * 100);
    const state: string = ['已启动', '已停止'][Math.floor(Math.random() * 2)];
    const rowId: string = 'row_' + id;

    return {
      firstName,
      lastName,
      age,
      state,
      rowId
    };
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
