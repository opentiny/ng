import { Component, OnInit } from '@angular/core';
import {
  TiActionmenuItem,
  TiTableColumns,
  TiTableRowData,
  TiTableSrcData,
} from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-editrow-test.html',
})
export class TableEditrowTestComponent implements OnInit {
  // 表格数据
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: '名称/ID',
      width: '15%',
    },
    {
      title: '客户等级',
      width: '15%',
    },
    {
      title: '信用账户金额',
      width: '15%',
    },
    {
      title: '退订次数',
      width: '15%',
    },
    {
      title: '创建时间',
      width: '15%',
    },
    {
      title: '操作员',
      width: '15%',
    },
    {
      title: '操作',
      width: '10%',
    },
  ];

  // 正在编辑行
  editingRow: TiTableRowData;
  // 新添加一行
  newRow: TiTableRowData;
  // 展示行actionmenu 选项
  items: Array<TiActionmenuItem> = [
    {
      label: '编辑',
    },
    {
      label: '删除',
    },
  ];
  // 编辑行actionmenu 选项
  editingItems: Array<TiActionmenuItem> = [
    {
      label: '保存',
    },
    {
      label: '取消',
    },
  ];

  // 新增行actionmenu
  addItems: Array<TiActionmenuItem> = [
    {
      label: '添加',
    },
    {
      label: '取消',
    },
  ];

  // 客户等级备选项
  levelOptions: Array<any> = [
    {
      label: '一级',
    },
    {
      label: '二级',
    },
    {
      label: '三级',
    },
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      this.data.push(this.createRandomItem(j));
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

  // 正常行按钮处理-编辑、删除
  onSelect(item: any, row: TiTableRowData): void {
    if (item.label === '编辑') {
      this.editingRow = { ...row };
      this.editableRows(false);
    } else {
      // 删除
      this.srcData.data = this.srcData.data.filter(
        (current: TiTableRowData): boolean => {
          return current.id !== row.id;
        }
      );
    }
  }

  // 正在编辑行按钮处理-保存、取消
  onSelectEditing(item: any, row: TiTableRowData): void {
    if (item.label === '保存') {
      this.srcData.data = this.srcData.data.map((current: TiTableRowData) => {
        if (current.id === row.id) {
          current = this.editingRow;
        }

        return current;
      });
    }

    this.editableRows(true);
    this.editingRow = undefined;
  }

  // 添加按钮处理
  onSelectAdd(item: any): void {
    if (item.label === '添加') {
      const newRow: TiTableRowData = { ...this.newRow };
      newRow.id = 'row_' + this.srcData.data.length * 911;
      this.srcData.data = [newRow].concat(this.srcData.data);
    }

    this.editableRows(true);

    this.newRow = undefined;
  }
  // 添加行
  addRow(): void {
    this.newRow = {};
    this.editingRow = undefined;
    this.editableRows(false);
  }

  private editableRows(editable: boolean): void {
    this.items = this.items.map((item: TiActionmenuItem): TiActionmenuItem => {
      return {
        ...item,
        disabled: !editable,
        tip: editable ? '' : '请先保存处于编辑状态的行',
      };
    });
  }

  // 模拟数据
  private createRandomItem(id: number): TiTableRowData {
    const size: Array<string> = ['small', 'medium', 'medium', 'xlarge'];
    const sourceName: string = `s2.${size[(id * 29) % 4]}.2`;
    const level: string = '一级';
    const balance: number = ((id + 5) * 1000 * 7) % 10000;
    const unsubscribe: number = (id * 17) % 5;
    const createTime: Date = new Date(
      1598872204569 - ((id * 100) % 23) * 3600000 * 24 * 30
    );
    const operator: string = 'Operator001';
    const editable: boolean = true;

    return {
      sourceName,
      level,
      balance,
      unsubscribe,
      createTime,
      operator,
      editable,
      id: 'row_' + id,
    };
  }
}
