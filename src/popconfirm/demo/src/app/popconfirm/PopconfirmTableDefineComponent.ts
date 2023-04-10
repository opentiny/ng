import { Component } from '@angular/core';
import { TiPopconfirmConfig, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './popconfirm-table-define.html'
})
export class PopconfirmTableDefineComponent {
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
      label: 'option',
      width: '20%'
    }
  ];

  popConfig: TiPopconfirmConfig = {
    id: 'delete',
    content: '确定要删除吗？',
    yesText: '确认',
    noText: '取消',
    position: 'right',
    close: (data: any): void => {
      const index = this.srcData.data.findIndex((current: TiTableRowData): boolean => {
        return current.rowId === data.rowId;
      });
      this.srcData.data.splice(index, 1);
      this.myLogs = [...this.myLogs, '确认删除'];
    },
    dismiss: (data: any): void => {
      this.myLogs = [...this.myLogs, '取消删除'];
    }
  };

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

  private createRandomItem(id: number): any {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
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
