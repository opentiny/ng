import { Component } from '@angular/core';
import {
  TiActionmenuItem,
  TiTableColumns,
  TiTableRowData,
  TiTableSrcData,
} from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-table.html',
})
export class ActionmenuTableComponent {
  myLogs: Array<string> = [];
  displayed: Array<any> = [];
  srcData: TiTableSrcData;
  data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      label: 'first name',
      width: '25%',
    },
    {
      label: 'last name',
      width: '20%',
    },
    {
      label: 'birth date',
      width: '20%',
    },
    {
      label: 'state',
      width: '15%',
    },
    {
      label: 'email',
      width: '20%',
    },
  ];
  private static createRandomItem(id: number): any {
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
    const firstName: string = nameList[Math.floor(Math.random() * 4)];
    const lastName: string = familyName[Math.floor(Math.random() * 4)];
    const age: number = Math.floor(Math.random() * 100);
    const state: string = ['已启动', '已停止'][Math.floor(Math.random() * 2)];

    return {
      firstName,
      lastName,
      age,
      state,
      id,
    };
  }

  ngOnInit(): void {
    for (let j: number = 0; j < 5; j++) {
      // 生成10条数据
      this.data.push(ActionmenuTableComponent.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false,
        sorted: false,
        paginated: false,
      },
    };
  }

  dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    let items: Array<TiActionmenuItem> = [
      {
        id: 'start',
        label: '启用',
        disabled: true,
      },
      {
        label: '禁用',
        // 配置确认框相关属性
        popConfig: {
          content: '确定要禁用该项吗？',
          close: (): void => {
            this.myLogs = [...this.myLogs, `onClose() event = confirm}`];
          },
          dismiss: (): void => {
            this.myLogs = [...this.myLogs, `onDismiss() event = dismiss}`];
          },
        },
      },
      {
        id: 'modify',
        label: '修改',
      },
      {
        id: 'delete',
        label: '删除',
      },
    ];
    if (data.state === '已停止') {
      items[0].disabled = false;
      items[1].disabled = true;
      items = [items[0], items[1]];
    }

    return items;
  };

  onSelect(item: any): void {
    this.myLogs = [...this.myLogs, `onSelect() event = ${JSON.stringify(item)}}`];
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
