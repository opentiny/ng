import { Component, ChangeDetectorRef } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

export interface MachineState {
  state: string;
}
@Component({
  templateUrl: './actionmenu-data.html',
})
export class ActionmenuDataComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // OnPush模式下，setTime更新数据，需要使用changeDetectorRef
  }

  rows: Array<MachineState> = [
    {
      state: '已启动',
    },
    {
      state: '已停止',
    },
    {
      state: '已启动',
    },
    {
      state: '已停止',
    },
  ];
  dataToItemsFn: (data: MachineState) => Array<TiActionmenuItem> = (data: {
    state: string;
  }) => {
    const items: Array<TiActionmenuItem> = [
      {
        label: '启动',
        disabled: false,
        click(item: TiActionmenuItem, row: MachineState): void {
          console.log('启动');
          row.state = '已启动';
        },
      },
      {
        label: '停止',
        disabled: false,
        click(item: TiActionmenuItem, row: MachineState): void {
          console.log('停止');
          console.log(row);
          row.state = '已停止';
        },
      },
      {
        label: '重启',
        disabled: false,
        click: (item: TiActionmenuItem, row: MachineState) => {
          console.log('重启');
          row.state = '正在重启';
          setTimeout(() => {
            row.state = '已启动';
            // OnPush模式下，setTimeout更新数据，需要使用changeDetectorRef
            // 默认模式不需要
            // 必须放在箭头函数里，才能找到this对象
            this.changeDetectorRef.markForCheck();
          }, 2000);
        },
      },
    ];
    switch (data.state) {
      case '已启动':
        items[0].disabled = true;
        items[1].disabled = false;
        items[2].disabled = false;
        break;
      case '已停止':
        items[0].disabled = false;
        items[1].disabled = true;
        items[2].disabled = true;
        break;
      case '正在重启':
        items[0].disabled = true;
        items[1].disabled = true;
        items[2].disabled = true;
        break;
      default:
        break;
    }

    return items;
  };
  addRow(): void {
    this.rows.push({
      state: '已启动',
    });
  }
  switchFirstRow(): void {
    this.rows[0].state = this.rows[0].state === '已启动' ? '已停止' : '已启动';
  }
}
